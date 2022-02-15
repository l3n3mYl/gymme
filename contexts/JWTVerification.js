import React, { useState, createContext } from 'react'
import { useRouter } from 'next/router'

export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: '',
    token: ''
  })
  const router = useRouter()

  const logout = (storage) => {
    setAuthState({
      user: '',
      token: ''
    })
    storage.clear()
    router.push('/')
  }

  const verifyJWT = async (token) => {
    try {
      return await fetch(`${process.env.NEXT_PUBLIC_SERVER}/users/verifyJWT`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: token
        })
      }).then((response) => {
        if (response.status === 400) {
          setAuthState((prevState) => ({
            ...prevState,
            user: 'Token Expired'
          }))
        } else if (response.ok && response.status === 200) {
          response.json().then((json) => {
            setAuthState((prevState) => ({
              ...prevState,
              user: json.user
            }))
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
        logout,
        authState,
        setAuthState
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
