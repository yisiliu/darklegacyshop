import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Hiking", (m) => {
  const hiking = m.contract("HikingChallenge", [
    "0x689f2EE5e82419844564db7b226A72A6A340De43",
    "0x689f2EE5e82419844564db7b226A72A6A340De43",
  ]);

  return { hiking };
});
