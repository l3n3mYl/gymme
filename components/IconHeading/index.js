import React from 'react'
import Image from '../Handlers/ImageHandler'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import styles from './IconHeading.module.scss'

const IconHeading = ({ icon, className, text }) => {
  return (
    <div className={classNames(styles.IconHeading, className)}>
      <Image className={styles.image} src={icon} />
      <h2>{text}<span>.</span> </h2>
    </div>
  )
}

IconHeading.propTypes = {

}

export default IconHeading
