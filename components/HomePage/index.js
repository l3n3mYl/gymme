import React from 'react'
import classNames from 'classnames'
import { string, object } from 'prop-types'
import styles from './HomePage.module.scss'
import Parallax from '../Animations/Parallax'

const HomePage = ({ image, title, subtitle, refer, id, className }) => {
  return (
    <div ref={refer} id={id} className={classNames(styles.HomePage, className)}>
      <Parallax 
        image={image} 
        strength={250}
        opacity={1}
      >
        <div className={styles.quote}/>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </Parallax>
    </div>
  )
}

HomePage.propTypes = {
  image: object.isRequired,
  title: string.isRequired,
  subtitle: string.isRequired,
  refer: object.isRequired,
  id: string.isRequired,
  className: string
}

export default HomePage
