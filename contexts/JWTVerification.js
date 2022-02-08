import React, { useState, createContext } from 'react'

export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: '',
    token: ''
  })

  const verifyJWT = async (storage) => {
    try {
      return await fetch(`${process.env.NEXT_PUBLIC_SERVER}/users/verifyJWT`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: storage.getItem('token')
        })
      }).then((response) => {
        if (response.status === 201) {
          setAuthState({ user: 'Token Expired' })
        } else if (response.ok && response.status === 200) {
          response.json().then((json) => {
            setAuthState({ user: json.user })
          })
        }
      })
    } catch (error) {
      console.log('Error :' + error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        verifyJWT,
        authState,
        setAuthState
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
