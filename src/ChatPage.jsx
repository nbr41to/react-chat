import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from "./Auth"
import firebase, { db } from "./firebase"

import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import Message from "./Message"

import styles from "./ChatPage.module.scss"
import styled from "styled-components"


const ChatPage = () => {
  const { setUser } = useContext(AuthContext)
  const [userName, setUserName] = useState("")
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])

  const submit = () => {
    firebase.firestore().collection("messages").add({
      name: userName,
      content: message,
      sendAt: Date.now(),
    }).then(function (docRef) {
      console.log("成功！");
    })
      .catch(function (error) {
        console.error("失敗");
      });
    setMessage("")
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setUserName(user.displayName)
    })
  }, [])

  useEffect(() => {
    firebase.firestore().collection("messages").onSnapshot((docs) => {
      const getMessages = []
      docs.forEach((doc) => {
        console.log(doc.data())
        getMessages.push(doc.data())
      })
      console.log(getMessages)
      getMessages.sort((a, b) => {
        if (a.sendAt < b.sendAt) return 1;
        if (a.sendAt > b.sendAt) return -1;
        return 0;
      });
      setMessages(getMessages)
    })
  }, [])



  const logout = () => {
    firebase.auth().signOut().then(() => {
      setUser(false)
    }).catch((error) => {
      console.log(error)
    });
  }

  // **collectionの例**
  // const messages = {
  //   SRB5ZgjE7dNuVvCxi96p: {
  //     name: "",
  //     content: "",
  //   },
  //   SRB5ZgjE7dNuVvCxi96p: {
  //     name: "",
  //     content: "",
  //   },
  //   SRB5ZgjE7dNuVvCxi96p: {
  //     name: "",
  //     content: "",
  //   },
  // }

  const jsStyle = {
    color: "blue",
    backgroundColor: "",
  }

  const StyledComponent = styled.div`
    p {
      border: 1px solid #444;
      border-radius: 4px;
      padding: 8px 16px;
      margin: 8px;
    }
  `

  return (
    <div>
      <h1 className={styles.title}>Chat Page</h1>
      <p>こんにちは！{userName}さん！</p>
      {messages.map((message, index) => <Message key={index} message={message} />)}
      <TextField
        label="Message"
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        variant="contained"
        onClick={submit}
      >
        send
      </Button>

      <Button
        variant="contained"
        fullWidth
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  )
}

export default ChatPage
