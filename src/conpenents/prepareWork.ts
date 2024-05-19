
import { Signer,Contract, NonceManager, ethers } from "ethers"
import { HxTokenAddress, MarketAddress,account1, account2, pk1, pk2,rpc_url } from "../utils/constant"

const abiJSON = require("../abi/MyMarket.json")
const abi_market = abiJSON.abi
const abiJSON2 = require("../abi/HxToken.json")
const abi_nft = abiJSON2.abi

export default async function prepareWork(){
  const auctionPrice = ethers.parseUnits('1', 'ether')
  const provider = new ethers.JsonRpcProvider(rpc_url)
  const signer_rpc = await provider.getSigner()
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const signer_account1 = new ethers.Wallet(pk1, provider);
  const signer_account2 = new ethers.Wallet(pk2, provider);
  const nonceManager1 = new NonceManager(signer_account1)
  const nonceManager2 = new NonceManager(signer_account2)
  const market:Contract = new ethers.Contract(MarketAddress, abi_market, signer_rpc)
  const nft:Contract = new ethers.Contract(HxTokenAddress, abi_nft, signer_rpc)
  let tcNum1 = await provider.getTransactionCount(account1)
  const listingFee = await market.getListingFee()
  console.log("listingFee:" + listingFee)
  // console.log("1.mint tokenId:1-6 to account1:", account1)
  // console.log("2. account 1 approve and list tokenId:1-6 to market")
//   for(let i=1;i<=6;i++){
//     await nft.mintTo(account1, i)
//     console.log("mint tokenId: " + i + " to account1: ", account1)
//     await nft.connect(signer_account1).approve(MarketAddress, i)
//     console.log("approve  to Market, tokenId: ", i)
//     await market.createMarketItem(HxTokenAddress, i, auctionPrice, { value: listingFee })
//     console.log("market createMarketItem tokenId: ", i)
//     sleep(500)
//   }
  
//   console.log("3. mint tokenId:7-12 to account2:" + account2)
//   console.log("4. account2 approve and  list tokenId:7-9 to market")
//   for(let i=7;i<=12;i++){
//     await nft.mintTo(account2, i)
//     console.log("mint tokenId: " + i + " to account2: ", account2)
//     await nft.connect(signer_account2).approve(MarketAddress, i)
//     console.log("approve  to Market, tokenId: ", i)
//     await market.createMarketItem(HxTokenAddress, i, auctionPrice, { value: listingFee })
//     console.log("market createMarketItem tokenId: ", i)
//     sleep(500)
//   }
  
//   for(let i=7;i<=12;i++){
//     const owerof7 = await nft.ownerOf(i)
//     console.log("tokenId " + i + " owner:", owerof7)
//     const appr7 = await nft.getApproved(i)
//     console.log("tokenId " + i + " getApproved:", appr7) 
//   }
//   sleep(2000)
//   await market.connect(signer_account1).createMarketSale(HxTokenAddress, 7, { value: auctionPrice})
//   sleep(2000)
//   await market.connect(signer_account1).createMarketSale(HxTokenAddress, 8, { value: auctionPrice})
  
//   console.log("6. account1 delete tokenId:6")
//   await market.connect(signer_account1).deleteMarketItem(6)
//   sleep(2000)
  const token_info7 = await market.fetchActiveItems()
  console.log("token_info7:", token_info7.length)

  return token_info7;
}