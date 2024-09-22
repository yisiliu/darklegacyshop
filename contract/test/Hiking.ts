import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { HikingChallenge, IERC20 } from "../../typechain-types";

describe("HikingChallenge", function () {
  let hikingChallenge: HikingChallenge;
  let usdcToken: IERC20;
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let rewardPool: SignerWithAddress;

  beforeEach(async function () {
    [owner, user1, user2, rewardPool] = await ethers.getSigners();

    // Deploy mock USDC token
    const MockUSDC = await ethers.getContractFactory("MockUSDC");
    usdcToken = await MockUSDC.deploy(100000);

    // Deploy HikingChallenge contract
    const HikingChallenge = await ethers.getContractFactory("HikingChallenge");
    hikingChallenge = await HikingChallenge.deploy(
      usdcToken.address,
      rewardPool.address,
    );

    // Mint some USDC to users
    await usdcToken.mint(user1.address, ethers.utils.parseUnits("1000", 6));
    await usdcToken.mint(user2.address, ethers.utils.parseUnits("1000", 6));
  });

  describe("Trail Creation", function () {
    it("Should create a new trail", async function () {
      const locations = [
        { latitude: 42775200000, longitude: 141692000000 },
        { latitude: 43061800000, longitude: 141354500000 },
      ];
      const blockLimits = [100];
      const publicKeys = [await user1.getAddress(), await user2.getAddress()];

      await expect(
        hikingChallenge
          .connect(user1)
          .createTrail(locations, blockLimits, publicKeys, 0),
      )
        .to.emit(hikingChallenge, "TrailCreated")
        .withArgs(0, user1.address, 0);

      const trail = await hikingChallenge.trails(0);
      expect(trail.creator).to.equal(user1.address);
      expect(trail.difficulty).to.equal(0);
      expect(trail.isActive).to.be.true;
    });

    it("Should fail to create a trail with invalid input", async function () {
      const locations = [{ latitude: 42775200000, longitude: 141692000000 }];
      const blockLimits = [100];
      const publicKeys = [await user1.getAddress()];

      await expect(
        hikingChallenge
          .connect(user1)
          .createTrail(locations, blockLimits, publicKeys, 0),
      ).to.be.revertedWith("Trail must have at least 2 points");
    });
  });

  describe("Challenge Start", function () {
    beforeEach(async function () {
      const locations = [
        { latitude: 42775200000, longitude: 141692000000 },
        { latitude: 43061800000, longitude: 141354500000 },
      ];
      const blockLimits = [100];
      const publicKeys = [await user1.getAddress(), await user2.getAddress()];

      await hikingChallenge
        .connect(user1)
        .createTrail(locations, blockLimits, publicKeys, 0);
    });

    it("Should start a new challenge", async function () {
      await usdcToken
        .connect(user2)
        .approve(hikingChallenge.address, ethers.utils.parseUnits("1", 6));

      await expect(hikingChallenge.connect(user2).startChallenge(0))
        .to.emit(hikingChallenge, "ChallengeStarted")
        .withArgs(
          user2.address,
          ethers.constants.HashZero,
          0,
          ethers.utils.parseUnits("1", 6),
        );

      const challenge = await hikingChallenge.userChallenge(user2.address);
      expect(challenge.isActive).to.be.true;
      expect(challenge.trailId).to.equal(0);
    });

    it("Should fail to start a challenge with insufficient USDC", async function () {
      await usdcToken
        .connect(user2)
        .approve(hikingChallenge.address, ethers.utils.parseUnits("0.5", 6));

      await expect(
        hikingChallenge.connect(user2).startChallenge(0),
      ).to.be.revertedWith("USDC transfer to reward pool failed");
    });
  });

  // Add more test cases for other functions like checkIn, failChallenge, etc.
});
