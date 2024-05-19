"use client"
import { Button } from '@chakra-ui/react';
import { useState} from 'react'
const MyButton = () => {
    const [like, setLike] = useState(100);
    function handle(){
        setLike(like + 1);
    }
    return (
    <Button type="button" onClick={handle}> I love Hexi {like} times
    </Button>
    )};
export default MyButton;