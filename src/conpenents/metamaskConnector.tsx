'use client'
import { VStack, Heading, Box} from "@chakra-ui/layout"
import { Text, Button } from '@chakra-ui/react'
import { useState, useEffect} from 'react'
import { ethers } from "ethers";

declare let window:any
const MetaMaskConnector = () => {
    const [balance, setBalance] = useState<string | undefined>()
    const [currentAccount, setCurrentAccount] = useState<string | undefined>()
    const [chainId, setChainId] = useState<string | undefined>()
    const [chainname, setChainName] = useState<string | undefined>()
  
    useEffect(() => {
      //get ETH balance and network info only when having currentAccount 
      if(!currentAccount || !ethers.isAddress(currentAccount)) return
      //client side code
      if(!window.ethereum) {
        console.log("please install MetaMask")
        return
      }
      const provider = new ethers.BrowserProvider(window.ethereum)
      provider.getBalance(currentAccount).then((result)=>{
        setBalance(ethers.formatEther(result))
      }).catch((e)=>console.log(e))
  
      provider.getNetwork().then((result)=>{
        const newId:string = result.chainId.toString()
        setChainId(newId)
        setChainName(result.name)
      }).catch((e)=>console.log(e))
  
    },[currentAccount])
  
    //click connect
    const onClickConnect = () => {
      //client side code
      if(!window.ethereum) {
        console.log("please install MetaMask")
        return
      }

      const provider = new ethers.BrowserProvider(window.ethereum)
      provider.send("eth_requestAccounts", [])
      .then((accounts)=>{
        if(accounts.length>0) setCurrentAccount(accounts[0])
      }).catch((e)=>console.log(e))
  
    }
  
    //click disconnect
    const onClickDisconnect = () => {
      console.log("onClickDisConnect")
      setBalance(undefined)
      setCurrentAccount(undefined)
    }
    return (        
        <VStack>
          <Box w='100%' my={4}>
          {currentAccount  
            ? <Box  mb={0} p={4} w='50%' borderWidth="1px" borderRadius="lg">
                <Button type="button" w='50%' onClick={onClickDisconnect}>
                  Connect Success !!!
                </Button>
                <Heading my={4}  fontSize='xl'>Account info</Heading>
                <Text>Account:{currentAccount}</Text>
                <Text>Balance:{balance}</Text>
                <Text>ChainId: {chainId} </Text>
                <Text>ChainName: {chainname}</Text>
              </Box>  
            : <Button type="button" w='30%' onClick={onClickConnect}>
                    Connect MetaMask
                </Button>
          }
          </Box>
        </VStack>
    )
  }
  export default MetaMaskConnector