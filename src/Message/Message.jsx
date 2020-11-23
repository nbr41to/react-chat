import React, { useState } from 'react'
import { StyledComponent } from "./Message.styled"

const Message = ({ message }) => {
  const [color, setColor] = useState(false)
  console.log(color)
  return (
    <StyledComponent color={color}>
      <h3 className={`${color ? "active" : ""}`}>名前: {message ? message.name : "名無しさん"}</h3>
      <p onClick={() => { setColor(!color) }}>{message.content}</p>
      <p>{Date(message.sendAt)}</p>
    </StyledComponent >
  )
}

export default Message
