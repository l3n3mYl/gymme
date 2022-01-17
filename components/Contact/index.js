import React from 'react'
import classNames from 'classnames'
import { string, object } from 'prop-types'
import styles from './Contact.module.scss'
import Link from 'next/link'
import Parallax from '../Animations/Parallax'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons'

const Contact = ({ id, refer, mainImage, facebook, instagram, subtitle, phone, className}) => {
  return (
    <div id={id} ref={refer} className={classNames(styles.Contact, className)}>
      <Parallax
        image={mainImage}
        blur={3}
        opacity={1}
      >
        <div className={styles.content}/>
        <h2>Contact Us</h2>
        <p className={styles.subtitle}>{subtitle}</p>
        <p className={styles.phone}><FontAwesomeIcon icon={faPhone} /> {phone}</p>
        <p className={styles.facebook}><FontAwesomeIcon icon={faFacebook} /><Link href={facebook}><a>Facebook</a></Link></p>
        <p className={styles.instagram}><FontAwesomeIcon icon={faInstagram} /><Link href={instagram}><a>Instagram</a></Link></p>
      </Parallax>
    </div>
  )
}

Contact.propTypes = {
  refer: object.isRequired,
  id: string.isRequired,
  facebook: string,
  instagram: string,
  className: string
}

export default Contact
