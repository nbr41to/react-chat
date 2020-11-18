import React from 'react'
import LinkButton from "./LinkButton"
import firebase from "./firebase"

const LoginPage = () => {
  console.log(firebase.auth())

  return (
    <div>
      <h1>LOGIN</h1>
      <LinkButton path="/signup">
        sign up!!
      </LinkButton>
    </div>
  )
}

export default LoginPage
