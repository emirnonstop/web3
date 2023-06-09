const { task } = require("hardhat/config");

require("@nomicfoundation/hardhat-toolbox");
// Import and configure dotenv
require("dotenv").config();

// task("accounts", "Print the list of all accounts", async(taskArgs, hre) => { 
//   const accounts = await hre.ethers.getSigners(); 

//   for (const account of accounts){ 
//     console.log(account.address);
//   }
// })
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      // This value will be replaced on runtime
      url: process.env.STAGING_QUICKNODE_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

