import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../ImageHandler'

import styles from './CompanyIcon.module.scss'

const CompanyIcon = (props) => {
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
