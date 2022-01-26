import React from 'react';
import Image from '../../Handlers/ImageHandler'
import styles from './Footer.module.scss'
import CompanyIcon from '../../Handlers/Elements/CompanyIcon';
import Container from '../../Handlers/ContentHandlers/Container'

const Footer = () => {
  return <div className={styles.Footer}>
    <Container className={styles.Container}>
      <Image className={styles.Image} src='./FooterImg.png' />
      <div className={styles.InviteText}>
        <h2>Wanna Join <span>&</span> have fun?</h2>
        <p>We’ll keep you updated on the things you need to know about Gymme. Nothing more, nothing less.</p>
        <button>Join Now</button>
      </div>
      <div className={styles.BottomText}>
        <CompanyIcon />
        <p>All rights reserved. Gymme 2021.</p>
      </div>
    </Container>
  </div>;
};

Footer.propTypes = {};

export default Footer;
