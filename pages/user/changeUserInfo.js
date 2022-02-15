import { useRouter } from 'next/router'
import { FetchJSON } from '../../functions/fetch'
import withAuth from '../../components/HOC/withAuth'
import Image from '../../components/Handlers/ImageHandler'
import React, { useState, useEffect } from 'react'
import Container from '../../components/Handlers/ContentHandlers/Container'

import styles from './styles/ChangeUserInfo.module.scss'

const ChangeUserInfo = () => {
  const router = useRouter()
  const [user, setUser] = useState({})
  const [formValues, setFormValues] = useState({})
  const [formErrors, setFormErrors] = useState({})
  const [registerErrors, setRegisterErrors] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUser(JSON.parse(window.sessionStorage.getItem('user')))
    }
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
      <Container className={styles.Container} center gutter size="small">
        <form
          className={styles.Form}
          onSubmit={(e) => validateForm(e, formValues)}
        >
          <h1>Enter New Details</h1>
          <div className={styles.Field}>
            <label htmlFor="name">Name</label>
            <div className={styles.InputWithIcon}>
              <Image
                className={styles.Image}
                image="/FormIcons/login.svg"
                width={26}
                height={26}
                alt="Name Icon"
              />
              <input
                onChange={handleChange}
                value={formValues.name}
                type="text"
                name="name"
                id="name"
                placeholder="Name"
              />
            </div>
            <p className={styles.error}>{formErrors.name && formErrors.name}</p>
          </div>

          <div className={styles.Field}>
            <label htmlFor="email">Email</label>
            <div className={styles.InputWithIcon}>
              <Image
                className={styles.Image}
                image="/FormIcons/email.svg"
                width={26}
                height={26}
                alt="Name Icon"
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
            <p className={styles.error}>
              {formErrors.email && formErrors.email}
            </p>
          </div>

          <div className={styles.Field}>
            <label htmlFor="password">Password</label>
            <div className={styles.InputWithIcon}>
              <Image
                width={26}
                height={26}
                image="/FormIcons/lock.svg"
                alt="Name Icon"
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

          <div className={styles.Field}>
            <label htmlFor="phone">Phone</label>
            <div className={styles.InputWithIcon}>
              <Image
                width={26}
                height={26}
                image="/FormIcons/phone.svg"
                alt="Name Icon"
              />
              <input
                onChange={handleChange}
                value={formValues.phone}
                type="text"
                name="phone"
                id="phone"
                placeholder="Phone"
              />
            </div>
            <p className={styles.error}>
              {formErrors.phone && formErrors.phone}
            </p>
          </div>
          <p className={styles.error}>{registerErrors && registerErrors}</p>

          <input
            type="submit"
            name="submit"
            id={styles.Submit}
            placeholder="Submit"
          />
        </form>
      </Container>
    )
  )
}

ChangeUserInfo.propTypes = {}

export default withAuth(ChangeUserInfo)
