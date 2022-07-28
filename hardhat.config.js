require("@nomicfoundation/hardhat-toolbox");
//require('@nomiclabs/hardhat-waffle');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: "", // node api key here
      accounts: [""], // private key here
    },
  },
};
