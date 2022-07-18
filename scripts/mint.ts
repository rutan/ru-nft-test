import { ethers } from "hardhat";

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS || "";
  if (!contractAddress) throw "please set process.env.CONTRACT_ADDRESS";

  const targetAddress = process.env.TARGET_ADDRESS || "";
  if (!targetAddress) throw "please set process.env.TARGET_ADDRESS";

  const RutanNft = await ethers.getContractFactory("RutanNft");
  const rutanNft = await RutanNft.attach(contractAddress);

  const result = await rutanNft.mint(targetAddress);
  console.log(result);

  const count = await rutanNft.getMintedTokenCount();
  console.log(`minted nft count : ${count}`);
}

main()
  .then(() => process.exit())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
