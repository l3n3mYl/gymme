import React from 'react'
import classNames from 'classnames'
import styles from './Home.module.scss'
import { string, object } from 'prop-types'
import AnyImage from '../../Handlers/ImageHandler'
import Container from '../../Handlers/ContentHandlers/Container'

const HomeSection = ({
  image,
  title,
  subtitle,
  coloredTitle,
  id,
  className
}) => {
  return (
    <Container center size="full">
      <div id={id} className={classNames(styles.HomeSection, className)}>
        <AnyImage src={image} className={styles.Image} />
        <div className={styles.Quote}>
          <h1 className={styles.Title}>
            {title && title}
            <br />
            <span>{coloredTitle && coloredTitle}</span>
          </h1>
          <p className={styles.Subtitle}>{subtitle && subtitle}</p>
          <button className={styles.Button}>
            <a className={styles.Link} href="#Pricing">
              Join Now
            </a>
          </button>
        </div>
      </div>
    </Container>
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
