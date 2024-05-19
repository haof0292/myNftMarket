
import MetaMaskConnector from "@/conpenents/metamaskConnector";
import { Box, HStack, Heading,Text } from "@chakra-ui/react";
import DisPlayActiveTokens from "@/conpenents/displayActiveToken";
import NoteButton from "@/conpenents/noteButton";
import DisplayMyOwnNft from "@/conpenents/displayMyOwnNft";
import DisplayMyPurchasedNft from "@/conpenents/displayMyPurchasedNft";
import DisplayMySoldNft from "@/conpenents/displayMySoldNft";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
      <NoteButton />
      <MetaMaskConnector />
      <br></br>
      <br></br>
      <DisplayMyOwnNft />
      <br></br>
      <br></br>
      <DisplayMyPurchasedNft />
      <br></br>
      <br></br>
      <DisplayMySoldNft />
      <br></br>
      <br></br>
      <DisPlayActiveTokens />
      </div>
    </main>
  );
  
}


