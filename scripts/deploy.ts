import { ethers } from "hardhat";

async function main() {
  const RutanNft = await ethers.getContractFactory("RutanNft");
  const rutanNft = await RutanNft.deploy();

  await rutanNft.deployed();

  console.log("deployed to: ", rutanNft.address);
}

main()
  .then(() => process.exit())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
