import React, { useState, useEffect, useContext } from 'react'
import Container from '../components/Handlers/ContentHandlers/Container'
import { useRouter } from 'next/router'
import { AuthContext } from '../contexts/JWTVerification'
import Image from '../components/Handlers/ImageHandler'
import styles from '../styles/Login.module.scss'

const Login = () => {
  const emptyForm = {
    email: '',
    password: ''
  }

  const [formValues, setFormValues] = useState(emptyForm)
  const [formErrors, setFormErrors] = useState({})
  const router = useRouter()
  const [loginError, setLoginError] = useState('')

  const { setAuthState } = useContext(AuthContext)

  useEffect(() => {
    if (router.query.error && !loginError) {
      setLoginError(router.query.error)
    }
  })

  function validateForm(e, values) {
    e.preventDefault()
    setLoginError('')

    const errors = {}

    if (!values.password) errors.password = 'Password is required'

    if (!values.email) errors.email = 'Email is required'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
    } else {
      logIn()
    }
  }

  async function logIn() {
    setFormErrors({})
    await fetch(`${process.env.NEXT_PUBLIC_SERVER}/users/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
      .then((e) => {
        console.log(e)
        if (e.status === 401) setLoginError('Incorrect login details')
        else if (e.status === 400) setLoginError('This User does not exist')
        else {
          if (e.ok) {
            e.json().then((json) => {
              console.log(json.user)
              setAuthState({ token: json.token, user: json.user })
              window.sessionStorage.setItem('token', json.token)
              router.push('/')
            })
          }
        }
      })
      .catch((err) => console.log('ERR 💥:', err))
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <Container className={styles.Container} center gutter size="small">
      <h1>Login</h1>
      <form
        className={styles.Form}
        onSubmit={(e) => validateForm(e, formValues)}
      >
        <div className={styles.Field}>
          <label htmlFor="email">Email</label>
          <div className={styles.InputWithIcon}>
            <Image
              className={styles.Image}
              src="./FormIcons/email.svg"
              alt="Email Icon"
            />
            <input
              onChange={handleChange}
              value={formValues.email}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
          </div>
          <p className={styles.error}>{formErrors.email && formErrors.email}</p>
        </div>

        <div className={styles.Field}>
          <label htmlFor="password">Password</label>
          <div className={styles.InputWithIcon}>
            <Image
              className={styles.Image}
              src="./FormIcons/lock.svg"
              alt="Password Icon"
            />
            <input
              onChange={handleChange}
              value={formValues.password}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <p className={styles.error}>
            {formErrors.password && formErrors.password}
          </p>
        </div>

        <p className={styles.error}>{loginError && loginError}</p>

        <input
          type="submit"
          name="submit"
          id={styles.Submit}
          placeholder="Login"
        />
      </form>
    </Container>
  )
}

Login.propTypes = {}

export default Login
