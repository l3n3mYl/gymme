import React from 'react'
import { object } from 'prop-types'

import styles from './WideScreenWrapper.module.scss'

const Wrapper = ({ children }) => {
  return (
    <div className={styles.Wrapper}>
      {children}
    </div>
  )
}

Wrapper.propTypes = {
  children: object.isRequired
}

export default Wrapper
