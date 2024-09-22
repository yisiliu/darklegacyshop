import { HardhatUserConfig } from "hardhat/config";
//import "@nomicfoundation/hardhat-toolbox-viem";
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { PRIVATE_KEY, INFURA_API_KEY, LINEASCAN_API_KEY } = process.env;
const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    linea_sepolia: {
      url: `https://linea-sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    linea_mainnet: {
      url: `https://linea-mainnet.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
    flow_testnet: {
      url: "https://testnet.evm.nodes.onflow.org",
      accounts: [PRIVATE_KEY],
      gas: 500000,
      gasPrice: 150000000,
    },
  },
  etherscan: {
    apiKey: {
      linea_sepolia: LINEASCAN_API_KEY,
    },
    customChains: [
      {
        network: "linea_sepolia",
        chainId: 59141,
        urls: {
          apiURL: "https://api-sepolia.lineascan.build/api",
          browserURL: "https://sepolia.lineascan.build/",
        },
      },
    ],
  },
};

export default config;
