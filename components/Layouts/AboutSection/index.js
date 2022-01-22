import styles from './About.module.scss'
import React from 'react'
import AnyImage from '../../Handlers/ImageHandler'
import IconHeading from '../../IconHeading'
import classNames from 'classnames'
import BlockContent from '../../Handlers/BlockContentHandler'
import { string, object, array } from 'prop-types'

const AboutSection = ({ className, title, description, id }) => {
  return (
    <div id={id} className={classNames(styles.AboutSection, className)}>
      <IconHeading
        icon='./Icons/PPL.png'
        text={title}
        className={styles.SectionName}
      />
      {description && <BlockContent className={styles.Description} blocks={description} />}
      <div className={styles.Button}>
        <p>Join Now</p>
        <AnyImage src={'./Icons/ArrowRight.png'} className={styles.Image} />
      </div>
    </div>
  )
}

AboutSection.propTypes = {
  id: string.isRequired,
  title: string.isRequired,
  description: array,
  className: string,
}

export default AboutSection
