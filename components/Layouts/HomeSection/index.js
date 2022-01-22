import React from 'react'
import classNames from 'classnames'
import { string, object } from 'prop-types'
import styles from './Home.module.scss'
import AnyImage from '../../Handlers/ImageHandler'

const HomeSection = ({ image, title, subtitle, coloredTitle, id, className }) => {
  return (
    <div id={id} className={classNames(styles.HomeSection, className)}>
      <AnyImage src={image} className={styles.image} />
      <div className={styles.quote}>
        <h1 className={styles.title}>{title}<br/><span>{coloredTitle}</span></h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <button className={styles.button}>Join Now</button>
      </div>
    </div>
  )
}

HomeSection.propTypes = {
  image: object.isRequired,
  title: string.isRequired,
  subtitle: string.isRequired,
  coloredTitle: string.isRequired,
  id: string.isRequired,
  className: string
}

export default HomeSection
