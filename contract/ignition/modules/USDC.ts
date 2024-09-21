import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("USDC", (m) => {
  const usdc = m.contract("MockUSDC", [1000000]);

  return { usdc };
});
