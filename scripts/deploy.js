const hre = require("hardhat");

async function main() {
  
  const AucEngine = await hre.ethers.getContractFactory("AucEngine");
  const auction = await AucEngine.deploy();

  await auction.deployed();

  console.log(`Auction address: ${auction.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
