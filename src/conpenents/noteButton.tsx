'use client'

import { useState } from "react"

export default function NoteButton(){
    const [show, setShow] = useState<boolean>(true)
    const[content, setContent] = useState<string>("Hide Notes")
    function handle(){
        setShow(!show)
        if(!show){
            setContent("Hide Notes")
        }else{
            setContent("Show Notes")
        }      
    }
    return (
    show?
    <div>
        <button onClick={handle}>{content}</button>
        <p>1. mint tokenId:1-10 to account2:0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC</p>
        <p>2. account2 approve and display tokenId:1-10 to market</p>
        <p>3. mint tokenId:11-20 to account1:0x70997970C51812dc3A010C7d01b50e0d17dc79C8</p>
        <p>4. account1 approve and  list tokenId:11-20 to market</p>
        <p>5. account1 buy tokenId:8 and 9, account2 buy tokenId:11</p>
    </div>
    :<button onClick={handle}>{content}</button>
    )
}