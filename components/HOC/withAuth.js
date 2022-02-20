import React, { useState, useEffect, useContext } from 'react'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'

import { AuthContext } from '../../contexts/JWTVerification'
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay.js'

const verifyToken = (token) => {
  if (token && typeof token === 'string') {
    return jwtDecode(token).exp >= Date.now() / 1000
  }

  return false
}

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const { authState, logout } = useContext(AuthContext)

    useEffect(() => {
      function verify() {
        if (router.isReady && typeof window !== 'undefined') {
          const isTokenValid = verifyToken(
            window.sessionStorage.getItem('token')
          )
          if (!isTokenValid) {
            if (authState.user !== '') logout(window.sessionStorage)
            router.push(
              {
                pathname: '/login',
                query: { error: 'Please log in again' }
              },
              '/login'
            )
          }
          setLoading(false)
          return
        } else if (isTokenValid) {
          setLoading(false)
          return
        }
      }
      verify()
      const timer = setInterval(() => {
        verify()
      }, 2000)
      return () => clearInterval(timer)
    }, [authState.token, authState.user, logout, router])

    if (loading) return <LoadingOverlay isLoading />
    else return <WrappedComponent {...props} />
  }
}

export default withAuth
