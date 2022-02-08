import Router from 'next/router'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { FetchJSON } from '../../functions/fetch'
import Container from '../../components/Handlers/ContentHandlers/Container'

import styles from './styles/Add.module.scss'

const Add = () => {
  const router = useRouter()
  const emptyForm = {
    cardNumber: '',
    expDate: '',
    cvv: '',
    name: '',
    country: '',
    state: '',
    address1: '',
    address2: '',
    city: '',
    postCode: '',
    email: '',
    phone: '',
    plan: ''
  }

  useState(() => {
    if (typeof window !== 'undefined') {
      const token = window.sessionStorage.getItem('token')
      const routerPlan = router.query.plan
      if (!token || !routerPlan) Router.push('/')
    }
  })

  const [formValues, setFormValues] = useState(emptyForm)
  const [formErrors, setFormErrors] = useState({})
  const [registerErrors, setRegisterErrors] = useState('')

  function validateForm(e, values) {
    e.preventDefault()
    const numbers = /^[0-9]*$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    const errors = {}
    let newDate = new Date()
    let date = newDate.getDate()
    let month = newDate.getMonth() + 2
    let year = newDate.getFullYear()
    const separator = '/'

    const plan = {
      name: router.query.plan,
      expiration: `${year}${separator}${
        month < 10 ? `0${month}` : `${month}`
      }${separator}${date}`
    }

    setFormValues({ ...formValues, plan: plan })

    if (!numbers.test(values.cardNumber))
      errors.cardNumber = 'Only numbers are accepted'
    if (!numbers.test(values.cvv)) errors.cvv = 'Only numbers are accepted'
    if (!numbers.test(values.phone)) errors.phone = 'Only numbers are accepted'
    if (!emailRegex.test(values.email)) errors.email = 'Incorrect email address'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
    } else {
      addPlan()
    }
  }

  function addPlan() {
    setFormErrors({})
    if (typeof window !== 'undefined') {
      FetchJSON(
        `${process.env.NEXT_PUBLIC_SERVER}/users/changePlan`,
        window.sessionStorage,
        'post',
        { plan: formValues.plan }
      ).then((rez) => {
        if (rez.status === 401)
          setRegisterErrors('Something went wrong when validating your details')
        else {
          Router.push('/')
        }
      })
    }
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  return (
    <Container size="small" gutter center>
      <form onSubmit={(e) => validateForm(e, formValues)}>
        <input
          onChange={handleChange}
          value={formValues.cardNumber}
          type="text"
          name="cardNumber"
          id="cardNumber"
          placeholder="Card Number"
        />
        <label htmlFor="cardNumber">Card Number</label>
        <p className={styles.error}>
          {formErrors.cardNumber && formErrors.cardNumber}
        </p>

        <input
          onChange={handleChange}
          value={formValues.expDate}
          type="date"
          name="expDate"
          id="expDate"
          placeholder="Expiry Date"
        />
        <label htmlFor="expDate">Expiry date</label>
        <br />

        <input
          onChange={handleChange}
          value={formValues.cvv}
          type="text"
          name="cvv"
          id="cvv"
          placeholder="CVV"
        />
        <label htmlFor="cvv">CVV</label>
        <br />

        <input
          onChange={handleChange}
          value={formValues.name}
          type="text"
          name="name"
          id="name"
          placeholder="Name on Card"
        />
        <label htmlFor="name">Name on Card</label>
        <br />

        <input
          onChange={handleChange}
          value={formValues.country}
          type="text"
          name="country"
          id="country"
          placeholder="Country"
        />
        <label htmlFor="country">Country</label>
        <br />

        <input
          onChange={handleChange}
          value={formValues.state}
          type="text"
          name="state"
          id="state"
          placeholder="State"
        />
        <label htmlFor="state">State</label>
        <br />

        <input
          onChange={handleChange}
          value={formValues.address1}
          type="text"
          name="address1"
          id="address1"
          placeholder="Address 1"
        />
        <label htmlFor="address1">Address 1</label>
        <br />

        <input
          onChange={handleChange}
          value={formValues.address2}
          type="text"
          name="address2"
          id="address2"
          placeholder="Address 2"
        />
        <label htmlFor="address2">Address 2</label>
        <br />

        <input
          onChange={handleChange}
          value={formValues.city}
          type="text"
          name="city"
          id="city"
          placeholder="City"
        />
        <label htmlFor="city">City</label>
        <br />

        <input
          onChange={handleChange}
          value={formValues.postCode}
          type="text"
          name="postCode"
          id="postCode"
          placeholder="Post Code"
        />
        <label htmlFor="postCode">Post Code</label>
        <br />

        <input
          onChange={handleChange}
          value={formValues.phone}
          type="text"
          name="phone"
          id="phone"
          placeholder="Phone Number"
        />
        <label htmlFor="phone">Phone Number</label>
        <br />

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

        <p className={styles.error}>{registerErrors && registerErrors}</p>

        <input type="submit" name="submit" id="submit" placeholder="Submit" />
      </form>
    </Container>
  )
}

Add.propTypes = {}

export default Add
