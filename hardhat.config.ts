import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-abi-exporter';

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  abiExporter: {
    path: './data/abi',
    runOnCompile: true,
    clear: true,
    spacing: 2,
    format: "json",
    flat: true,
    only: ['RutanNft']
  },
  networks: {
    'matic-testnet': {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [
        process.env.PRIVATE_KEY || ''
      ].filter(Boolean)
    }
  }
};

export default config;
