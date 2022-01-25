import styles from './About.module.scss'
import React from 'react'
import AnyImage from '../../Handlers/ImageHandler'
import Container from '../../Handlers/ContentHandlers/Container'
import IconHeading from '../../IconHeading'
import classNames from 'classnames'
import BlockContent from '../../Handlers/BlockContentHandler'
import { string, array } from 'prop-types'

const AboutSection = ({ className, title, description, id }) => {
  return (
    <div id={id} className={classNames(styles.AboutSection, className)}>
      <Container center gutter size='small'>
        <IconHeading
          icon='./Icons/Vector-10.svg'
          text={title && title}
          className={styles.SectionName}
        />
        {description && <BlockContent className={styles.Description} blocks={description} />}
        <div className={styles.Button}>
          <p>Join Now</p>
          <AnyImage src={'./Icons/Vector-8.svg'} className={styles.Image} />
        </div>
      </Container>
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
