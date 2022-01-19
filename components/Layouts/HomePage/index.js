import React from 'react'
import classNames from 'classnames'
import { string, object } from 'prop-types'
import styles from './HomePage.module.scss'
import AnyImage from '../../Handlers/ImageHandler'

const HomePage = ({ image, title, subtitle, coloredTitle, refer, id, className }) => {
  return (
    <div ref={refer} id={id} className={classNames(styles.HomePage, className)}>
      <AnyImage src={image} className={styles.image} />
      <div className={styles.quote}>
        <h1 className={styles.title}>{title}<br/><span>{coloredTitle}</span></h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <button className={styles.button}>Join Now</button>
      </div>
    </div>
  )
}

HomePage.propTypes = {
  image: object.isRequired,
  title: string.isRequired,
  subtitle: string.isRequired,
  coloredTitle: string.isRequired,
  refer: object.isRequired,
  id: string.isRequired,
  className: string
}

export default HomePage
