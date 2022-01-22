import React from 'react'
import Image from '../Handlers/ImageHandler'
import { string } from 'prop-types'
import classNames from 'classnames'

import styles from './IconHeading.module.scss'

const IconHeading = ({ icon, className, imageClass, text }) => {
  return (
    <div className={classNames(styles.IconHeading, className)}>
      <Image className={classNames(styles.Image, imageClass)} src={icon} />
      <h2>{text}<span>.</span></h2>
    </div>
  )
}

IconHeading.propTypes = {
  icon: string.isRequired,
  text: string.isRequired,
  className: string,
  imageClass: string
}

export default IconHeading
