//const { ethers } = require("hardhat");

async function main() {
    const [creator] = await hre.ethers.getSigners();

    const getKeyBoardFactoryContract = await hre.ethers.getContractFactory("Keyboards");
    const KeyboardContract = await getKeyBoardFactoryContract.deploy();
    await KeyboardContract.deployed();
    console.log("Contract deployed at : ", KeyboardContract.address);


}

// We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });