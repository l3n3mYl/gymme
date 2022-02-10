import Link from 'next/link'
import { useRouter } from 'next/router'
import { AuthContext } from '../../contexts/JWTVerification'
import React, { useState, useEffect, useContext } from 'react'
import { FetchJSON } from '../../functions/fetch'
import Container from '../../components/Handlers/ContentHandlers/Container'

import styles from '../../styles/UserInfo.module.scss'

const UserInfo = () => {
  const [user, setUser] = useState({})
  const [userLogged, setUserLogged] = useState(false)
  const router = useRouter()
  const { verifyJWT, authState, setAuthState } = useContext(AuthContext)

  async function getUserInfo() {
    await FetchJSON(
      `${process.env.NEXT_PUBLIC_SERVER}/users/getInfo`,
      window.sessionStorage,
      'get'
    ).then((e) => {
      if (e.ok)
        e.json().then((json) => {
          if (json.message !== 'Something Went Wrong') {
            setUser(json.user)
            setUserLogged(true)
          }
        })
    })
  }

  function logOut() {
    setAuthState({
      user: '',
      token: ''
    })
    window.sessionStorage.clear()
    router.push('/')
  }

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      verifyJWT(window.sessionStorage.getItem('token'))
      if (authState.user !== 'Token Expired') getUserInfo()
      else {
        router.push(
          {
            pathname: '/login',
            query: { error: 'Please log in again' }
          },
          '/login'
        )
      }
    }
  }, [authState, router, user, verifyJWT])

  return userLogged ? (
    <Container gutter center size="small">
      <div>
        <div className={styles.UserInfoCard}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
        <div className={styles.UserPlan}>
          <p>{user.plan.name}</p>
          <p>{user.plan.expiration}</p>
        </div>
        <button>
          <Link href="/user/changeUserInfo">Change My Info</Link>
        </button>
        <button onClick={() => logOut()}>Log Out</button>
      </div>
    </Container>
  ) : (
    <h1 className="">Something Went Wrong</h1>
  )
}

UserInfo.propTypes = {}

export default UserInfo
