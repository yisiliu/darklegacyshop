// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

contract UndergroundDungeon is Ownable {
    IERC20 public usdcToken;
    address public rewardPool;

    enum AreaType { Empty, Monster, Chest, NextLevel }

    struct DungeonArea {
        AreaType areaType;
        bool isUnlocked;
        uint256 monsterHealth;
        uint256 chestReward;
    }

    struct DungeonLevel {
        uint256 level;
        mapping(uint256 => DungeonArea) areas;
        uint256 unlockedAreas;
        uint256 totalAreas;
    }

    struct PlayerStats {
        uint256 strength;     // Affects damage dealt to monsters
        uint256 endurance;    // Affects ability to withstand monster attacks
        uint256 agility;      // Affects chance to dodge monster attacks
        uint256 luck;         // Affects chest rewards and rare item finds
    }

    struct PlayerDungeon {
        uint256 currentLevel;
        uint256 keyBalance;
        PlayerStats stats;
        mapping(uint256 => DungeonLevel) levels;
    }

    mapping(address => PlayerDungeon) public playerDungeons;

    uint256 public constant BOSS_LEVEL_INTERVAL = 5;
    uint256 public constant KEY_UNLOCK_COST = 1;
    uint256 public constant INITIAL_STAT_POINTS = 20;
    uint256 public constant MAX_STAT_VALUE = 100;

    event AreaUnlocked(address indexed player, uint256 level, uint256 area);
    event MonsterDefeated(address indexed player, uint256 level, uint256 area, uint256 damage);
    event PlayerDamaged(address indexed player, uint256 damage);
    event ChestOpened(address indexed player, uint256 level, uint256 area, uint256 reward);
    event NextLevelReached(address indexed player, uint256 newLevel);
    event BossDefeated(uint256 level, uint256 totalReward, uint256 participantCount);
    event StatPointsAllocated(address indexed player, string stat, uint256 value);

    constructor(address _usdcTokenAddress, address _rewardPool) Ownable(msg.sender) {
        usdcToken = IERC20(_usdcTokenAddress);
        rewardPool = _rewardPool;
    }

    function initializePlayerDungeon(address player) external {
        require(playerDungeons[player].currentLevel == 0, "Player dungeon already initialized");
        playerDungeons[player].currentLevel = 1;
        playerDungeons[player].stats = PlayerStats(5, 5, 5, 5);  // Initial balanced stats
        _initializeNewLevel(player);
    }

    function allocateStatPoints(string calldata stat, uint256 points) external {
        PlayerDungeon storage dungeon = playerDungeons[msg.sender];
        require(points <= INITIAL_STAT_POINTS, "Exceeds available stat points");

        if (keccak256(abi.encodePacked(stat)) == keccak256(abi.encodePacked("strength"))) {
            require(dungeon.stats.strength + points <= MAX_STAT_VALUE, "Exceeds max stat value");
            dungeon.stats.strength += points;
        } else if (keccak256(abi.encodePacked(stat)) == keccak256(abi.encodePacked("endurance"))) {
            require(dungeon.stats.endurance + points <= MAX_STAT_VALUE, "Exceeds max stat value");
            dungeon.stats.endurance += points;
        } else if (keccak256(abi.encodePacked(stat)) == keccak256(abi.encodePacked("agility"))) {
            require(dungeon.stats.agility + points <= MAX_STAT_VALUE, "Exceeds max stat value");
            dungeon.stats.agility += points;
        } else if (keccak256(abi.encodePacked(stat)) == keccak256(abi.encodePacked("luck"))) {
            require(dungeon.stats.luck + points <= MAX_STAT_VALUE, "Exceeds max stat value");
            dungeon.stats.luck += points;
        } else {
            revert("Invalid stat");
        }

        emit StatPointsAllocated(msg.sender, stat, points);
    }

    function addKeys(address player, uint256 amount) external {
        playerDungeons[player].keyBalance += amount;
    }

    function unlockArea(address player, uint256 level, uint256 area) public {
        PlayerDungeon storage dungeon = playerDungeons[player];
        require(dungeon.keyBalance >= KEY_UNLOCK_COST, "Insufficient KEY balance");
        require(level == dungeon.currentLevel, "Invalid level");
        require(area < dungeon.levels[level].totalAreas, "Invalid area");
        require(!dungeon.levels[level].areas[area].isUnlocked, "Area already unlocked");

        dungeon.keyBalance -= KEY_UNLOCK_COST;
        dungeon.levels[level].areas[area].isUnlocked = true;
        dungeon.levels[level].unlockedAreas++;

        // Randomly determine area type and contents
        uint256 rand = uint256(keccak256(abi.encodePacked(block.timestamp, player, level, area)));
        AreaType areaType = AreaType(rand % 4);
        dungeon.levels[level].areas[area].areaType = areaType;

        if (areaType == AreaType.Monster) {
            dungeon.levels[level].areas[area].monsterHealth = (rand % 100) + 50;
        } else if (areaType == AreaType.Chest) {
            dungeon.levels[level].areas[area].chestReward = (rand % 5) + 1;
        }

        emit AreaUnlocked(player, level, area);
    }

    function interactWithArea(address player, uint256 level, uint256 area) public {
        PlayerDungeon storage dungeon = playerDungeons[player];
        require(level == dungeon.currentLevel, "Invalid level");
        require(area < dungeon.levels[level].totalAreas, "Invalid area");
        require(dungeon.levels[level].areas[area].isUnlocked, "Area not unlocked");

        DungeonArea storage currentArea = dungeon.levels[level].areas[area];

        if (currentArea.areaType == AreaType.Monster) {
            uint256 damage = _calculateDamage(dungeon.stats.strength);
            currentArea.monsterHealth = currentArea.monsterHealth > damage ? currentArea.monsterHealth - damage : 0;
            
            if (currentArea.monsterHealth == 0) {
                emit MonsterDefeated(player, level, area, damage);
            } else {
                uint256 playerDamage = _calculateMonsterDamage(level, dungeon.stats.endurance, dungeon.stats.agility);
                emit PlayerDamaged(player, playerDamage);
            }
        } else if (currentArea.areaType == AreaType.Chest) {
            uint256 reward = currentArea.chestReward;
            uint256 bonusReward = (reward * dungeon.stats.luck) / 100;
            dungeon.keyBalance += reward + bonusReward;
            currentArea.chestReward = 0;
            emit ChestOpened(player, level, area, reward + bonusReward);
        } else if (currentArea.areaType == AreaType.NextLevel) {
            dungeon.currentLevel++;
            _initializeNewLevel(player);
            emit NextLevelReached(player, dungeon.currentLevel);
        }

        // Check if all areas are unlocked and interacted with
        if (dungeon.levels[level].unlockedAreas == dungeon.levels[level].totalAreas) {
            dungeon.currentLevel++;
            _initializeNewLevel(player);
            emit NextLevelReached(player, dungeon.currentLevel);
        }
    }

    function contributeToActiveBossFight(address player) public {
        PlayerDungeon storage dungeon = playerDungeons[player];
        uint256 bossLevel = (dungeon.currentLevel / BOSS_LEVEL_INTERVAL) * BOSS_LEVEL_INTERVAL;
        require(bossLevel > 0 && bossLevel == dungeon.currentLevel, "No active boss fight");

        uint256 damage = _calculateDamage(dungeon.stats.strength) * 2;  // Double damage for boss fights
        dungeon.levels[bossLevel].areas[0].monsterHealth -= damage;

        if (dungeon.levels[bossLevel].areas[0].monsterHealth <= 0) {
            uint256 totalReward = usdcToken.balanceOf(rewardPool);
            uint256 participantCount = 1; // This should be tracked properly in a real implementation
            uint256 rewardPerParticipant = totalReward / participantCount;

            require(usdcToken.transferFrom(rewardPool, player, rewardPerParticipant), "Reward distribution failed");

            emit BossDefeated(bossLevel, totalReward, participantCount);

            dungeon.currentLevel++;
            _initializeNewLevel(player);
        }
    }

    function _initializeNewLevel(address player) internal {
        PlayerDungeon storage dungeon = playerDungeons[player];
        uint256 newLevel = dungeon.currentLevel;
        uint256 areas = _calculateAreasForLevel(newLevel);

        dungeon.levels[newLevel].level = newLevel;
        dungeon.levels[newLevel].totalAreas = areas;
        dungeon.levels[newLevel].unlockedAreas = 0;

        // If it's a boss level, initialize the boss
        if (newLevel % BOSS_LEVEL_INTERVAL == 0) {
            dungeon.levels[newLevel].areas[0].areaType = AreaType.Monster;
            dungeon.levels[newLevel].areas[0].monsterHealth = newLevel * 100; // Example boss health calculation
            dungeon.levels[newLevel].areas[0].isUnlocked = true;
            dungeon.levels[newLevel].unlockedAreas = 1;
        }
    }

    function _calculateAreasForLevel(uint256 level) internal pure returns (uint256) {
        uint256 lnApprox = approximateLog(level);
        
        // Scale by 15, add offset of 5, and round
        // We add 5e17 (half of 1e18) before dividing by 1e18 to implement rounding
        uint256 scaled = (15 * lnApprox + 5e18 + 5e17) / 1e18;
        
        return scaled;
    }

    function approximateLog(uint256 x) internal pure returns (uint256) {
        if (x == 0) return 0;
        
        uint256 y = 0;
        uint256 z = (x * 1e18) / (1e18 + x);
        uint256 term = 1e18;
        
        // Use 8 iterations of the series expansion
        for (uint256 i = 1; i <= 8; i++) {
            y += term / i;
            term = (term * z) / 1e18;
        }
        
        return y;
    }

    function _calculateDamage(uint256 strength) internal pure returns (uint256) {
        return strength * 2;  // Simple damage calculation
    }

    function _calculateMonsterDamage(uint256 level, uint256 endurance, uint256 agility) internal view returns (uint256) {
        uint256 baseDamage = level * 10;
        uint256 reducedDamage = (baseDamage * (100 - endurance)) / 100;
        
        // Chance to dodge based on agility
        uint256 dodgeChance = agility / 2;  // 50% of agility is the dodge chance
        if (uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) % 100 < dodgeChance) {
            return 0;  // Dodged the attack
        }
        
        return reducedDamage;
    }

    function getLevelInfo(address player, uint256 level) external view returns (uint256 levelNumber, uint256 bossHealth, uint256 unlockedAreas, uint256 totalAreas) {
        PlayerDungeon storage dungeon = playerDungeons[player];
        DungeonLevel storage dungeonLevel = dungeon.levels[level];
        
        levelNumber = dungeonLevel.level;
        unlockedAreas = dungeonLevel.unlockedAreas;
        totalAreas = dungeonLevel.totalAreas;
        
        if (level % BOSS_LEVEL_INTERVAL == 0) {
            bossHealth = dungeonLevel.areas[0].monsterHealth;
        }
    }

    function getAreaInfo(address player, uint256 level, uint256 area) external view returns (
        AreaType areaType,
        bool isUnlocked,
        uint256 monsterHealth,
        uint256 chestReward
    ) {
        PlayerDungeon storage dungeon = playerDungeons[player];
        DungeonArea storage dungeonArea = dungeon.levels[level].areas[area];
        
        areaType = dungeonArea.areaType;
        isUnlocked = dungeonArea.isUnlocked;
        monsterHealth = dungeonArea.monsterHealth;
        chestReward = dungeonArea.chestReward;
    }

    function getPlayerStats(address player) external view returns (PlayerStats memory) {
        return playerDungeons[player].stats;
    }

    function setRewardPool(address _newRewardPool) external onlyOwner {
        rewardPool = _newRewardPool;
    }
}
