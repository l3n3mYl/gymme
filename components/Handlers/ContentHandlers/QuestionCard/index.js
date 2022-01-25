import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BlockContent from '../../BlockContentHandler'
import Image from '../../ImageHandler'

import styles from './QuestionCard.module.scss'

const QuestionCard = ({ question, index, answer, className }) => {
  return <div className={classNames(styles.QuestionCard, className)} >
    <label htmlFor={index} className={styles.Question}>
      <h2>{question}</h2>
      <div className={styles.Image} />
    </label>
    <input type="checkbox" name="checkbox" id={index} />
    <BlockContent className={styles.Answer} blocks={answer} />
  </div>;
};

QuestionCard.propTypes = {};

export default QuestionCard;
