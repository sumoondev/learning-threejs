import { useState, useEffect } from "react"

export default function Clicker() 
{
    const [ count, setCount ] = useState(0)

    useEffect(() =>
    {
        const savedCount = parseInt(localStorage.getItem('count') ?? 0)
        setCount(savedCount)
    }, [])

    useEffect(() =>
    {
        localStorage.setItem('count', count)
    }, [ count ])

    const buttonClick = () => 
    {
        setCount(value => value + 1 )
    }

    const buttonReset = () =>
    {
        setCount(0)
    }

    return <div>
        <div>Click count: { count }</div>
        <button onClick={ buttonClick }>Click me</button>
        <br />
        <button onClick={ buttonReset }>Reset</button>
    </div>
}