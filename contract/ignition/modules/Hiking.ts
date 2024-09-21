import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Hiking", (m) => {
  const hiking = m.contract("HikingChallenge", [
    "0x5fbdb2315678afecb367f032d93f642f64180aa3",
    "0x5fbdb2315678afecb367f032d93f642f64180aa3",
  ]);

  return { hiking };
});
