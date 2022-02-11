import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../contexts/JWTVerification'
import { useRouter } from 'next/router'
import { FetchJSON } from '../../functions/fetch'
import Container from '../../components/Handlers/ContentHandlers/Container'

import styles from './styles/ChangeUserInfo.module.scss'

const ChangeUserInfo = () => {
  const router = useRouter()
  const [user, setUser] = useState({})
  const [formValues, setFormValues] = useState({})
  const [formErrors, setFormErrors] = useState({})
  const [registerErrors, setRegisterErrors] = useState('')
  const { verifyJWT, authState } = useContext(AuthContext)

  function handleChange(e) {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  useEffect(() => {
    verifyJWT(window.sessionStorage.getItem('token'))
    if (authState.user === 'Token Expired') {
      router.push(
        {
          pathname: '/login',
          query: { error: 'Please log in again' }
        },
        '/login'
      )
    } else setUser(authState.user)
  }, [])

  function validateForm(e, values) {
    e.preventDefault()
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

    if (!regex.test(values.email) && values.email)
      errors.email = 'Sorry we do not accept this form of email just yet'

    if (Object.keys(errors).length > 0) setFormErrors(errors)
    else changeDetails()
  }

  async function changeDetails() {
    if (typeof window !== 'undefined') {
      FetchJSON(
        `${process.env.NEXT_PUBLIC_SERVER}/users/changeInfo`,
        window.sessionStorage,
        'post',
        formValues
      ).then((rez) => {
        if (rez.status === 401) setRegisterErrors('Email already in use')
        else {
          router.push('/')
        }
      })
    }
  }

  return (
    user && (
      <Container center gutter size="small">
        <form
          className={styles.Form}
          onSubmit={(e) => validateForm(e, formValues)}
        >
          <input
            onChange={handleChange}
            value={formValues.name}
            type="text"
            name="name"
            id="name"
            placeholder="Name"
          />
          <label htmlFor="name">Name</label>
          <p className={styles.error}>{formErrors.name && formErrors.name}</p>

          <input
            onChange={handleChange}
            value={formValues.email}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
          <label htmlFor="email">Email</label>
          <p className={styles.error}>{formErrors.email && formErrors.email}</p>

          <input
            onChange={handleChange}
            value={formValues.password}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <label htmlFor="password">Password</label>
          <p className={styles.error}>
            {formErrors.password && formErrors.password}
          </p>

          <input
            onChange={handleChange}
            value={formValues.phone}
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone"
          />
          <label htmlFor="phone">Phone</label>
          <p className={styles.error}>{formErrors.phone && formErrors.phone}</p>

          <p className={styles.error}>{registerErrors && registerErrors}</p>

          <input type="submit" name="submit" id="submit" placeholder="Submit" />
        </form>
      </Container>
    )
  )
}

ChangeUserInfo.propTypes = {}

export default ChangeUserInfo
