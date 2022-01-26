import React from 'react';
import Image from '../../ImageHandler'

import styles from './CompanyIcon.module.scss'

const CompanyIcon = () => {
  return <div className={styles.CompanyIcon}>
    <div className={styles.Icon}>
      <Image src='./Icons/Path.svg' />
      <Image src='./Icons/Path.svg' />
    </div>
    <div className={styles.Name}>gym<span>me</span></div>
  </div>;
};

CompanyIcon.propTypes = {};

export default CompanyIcon;
