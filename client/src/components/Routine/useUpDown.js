import React, { useState } from 'react'

export default (initialValue) => {
    const [num, setNum] = useState(initialValue);
    
    const increaseNum = () => {
        setNum(num + 1)
    }

    const decreaseNum = () => {
        setNum(num - 1)
    }

    return [num, increaseNum, decreaseNum];
}