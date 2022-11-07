import { ethers } from "hardhat";

async function main() {
  const ownerAddress = process.env.OWNER_ADDRESS || "";
  if (!ownerAddress) throw "please set process.env.OWNER_ADDRESS";

  const RutanNft = await ethers.getContractFactory("RutanNft");
  const rutanNft = await RutanNft.deploy(ownerAddress);

  await rutanNft.deployed();

  console.log("deployed to: ", rutanNft.address);
}

main()
  .then(() => process.exit())
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
