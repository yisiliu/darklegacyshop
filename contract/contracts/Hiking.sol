// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HikingChallenge is ERC721Enumerable, Ownable {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    IERC20 public usdcToken;
    address public rewardPool;

    uint256 private _nextTokenId;

    enum Difficulty { Easy, Medium, Hard, Expert }

    struct Coordinate {
        int256 latitude;
        int256 longitude;
    }

    struct Checkpoint {
        Coordinate location;
        uint256 blockLimit; // Block limit to reach next checkpoint
        address publicKey; // Public key of the checkpoint device
    }

    struct Trail {
        Checkpoint[] checkpoints;
        address creator;
        Difficulty difficulty;
    }

    struct Challenge {
        bytes16 challengeId;
        uint256 trailId;
        uint256 startBlock;
        uint256 currentCheckpoint;
        bool isActive;
        uint256 stakedAmount;
    }

    struct KeyMetadata {
        bytes16 challengeId;
        uint256 trailId;
        uint256 completionBlock;
        Difficulty difficulty;
    }

    mapping(uint256 => Trail) public trails;
    mapping(address => Challenge) public userChallenge;
    mapping(uint256 => KeyMetadata) public keyMetadata;
    uint256 public trailCounter;

    // Mapping to store the number of $KEY tokens minted for each difficulty level
    mapping(Difficulty => uint256) public difficultyRewards;

    // Mapping to store the stake amount for each difficulty level
    mapping(Difficulty => uint256) public difficultyStakes;

    event TrailCreated(uint256 indexed trailId, address indexed creator, Difficulty difficulty);
    event ChallengeStarted(address indexed user, bytes16 indexed challengeId, uint256 indexed trailId, uint256 stakedAmount);
    event CheckpointReached(address indexed user, bytes16 indexed challengeId, uint256 checkpointIndex);
    event ChallengeFailed(address indexed user, bytes16 indexed challengeId, uint256 stakedAmount);
    event ChallengeCompleted(address indexed user, bytes16 indexed challengeId, uint256 tokenId, uint256 rewardAmount, uint256 returnedStake);
    event KeyMinted(address indexed to, uint256 indexed tokenId, bytes16 indexed challengeId, uint256 amount);

    constructor(address _usdcTokenAddress, address _rewardPool) ERC721("HikingKey", "KEY") Ownable(msg.sender) {
        usdcToken = IERC20(_usdcTokenAddress);
        rewardPool = _rewardPool;

        // Set default rewards for each difficulty level
        difficultyRewards[Difficulty.Easy] = 1;
        difficultyRewards[Difficulty.Medium] = 2;
        difficultyRewards[Difficulty.Hard] = 3;
        difficultyRewards[Difficulty.Expert] = 5;

        // Set stake amounts for each difficulty level (in USDC with 6 decimal places)
        difficultyStakes[Difficulty.Easy] = 1 * 10**6;    // 1 USDC
        difficultyStakes[Difficulty.Medium] = 2 * 10**6;  // 2 USDC
        difficultyStakes[Difficulty.Hard] = 5 * 10**6;    // 5 USDC
        difficultyStakes[Difficulty.Expert] = 10 * 10**6; // 10 USDC
    }

    function createTrail(
        Coordinate[] memory _locations, 
        uint256[] memory _blockLimits,
        address[] memory _publicKeys,
        Difficulty _difficulty
    ) external {
        require(_locations.length == _blockLimits.length + 1, "Invalid input lengths");
        require(_locations.length == _publicKeys.length, "Invalid input lengths");
        require(_locations.length >= 2, "Trail must have at least 2 points");

        Trail storage newTrail = trails[trailCounter];
        newTrail.creator = msg.sender;
        newTrail.difficulty = _difficulty;

        for (uint256 i = 0; i < _locations.length - 1; i++) {
            newTrail.checkpoints.push(Checkpoint({
                location: _locations[i],
                blockLimit: _blockLimits[i],
                publicKey: _publicKeys[i]
            }));
        }

        // Add the final location without a block limit
        newTrail.checkpoints.push(Checkpoint({
            location: _locations[_locations.length - 1],
            blockLimit: 0,
            publicKey: _publicKeys[_publicKeys.length - 1]
        }));

        emit TrailCreated(trailCounter, msg.sender, _difficulty);
        trailCounter++;
    }

    function startChallenge(uint256 _trailId) external {
        require(trails[_trailId].checkpoints.length > 0, "Trail does not exist");
        
        // If there's an active challenge, fail it before starting a new one
        if (userChallenge[msg.sender].isActive) {
            _failChallenge(msg.sender);
        }

        Trail storage trail = trails[_trailId];
        uint256 stakeAmount = difficultyStakes[trail.difficulty];

        // Transfer USDC directly from user to reward pool
        require(usdcToken.transferFrom(msg.sender, rewardPool, stakeAmount), "USDC transfer to reward pool failed");

        bytes16 newChallengeId = _generateChallengeId(msg.sender, _trailId);

        userChallenge[msg.sender] = Challenge({
            challengeId: newChallengeId,
            trailId: _trailId,
            startBlock: block.number,
            currentCheckpoint: 0,
            isActive: true,
            stakedAmount: stakeAmount
        });

        emit ChallengeStarted(msg.sender, newChallengeId, _trailId, stakeAmount);
    }

    function checkIn(bytes memory _signature) external {
        Challenge storage challenge = userChallenge[msg.sender];
        require(challenge.isActive, "No active challenge");

        Trail storage trail = trails[challenge.trailId];
        Checkpoint storage currentCheckpoint = trail.checkpoints[challenge.currentCheckpoint];

        // Verify the signature
        bytes32 message = keccak256(abi.encodePacked(challenge.challengeId, msg.sender));
        address signer = message.toEthSignedMessageHash().recover(_signature);
        require(signer == currentCheckpoint.publicKey, "Invalid signature");

        if (challenge.currentCheckpoint > 0) {
            Checkpoint storage previousCheckpoint = trail.checkpoints[challenge.currentCheckpoint - 1];
            require(
                block.number <= challenge.startBlock + previousCheckpoint.blockLimit,
                "Block limit exceeded"
            );
        }

        challenge.currentCheckpoint++;
        emit CheckpointReached(msg.sender, challenge.challengeId, challenge.currentCheckpoint - 1);

        if (challenge.currentCheckpoint == trail.checkpoints.length) {
            challenge.isActive = false;
            // Transfer staked USDC from reward pool back to user
            require(usdcToken.transferFrom(rewardPool, msg.sender, challenge.stakedAmount), "USDC return failed");
            _mintKey(msg.sender, challenge.challengeId, challenge.trailId, trail.difficulty, challenge.stakedAmount);
        }
    }

    function failChallenge() external {
        require(userChallenge[msg.sender].isActive, "No active challenge");
        _failChallenge(msg.sender);
    }

    function _failChallenge(address user) internal {
        Challenge storage challenge = userChallenge[user];
        challenge.isActive = false;
        // No need to transfer USDC as it's already in the reward pool
        emit ChallengeFailed(user, challenge.challengeId, challenge.stakedAmount);
    }

    function _generateChallengeId(address user, uint256 trailId) internal view returns (bytes16) {
        return bytes16(keccak256(abi.encodePacked(user, trailId, block.timestamp, block.prevrandao)));
    }

    function _mintKey(address to, bytes16 challengeId, uint256 trailId, Difficulty difficulty, uint256 returnedStake) internal {
        uint256 rewardAmount = difficultyRewards[difficulty];
        
        for (uint256 i = 0; i < rewardAmount; i++) {
            uint256 newTokenId = _nextTokenId++;
            _safeMint(to, newTokenId);

            keyMetadata[newTokenId] = KeyMetadata({
                challengeId: challengeId,
                trailId: trailId,
                completionBlock: block.number,
                difficulty: difficulty
            });

            emit KeyMinted(to, newTokenId, challengeId, 1);
        }

        emit ChallengeCompleted(to, challengeId, _nextTokenId - 1, rewardAmount, returnedStake);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        return string(abi.encodePacked("https://api.example.com/key/", toString(tokenId)));
    }

    function getKeyMetadata(uint256 tokenId) public view returns (KeyMetadata memory) {
        return keyMetadata[tokenId];
    }

    function setDifficultyReward(Difficulty difficulty, uint256 reward) external onlyOwner {
        difficultyRewards[difficulty] = reward;
    }

    function setDifficultyStake(Difficulty difficulty, uint256 stake) external onlyOwner {
        difficultyStakes[difficulty] = stake;
    }

    function setRewardPool(address _newRewardPool) external onlyOwner {
        rewardPool = _newRewardPool;
    }

    function toString(uint256 value) internal pure returns (string memory) {
        // Convert uint256 to string
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
