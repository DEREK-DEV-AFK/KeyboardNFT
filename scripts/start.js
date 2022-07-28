async function main() {
    const [owner, someonelse] = await hre.ethers.getSigners();
    const keyboardsContractFactory = await hre.ethers.getContractFactory("Keyboards");
    const keyboardsContract = await keyboardsContractFactory.deploy();
    await keyboardsContract.deployed();
  
    console.log("Contract deployed to:", keyboardsContract.address);

    const keyboards = await keyboardsContract.getKeyboards();
    console.log("We got the keyboards!", keyboards);

    const keyboardTxn1 = await keyboardsContract.create(0, true, "sepia");
    const txnReceipt =  await keyboardTxn1.wait();
    console.log("event emitted is : ",txnReceipt.events);

    const keyboardTxn2 = await keyboardsContract.connect(someonelse).create(1, false, "grayscale");
    const txnReceipt2 = await keyboardTxn2.wait();
    console.log("Check event ;",txnReceipt2.events);
  
    const keyboardsrecheck = await keyboardsContract.getKeyboards();
    console.log("We got the keyboards!", keyboardsrecheck);

    const keyBoardCheckByOther = await keyboardsContract.connect(someonelse).getKeyboards();
    console.log("Call by other address :",keyBoardCheckByOther);

    const checkBeforeBalance = await hre.ethers.provider.getBalance(someonelse.address);
    console.log("Balance Before Tip : ", hre.ethers.utils.formatEther(checkBeforeBalance));

    const sendTip = await keyboardsContract.connect(someonelse).tip(0, {value: hre.ethers.utils.parseEther("10")});
    const tipTxnRecipt = await sendTip.wait();
    console.log("Tip sended event : ", tipTxnRecipt.events);

    const checkAfterBalance = await hre.ethers.provider.getBalance(someonelse.address);
    console.log("Balance after tip : ", hre.ethers.utils.formatEther(checkAfterBalance));

    const checkOwnerOfTpBalance = await hre.ethers.provider.getBalance(owner.address);
    console.log("Checking of Balance of owner : ",hre.ethers.utils.formatEther(checkOwnerOfTpBalance));
  }
  
  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  