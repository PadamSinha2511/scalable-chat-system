'use client'
import { useState } from "react"
import classes from "./page.module.css"
import { useSocket } from "./Context/SocketProvider"


export default function page(){

  const[message,setMessage] = useState('')
  const {sendMessage,messages} = useSocket()
  return(
    <div>


    <div>
        <h1>All messages here</h1>
    </div>
    <div>
      <input onChange={e=>setMessage(e.target.value)} className={classes['chat-box']} placeholder="Messages..."/>
      <button onClick={e=>sendMessage(message)}  className={classes['button']}>Send</button>
      {messages.map((e)=>(
        <li>{e}</li>
      ))}
    </div>
    </div>
  )
}