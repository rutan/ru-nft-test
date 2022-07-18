import { ethers } from "hardhat";

async function main() {
  const contractAddress = process.env.CONTRACT_ADDRESS || "";
  if (!contractAddress) throw "please set process.env.CONTRACT_ADDRESS";

  const RutanNft = await ethers.getContractFactory("RutanNft");
  const rutanNft = await RutanNft.attach(contractAddress);

  const owner = await rutanNft.owner();
  console.log(`owner\t${owner}`);
  console.log("");

  const mintedTokenCount = (await rutanNft.getMintedTokenCount()).toNumber();
  for (let i = 1; i <= mintedTokenCount; ++i) {
    const address = await rutanNft.ownerOf(i);
    console.log(`token:${i}\t${address}`);
  }
}

main()
  .then(() => process.exit())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
