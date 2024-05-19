'use client'
import React, { useEffect, useState } from 'react'
import { Grid, GridItem, Box, Text, Button, Heading } from "@chakra-ui/react"
import  CardERC721  from "./CardERC721"
import { Contract, ethers, formatEther } from 'ethers'
import { HxTokenAddress, MarketAddress,account1, account2, pk1, pk2,rpc_url } from "../utils/constant"

  const abiJSON = require("../abi/MyMarket.json")
  const abi_market = abiJSON.abi
  enum State { Created, Release, Inactive }
  interface ItemInfo{
    id:Number,
    address_nftContract:string,
    tokenId:Number,
    seller:string,
    buyer:string,
    price:bigint,
    state:State
    }
  declare let window:any
export default function DisPlayActiveTokens(){
  const [items, setItems] = useState<ItemInfo[]>()
  useEffect( () => {
    let provider:any
    let market:Contract
    if(window.ethereum == "undefined") { 
      provider = new ethers.JsonRpcProvider(rpc_url)
      console.log("window.ethereum undefined , use rpc provider !!")
    } else{
      provider = new ethers.BrowserProvider(window.ethereum)
      console.log("use window ethereun provider !!!")
    }
    market = new ethers.Contract(MarketAddress, abi_market, provider)
    provider.getCode(MarketAddress).then((result:string)=>{
    if(result === '0x') {
      console.log("found no codes on the contract:",MarketAddress)
      return -1
    }
    market.fetchActiveItems().then((result)=>{
      setItems(result)
      console.log("items length:", result.length)
    }).catch((e)=>console.log(e))
    })
    if(!items) return
    console.log("token_info7:", items.length)
  },[items?.length])

  async function buyInNFTMarket(event:React.FormEvent, itemId:bigint) {
    const auctionPrice = ethers.parseUnits('1', 'ether')
    event.preventDefault()
    if(window.ethereum == "undefined") {
      console.log("found no metamark ")
      return
    }
    console.log("clicked!!! want to buy itemId:", itemId)
    const provider = new ethers.BrowserProvider(window.ethereum)
    const accounts:Array<string> = await provider.send("eth_requestAccounts", [])
    if(accounts.length == 0){
      console.log("please log in your account first !!!")
      return
    } 
    console.log("current account:", accounts[0])
    const signer = await provider.getSigner()
    console.log("signer:", signer)
    const market = new ethers.Contract(MarketAddress, abi_market, signer)
    console.log("market contract address:", await market.getAddress()) 
    market.createMarketSale(HxTokenAddress, itemId, {value:auctionPrice}
      ).catch((e: any)=>console.log(e))
  }

  const state = ["On Sale","Sold","Inactive"]
  return (
    items?
    <div>
    <Heading as="h3"  my={4}>Display All NFT:</Heading>
    <Grid templateColumns='repeat(3, 1fr)' gap={0} w='100%'>
        {items.map((item:any) => (
          <GridItem key={item.id} >
          <CardERC721 tokenId={item.tokenId}></CardERC721>
          <Text fontSize='sm' px={5} pb={1}> {state[item.state]} </Text> 
          <Text fontSize='sm' px={5} pb={1}> price:{formatEther(item.price)} </Text> 
          <Text fontSize='xl' px={2} py={2}>owner:{item.seller}</Text>
              <Box>{
              (item.state == 0)
              ? <Button width={220} type="submit" onClick={(e)=>buyInNFTMarket(e,item.id)}>Buy this!</Button>
              : <Text></Text>
              }
              </Box>
        </GridItem>
        ))}
    </Grid>
    </div>
    :<Text>Loading active items </Text>
    )
}

