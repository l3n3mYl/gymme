import React, { useState } from 'react'
import Container from '../components/Handlers/ContentHandlers/Container'
import styles from '../styles/Login.module.scss'

const Login = () => {
  const emptyForm = {
    email: '',
    password: ''
  }

  const [formValues, setFormValues] = useState(emptyForm)
  const [formErrors, setFormErrors] = useState({})

  function validateForm(e, values) {
    const errors = {}

    if (!values.password) errors.password = 'Password is required'

    if (!values.email) errors.email = 'Email is required'

    if (Object.keys(errors).length > 0) {
      e.preventDefault()
      setFormErrors(errors)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <Container center gutter size="small">
      <form
        action={`${process.env.NEXT_PUBLIC_SERVER}/api/login`}
        method="POST"
        // onSubmit={(e)=>handle(e)}
        onSubmit={(e) => validateForm(e, formValues)}
        // action="/api/login"
        // method="post"
      >
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

        <input type="submit" name="submit" id="submit" placeholder="Submit" />
      </form>
    </Container>
  )
}

Login.propTypes = {}

export default Login
