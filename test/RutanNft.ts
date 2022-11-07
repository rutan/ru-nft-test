import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";

describe("RutanNft", () => {
  const deployFixture = async () => {
    const [admin, owner, otherAccount] = await ethers.getSigners();
    const RutanNft = await ethers.getContractFactory("RutanNft");
    const rutanNft = await RutanNft.deploy(owner.address);
    await rutanNft.deployed();
    return { rutanNft, admin, owner, otherAccount };
  };

  describe("name", () => {
    it("Contractの名前が正しいこと", async () => {
      const { rutanNft } = await loadFixture(deployFixture);
      expect(await rutanNft.name()).to.equal("RutanNft");
    });
  });

  describe("royaltyInfo", () => {
    it("ロイヤリティが10%であること", async () => {
      const { rutanNft } = await loadFixture(deployFixture);
      const [_address, value] = await rutanNft.royaltyInfo(1, 100);
      expect(value).to.equal(10);
    });
  });

  describe("admin", () => {
    it("Adminのアドレスが取得できること", async () => {
      const { rutanNft, admin } = await loadFixture(deployFixture);
      expect(await rutanNft.admin()).to.equal(admin.address);
    });
  });

  describe("owner", () => {
    it("オーナーのアドレスが取得できること", async () => {
      const { rutanNft, owner } = await loadFixture(deployFixture);
      expect(await rutanNft.owner()).to.equal(owner.address);
    });
  });

  describe("transferOwnership", () => {
    it("Adminはオーナーのアドレスが変更できること", async () => {
      const { rutanNft, admin, otherAccount } = await loadFixture(deployFixture);
      await rutanNft.connect(admin).transferOwnership(otherAccount.address);
      expect(await rutanNft.owner()).to.equal(otherAccount.address);
    });

    it("owner自身はオーナーのアドレスを変更できないこと", async () => {
      const { rutanNft, owner, otherAccount } = await loadFixture(deployFixture);
      await expect(rutanNft.connect(owner).transferOwnership(otherAccount.address))
        .to.be.revertedWith("Adminable: caller is not the admin");
    });

    it("一般人はオーナーのアドレスを変更できないこと", async () => {
      const { rutanNft, otherAccount } = await loadFixture(deployFixture);
      await expect(rutanNft.connect(otherAccount).transferOwnership(otherAccount.address))
        .to.be.revertedWith("Adminable: caller is not the admin");
    });

    it("owner変更時にロイヤリティのアドレスも変わること", async () => {
      const { rutanNft, owner, otherAccount } = await loadFixture(
        deployFixture
      );
      const [address, _value] = await rutanNft.royaltyInfo(1, 100);
      expect(address).to.equal(owner.address);

      await rutanNft.transferOwnership(otherAccount.address);
      const [newAddress, _newValue] = await rutanNft.royaltyInfo(1, 100);
      expect(newAddress).to.equal(otherAccount.address);
    });
  });

  describe("mint", () => {
    it("1番から順番にNFTがミントされること", async () => {
      const { rutanNft, owner, otherAccount } = await loadFixture(
        deployFixture
      );
      await rutanNft.mint(otherAccount.address);
      expect(await rutanNft.ownerOf(1)).to.equal(otherAccount.address);

      await rutanNft.mint(owner.address);
      expect(await rutanNft.ownerOf(2)).to.equal(owner.address);
    });
  });

  describe("getMintedTokenCount", () => {
    it("mintした個数を返すこと", async () => {
      const { rutanNft, owner } = await loadFixture(deployFixture);
      expect(await rutanNft.getMintedTokenCount()).to.equal(0);
      await rutanNft.mint(owner.address);
      expect(await rutanNft.getMintedTokenCount()).to.equal(1);
      await rutanNft.mint(owner.address);
      expect(await rutanNft.getMintedTokenCount()).to.equal(2);
    });
  });

  describe("setBaseURI", () => {
    it("トークンのURIが変更されること", async () => {
      const { rutanNft, owner } = await loadFixture(deployFixture);
      await rutanNft.mint(owner.address);
      expect(await rutanNft.tokenURI(1)).to.equal(
        "https://files.rutan.dev/inbox/rutan-nft-test/1"
      );

      await rutanNft.setBaseURI("https://example.com/");
      expect(await rutanNft.tokenURI(1)).to.equal("https://example.com/1");
    });
  });
});
