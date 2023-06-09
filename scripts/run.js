const main = async () => { 
    
    const [owner, randomPerson] = await hre.ethers.getSigners();
    //compile our contract and generate the necessary files we need to work with our contract under the artifacts directory
    const waveConractFactory = await hre.ethers.getContractFactory("WavePortal");
    //Hardhat will create a local Ethereum network for us, but just for this contract. Then, after the script completes it'll destroy that local network
    const waveContract = await waveConractFactory.deploy({ 
      value: hre.ethers.utils.parseEther("0.1"),
    });

    //We'll wait until our contract is officially deployed to our local blockchain! Our constructor runs when we actually deploy.
    await waveContract.deployed();
    console.log("Contract deployed to: ", waveContract.address);
    console.log("Contract deployed by: ", owner.address);
    
    let contractBalance = await hre.ethers.provider.getBalance(
      waveContract.address
    );
    console.log("Contract banance: ", hre.ethers.utils.formatEther(contractBalance));
    
    // let waveCount;
    // waveCount = await waveContract.getTotalWaves();
    // console.log(waveCount.toNumber());

    // let waveTxn = await waveContract.wave("qkrq!");
    // waveTxn.wait();
    /*
   * Get Contract balance to see what happened!
   */
    // contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    // console.log(
    //   "Contract balance:",
    //   hre.ethers.utils.formatEther(contractBalance)
    // );
    
    waveTxn1 = await waveContract.connect(randomPerson).wave("1 wave");
    await waveTxn1.wait();

    waveTxn2 = await waveContract.wave("2 wave");
    await waveTxn2.wait();

    waveTxn3 = await waveContract.connect(randomPerson).wave("3 wave");
    await waveTxn3.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);

    //await waveContract.getTotalWaves();
};

const runMain = async () => {
    try {
      await main();
      process.exit(0); // exit Node process without error
    } catch (error) {
      console.log(error);
      process.exit(1); // exit Node process while indicating 'Uncaught Fatal Exception' error
    }
    // Read more about Node exit ('process.exit(num)') status codes here: https://stackoverflow.com/a/47163396/7974948
  };
  
  runMain();