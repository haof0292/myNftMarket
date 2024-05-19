'use client'
import React, { useEffect,useState } from 'react';
import { Box, Text} from '@chakra-ui/react'
import {HxTokenAddress, MarketAddress,account1, account2, pk1, pk2,rpc_url } from "../utils/constant"
import { Contract, ethers } from 'ethers';

const base64 = require( "base-64")
const abiJSON = require("../abi/HxToken.json")
const abi = abiJSON.abi
interface ItemInfo{
  name:string,
  description:string,
  svg:string
}
declare let window:any
export default function CardERC721(props:any){
  const tokenId = props.tokenId
  const [itemInfo, setItemInfo] = useState<ItemInfo>()  
  const [nftUri, setUri] = useState<string>("")  
  useEffect(() => {
    let provider:any
    if(window.ethereum == "undefined") { 
      provider = new ethers.JsonRpcProvider(rpc_url)
      console.log("window.ethereum undefined , use rpc provider !!")
    } else{
      provider = new ethers.BrowserProvider(window.ethereum)
      console.log("use window ethereun provider !!!")
    }
    const nft:Contract = new ethers.Contract(HxTokenAddress, abi, provider)
    provider.getCode(HxTokenAddress).then((result:string)=>{
      if(result === '0x') {
        console.log("found no codes on the contract:",HxTokenAddress)
        return -1
        }
      }).catch((e:Error)=>console.log(e)) 
      nft.tokenURI(tokenId).then((result:string)=>{
        setUri(result)
      }).catch((e:Error)=>console.log(e))  

      if (!nftUri) {
        return
      }
      const data = base64.decode(nftUri.slice(29))
      const itemInfo = JSON.parse(data)
      const svg = base64.decode(itemInfo.image.slice(26))
      setItemInfo({
        "name":itemInfo.name,
        "description":itemInfo.description,
        "svg":svg})
      
  },[nftUri])
  
return (
  <Box my={2} bg='gray.100' borderRadius='md' width={220} height={260} px={3} py={4}>
  {itemInfo
  ?<Box>
    <img src={`data:image/svg+xml;utf8,${itemInfo.svg}`} alt={itemInfo.name} width= '200px' />
    <Text fontSize='xl' px={2} py={2}>{itemInfo.name}</Text>
    <br></br>
  </Box>
  :<Box />
  }
  </Box>
)
}
