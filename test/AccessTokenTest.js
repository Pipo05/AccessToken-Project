const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AccessToken", function () {
  let AccessToken, accessToken, owner, addr1, addr2;

  beforeEach(async function () {
    AccessToken = await ethers.getContractFactory("AccessToken");
    [owner, addr1, addr2] = await ethers.getSigners();
    accessToken = await AccessToken.deploy();
    await accessToken.deployed();
  });

  it("Should deploy with the correct total supply", async function () {
    const totalSupply = await accessToken.totalSupply();
    expect(totalSupply).to.equal(ethers.utils.parseEther("1000000000")); // 1 billion tokens
  });

  it("Should allow transfers between accounts", async function () {
    await accessToken.transfer(addr1.address, ethers.utils.parseEther("100"));
    const addr1Balance = await accessToken.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(ethers.utils.parseEther("100"));
  });

  it("Should allow the owner to mint new tokens", async function () {
    await accessToken.mint(addr1.address, ethers.utils.parseEther("500"));
    const addr1Balance = await accessToken.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(ethers.utils.parseEther("500"));
  });

  it("Should allow token burning", async function () {
    await accessToken.transfer(addr1.address, ethers.utils.parseEther("100"));
    await accessToken.connect(addr1).burn(ethers.utils.parseEther("50"));
    const addr1Balance = await accessToken.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(ethers.utils.parseEther("50"));
  });
});
