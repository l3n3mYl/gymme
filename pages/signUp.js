import Router from 'next/router'
import styles from '../styles/SignUp.module.scss'
import React, { useState, useContext } from 'react'
import { AuthContext } from '../contexts/JWTVerification'
import Container from '../components/Handlers/ContentHandlers/Container'

const SignUp = () => {
  const emptyForm = {
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    phone: ''
  }

  const [formValues, setFormValues] = useState(emptyForm)
  const [formErrors, setFormErrors] = useState({})
  const [registerErrors, setRegisterErrors] = useState('')

  const { setAuthState } = useContext(AuthContext)

  function validateForm(e, values) {
    e.preventDefault()
    setRegisterErrors('')

    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i

    if (!values.name) errors.name = 'Please enter your name'
    if (!values.phone) errors.phone = 'Phone is required'
    if (!values.password) errors.password = 'Password is required'
    if (!values.repeatPassword)
      errors.repeatPassword = 'This field must not be empty'
    if (values.password !== values.repeatPassword)
      errors.password = 'Passwords must match'

    if (!values.email) errors.email = 'Email is required'
    else if (!regex.test(values.email))
      errors.email = 'Sorry we do not accept this form of email just yet'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
    } else {
      register()
    }
  }

  async function register() {
    setFormErrors({})

    await fetch(`${process.env.NEXT_PUBLIC_SERVER}/users`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formValues)
    })
      .then((response) => {
        if (response.status === 400)
          setRegisterErrors('Something Went Wrong :(')
        else if (response.status === 401)
          setRegisterErrors('This user already exists')
        else {
          fetch(`${process.env.NEXT_PUBLIC_SERVER}/users/login`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formValues.email,
              password: formValues.password
            })
          }).then((res) => {
            if (res.status === 400) setLoginErrors('Incorrect login details')
            else if (res.status === 401)
              setLoginErrors('This User does not exist')
            else {
              if (res.ok) {
                res.json().then((json) => {
                  setAuthState({ token: json.token, user: json.user })
                  Router.push('/')
                })
              }
            }
          })
        }
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
          value={formValues.repeatPassword}
          type="password"
          name="repeatPassword"
          id="repeatPassword"
          placeholder="Repeat Password"
        />
        <label htmlFor="password">Repeat Password</label>
        <p className={styles.error}>
          {formErrors.repeatPassword && formErrors.repeatPassword}
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
}

SignUp.propTypes = {}

export default SignUp
