import React, { useState } from 'react'

export const AuthContext = React.createContext()

const Auth = ({ children }) => {
  const [user, setUser] = useState(false)

  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default Auth
