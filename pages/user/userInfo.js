import Link from 'next/link'
import { useRouter } from 'next/router'
import withAuth from '../../components/HOC/withAuth'
import { AuthContext } from '../../contexts/JWTVerification'
import React, { useState, useEffect, useContext } from 'react'
import Container from '../../components/Handlers/ContentHandlers/Container'

import styles from './styles/UserInfo.module.scss'

const UserInfo = () => {
  const router = useRouter()
  const [user, setUser] = useState({})
  const { setAuthState } = useContext(AuthContext)
  const [userLogged, setUserLogged] = useState(false)
  const options = { year: 'numeric', month: 'long', day: 'numeric' }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userInfo = JSON.parse(window.sessionStorage.getItem('user'))
      setUser(userInfo)
      userInfo && setUserLogged(true)
    }
  }, [])

  function logOut() {
    setAuthState({
      user: '',
      token: ''
    })
    window.sessionStorage.clear()
    router.push('/')
  }

  return (
    userLogged && (
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
    )
  )
}

export default withAuth(UserInfo)

UserInfo.propTypes = {}
