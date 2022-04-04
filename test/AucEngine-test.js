const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Dutch Auction testing", function () {
  let owner, buyer, auct;

  beforeEach(async function() {
    [owner, seller, buyer] = await ethers.getSigners()
    
    const AucEngine = await ethers.getContractFactory("AucEngine", owner)
    auct = await AucEngine.deploy()
    await auct._deployed()
  })

  it("sets owner", async function() {
    const currentOwner = await auct.owner()
    expect(currentOwner).to.eq(owner.address)
  })

  async function getTimestamp(bn) {
    return (
      await ethers.provider.getBlock(bn)
    ).timestamp
  }
  
  describe("createAuction", function() {
    it("test auction function", async function() {
      const duration = 60
      const tx = await auct.createAuction(
        ethers.utils.parseEther("0.005"),
        2,
        "fake item",
        duration
      )

      const cAuction = await auct.auctions(0)
      expect(cAuction.item).to.eq("fake item")
      const ts = await getTimestamp(tx.blockNumber)
      expect(cAuction.endsAt).to.eq(ts + duration)
    })
  })

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  describe("buy", function() {
    it("allows to buy", async function() {
      await auct.connect(seller).createAuction(
        ethers.utils.parseEther("0.005"),
        2,
        "fake item",
        60
      )
      
      this.timeout(10000) //10s
      await delay(5000)

      const buyTx = await auct.connect(buyer).buy(0, {value: ethers.utils.parseEther("0.005")})
      
      const cAuction = await auct.auctions(0)
      const finalPrice = cAuction.finalPrice
      await expect( () => buyTx).to.changeEtherBalance(seller, finalPrice - Math.floor((finalPrice * 10) / 100)
      )

      await expect(buyTx).to.emit(auct, "AuctionEnded").withArgs(0, finalPrice, buyer.address)

      await expect(
        auct.connect(buyer).buy(0, {value: ethers.utils.parseEther("0.005")})
      ).to.be.revertedWith('stopped!')
    })
  })  
})
