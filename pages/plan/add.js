import Router from 'next/router'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { FetchJSON } from '../../functions/fetch'
import Image from '../../components/Handlers/ImageHandler'
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
  let newDate = new Date()
  let date = newDate.getDate()
  let month = newDate.getMonth() + 2
  let year = newDate.getFullYear()
  const separator = '/'

  const [formValues, setFormValues] = useState(emptyForm)
  const [formErrors, setFormErrors] = useState({})
  const [registerErrors, setRegisterErrors] = useState('')

  useState(() => {
    if (typeof window !== 'undefined') {
      const plan = {
        name: router.query.plan,
        expiration: `${year}${separator}${
          month < 10 ? `0${month}` : `${month}`
        }${separator}${date}`
      }
      const token = window.sessionStorage.getItem('token')
      const routerPlan = router.query.plan
      setFormValues({ ...formValues, plan: plan })
      if (!token || !routerPlan) Router.push('/')
    }
  }, [])

  function validateForm(e, values) {
    e.preventDefault()
    const numbers = /^[0-9]*$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
    const errors = {}

    if (!numbers.test(values.cardNumber))
      errors.cardNumber = 'Only numbers are accepted'
    if (!numbers.test(values.cvv)) errors.cvv = 'Only numbers are accepted'
    if (!numbers.test(values.phone)) errors.phone = 'Only numbers are accepted'
    if (!emailRegex.test(values.email)) errors.email = 'Incorrect email address'

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
    } else if (formValues.plan !== '') {
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
        formValues
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
    <Container className={styles.Container} size="small" gutter center>
      <h1>
        Subscribe to
        <br />
        {router.query.plan}
      </h1>
      <form onSubmit={(e) => validateForm(e, formValues)}>
        <div className={styles.Field}>
          <label htmlFor="cardNumber">Card Number</label>
          <div className={styles.InputWithIcon}>
            <Image
              className={styles.Image}
              image="/FormIcons/credit-card.svg"
              width={26}
              height={26}
              alt="Credit Card Icon"
            />
            <input
              onChange={handleChange}
              value={formValues.cardNumber}
              type="text"
              name="cardNumber"
              id="cardNumber"
              placeholder="Card Number"
            />
          </div>
          <p className={styles.error}>
            {formErrors.cardNumber && formErrors.cardNumber}
          </p>
        </div>

        <div className={styles.Field}>
          <label htmlFor="expDate">Expiry date</label>
          <div className={styles.InputWithIcon}>
            <Image
              className={styles.Image}
              image="/FormIcons/calendar.svg"
              width={26}
              height={26}
              alt="Calendar Icon"
            />
            <input
              onChange={handleChange}
              value={formValues.expDate}
              type="date"
              name="expDate"
              id="expDate"
              placeholder="Expiry Date"
            />
          </div>
        </div>
        <br />

        <div className={styles.Field}>
          <label htmlFor="cvv">CVV</label>
          <div className={styles.InputWithIcon}>
            <Image
              className={styles.Image}
              image="/FormIcons/cvv.svg"
              width={26}
              height={26}
              alt="CVV Icon"
            />
            <input
              onChange={handleChange}
              value={formValues.cvv}
              type="text"
              name="cvv"
              id="cvv"
              placeholder="CVV"
            />
          </div>
        </div>
        <br />

        <div className={styles.Field}>
          <label htmlFor="name">Name on Card</label>
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
              placeholder="Name on Card"
            />
          </div>
        </div>
        <br />

        <div className={styles.Field}>
          <label htmlFor="country">Country</label>
          <div className={styles.InputWithIcon}>
            <Image
              className={styles.Image}
              image="/FormIcons/countries.svg"
              width={26}
              height={26}
              alt="Country Icon"
            />
            <input
              onChange={handleChange}
              value={formValues.country}
              type="text"
              name="country"
              id="country"
              placeholder="Country"
            />
          </div>
        </div>
        <br />

        <div className={styles.Field}>
          <label htmlFor="state">State</label>
          <div className={styles.InputWithIcon}>
            <Image
              className={styles.Image}
              image="/FormIcons/state.svg"
              width={26}
              height={26}
              alt="State Icon"
            />
            <input
              onChange={handleChange}
              value={formValues.state}
              type="text"
              name="state"
              id="state"
              placeholder="State"
            />
          </div>
        </div>
        <br />

        <div className={styles.Field}>
          <label htmlFor="address1">Address 1</label>
          <div className={styles.InputWithIcon}>
            <Image
              className={styles.Image}
              image="/FormIcons/pin.svg"
              width={26}
              height={26}
              alt="Address Icon"
            />
            <input
              onChange={handleChange}
              value={formValues.address1}
              type="text"
              name="address1"
              id="address1"
              placeholder="Address 1"
            />
          </div>
        </div>
        <br />

        <div className={styles.Field}>
          <label htmlFor="address2">Address 2</label>
          <div className={styles.InputWithIcon}>
            <Image
              className={styles.Image}
              image="/FormIcons/address.svg"
              width={26}
              height={26}
              alt="Address Icon"
            />
            <input
              onChange={handleChange}
              value={formValues.address2}
              type="text"
              name="address2"
              id="address2"
              placeholder="Address 2"
            />
          </div>
        </div>
        <br />

        <div className={styles.Field}>
          <label htmlFor="city">City</label>
          <div className={styles.InputWithIcon}>
            <Image
              className={styles.Image}
              image="/FormIcons/city.svg"
              width={26}
              height={26}
              alt="City Icon"
            />
            <input
              onChange={handleChange}
              value={formValues.city}
              type="text"
              name="city"
              id="city"
              placeholder="City"
            />
          </div>
        </div>
        <br />

        <div className={styles.Field}>
          <label htmlFor="postCode">Post Code</label>
          <div className={styles.InputWithIcon}>
            <Image
              className={styles.Image}
              image="/FormIcons/zip-code.svg"
              width={26}
              height={26}
              alt="Post Code Icon"
            />
            <input
              onChange={handleChange}
              value={formValues.postCode}
              type="text"
              name="postCode"
              id="postCode"
              placeholder="Post Code"
            />
          </div>
        </div>
        <br />

        <div className={styles.Field}>
          <label htmlFor="phone">Phone Number</label>
          <div className={styles.InputWithIcon}>
            <Image
              className={styles.Image}
              image="/FormIcons/phone.svg"
              width={26}
              height={26}
              alt="Phone Icon"
            />
            <input
              onChange={handleChange}
              value={formValues.phone}
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone Number"
            />
          </div>
        </div>
        <br />

        <div className={styles.Field}>
          <label htmlFor="email">Email</label>
          <div className={styles.InputWithIcon}>
            <Image
              className={styles.Image}
              image="/FormIcons/email.svg"
              width={26}
              height={26}
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
}

Add.propTypes = {}

export default Add
