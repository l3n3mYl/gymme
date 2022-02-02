import React, { useState } from 'react'
import Container from '../components/Handlers/ContentHandlers/Container'
import Router from 'next/router'
import styles from '../styles/Login.module.scss'

const Login = () => {
  const emptyForm = {
    email: '',
    password: ''
  }

  const [formValues, setFormValues] = useState(emptyForm)
  const [formErrors, setFormErrors] = useState({})
  const [loginErrors, setLoginErrors] = useState('')

  function validateForm(e, values) {
    e.preventDefault()
    setLoginErrors('')

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
    await fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/login`, {
      method: 'post',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
    })
      .then((e) => {
        if (e.status === 400) setLoginErrors('Incorrect login details')
        else if (e.status === 401) setLoginErrors('This User does not exist')
        else Router.push('/')
      })
      .catch((err) => console.log('ERR 💥:', err))
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <Container center gutter size="small">
      <form onSubmit={(e) => validateForm(e, formValues)}>
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

        <p className={styles.error}>{loginErrors && loginErrors}</p>

        <input type="submit" name="submit" id="submit" placeholder="Submit" />
      </form>
    </Container>
  )
}

Login.propTypes = {}

export default Login
