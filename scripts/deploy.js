async function main() {
    const Voting = await ethers.getContractFactory("Voting");
  
    // Start deployment, returning a promise that resolves to a contract object
    const Voting_ = await Voting.deploy(["Narendra Modi", "Rahul G", "Lalu Prasad", "Arvind Kejriwal"], 10);
    console.log("Contract address:", Voting_.address);
  
  
  }
  
  main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });