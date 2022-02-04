import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Container from '../../components/Handlers/ContentHandlers/Container'

import styles from '../../styles/ChangeUserInfo.module.scss'

const ChangeUserInfo = () => {
  const [userInfo, setUserInfo] = useState({})
  const [formValues, setFormValues] = useState({})
  const [formErrors, setFormErrors] = useState({})
  const [registerErrors, setRegisterErrors] = useState('')
  const router = useRouter()

  function handleChange() {}
  function validateForm(e, formValues) {}

  console.log(router.query)

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

ChangeUserInfo.propTypes = {}

export default ChangeUserInfo
