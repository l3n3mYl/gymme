import Link from 'next/link'
import { AuthContext } from '../../contexts/JWTVerification'
import React, { useState, useEffect, useContext } from 'react'
import Container from '../../components/Handlers/ContentHandlers/Container'

import styles from '../../styles/UserInfo.module.scss'

const UserInfo = () => {
  const [user, setUser] = useState({})
  const { verifyJWT, authState } = useContext(AuthContext)

  useEffect(() => {
    if (!Object.keys(user).length) {
      verifyJWT(window.sessionStorage)
      setUser(authState.user)
    }
  }, [authState])

  return authState.user ? (
    <Container>
      <div>
        <div className={styles.UserInfoCard}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
        <div className={styles.UserPlan}>{user.plan && user.plan}</div>
        <button>
          <Link href="/user/changeUserInfo">Change My Info</Link>
        </button>
      </div>
    </Container>
  ) : (
    <h1 className="">Something Went Wrong</h1>
  )
}

UserInfo.propTypes = {}

export default UserInfo
