import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Container from '../../components/Handlers/ContentHandlers/Container'
import { FetchJSON } from '../../functions/fetch'

import styles from '../../styles/UserInfo.module.scss'

const UserInfo = () => {
  const [user, setUser] = useState({})

  const router = useRouter()

  useState(() => {
    if (typeof window !== 'undefined') {
      FetchJSON(
        `${process.env.NEXT_PUBLIC_SERVER}/users/getInfo`,
        window.sessionStorage,
        'get'
      ).then((rez) => {
        if (rez.ok) {
          rez.json().then((json) => {
            setUser(json.user[0])
          })
        }
      })
    }
  })

  return user ? (
    <Container>
      <div>
        <div className={styles.UserInfoCard}>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
        <div className={styles.UserPlan}>{user.plan && user.plan}</div>
        <button
          onClick={() => {
            router.push(
              {
                pathname: '/user/changeUserInfo',
                query: user
              },
              '/user/changeUserInfo'
            )
          }}
        >
          Change My Info
        </button>
      </div>
    </Container>
  ) : (
    <h1 className="">Something Went Wrong</h1>
  )
}

UserInfo.propTypes = {}

export default UserInfo
