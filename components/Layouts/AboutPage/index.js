import styles from './About.module.scss'
import React from 'react'
import AnyImage from '../../Handlers/ImageHandler'
import IconHeading from '../../IconHeading'
import classNames from 'classnames'
import BlockContent from '../../Handlers/BlockContentHandler'
import { string, object, array } from 'prop-types'

const AboutPage = ({ className, title, description, refer, id }) => {
  return (
    <div ref={refer} id={id} className={classNames(styles.AboutPage, className)}>
      <IconHeading
        icon='./Icons/PPL.png'
        text={title}
        className={styles.sectionName}
      />
      {description && <BlockContent className={styles.description} blocks={description} />}
      <div className={styles.button}>
        <p>Join Now</p>
        <AnyImage src={'./Icons/ArrowRight.png'} className={styles.image} />
      </div>
    </div>
  )
}

AboutPage.propTypes = {
  refer: object.isRequired,
  id: string.isRequired,
  title: string.isRequired,
  description: array,
  className: string,
}

export default AboutPage
