import Link from 'next/link'
import { useRouter } from 'next/router'
import { AuthContext } from '../../contexts/JWTVerification'
import React, { useState, useEffect, useContext } from 'react'
import { FetchJSON } from '../../functions/fetch'
import Container from '../../components/Handlers/ContentHandlers/Container'

import styles from './styles/UserInfo.module.scss'

const UserInfo = () => {
  const router = useRouter()
  const [user, setUser] = useState({})
  const [userLogged, setUserLogged] = useState(false)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
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
    <Container className={styles.UserInfo} gutter center size="small">
      <h1>Your Details</h1>
      <div className={styles.Content}>
        <div className={styles.UserInfoCard}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phone}</p>
        </div>
        <div className={styles.UserPlan}>
          <p>Plan Name: {user.plan.name}</p>
          <p>
            Expiration Date:{' '}
            {new Date(user.plan.expiration).toLocaleDateString([], options)}
          </p>
        </div>
        <button>
          <Link passHref={true} href="/user/changeUserInfo">
            <p>Change My Info</p>
          </Link>
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
