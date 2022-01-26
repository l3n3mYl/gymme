import React, { useState } from 'react';
import { string, number, array } from 'prop-types';
import classNames from 'classnames';
import BlockContent from '../../BlockContentHandler'

import styles from './QuestionCard.module.scss'

const QuestionCard = ({ question, index, answer, className }) => {

  const [cardState, setCardState] = useState(true);

  const toggle = (_ => {
    if(cardState) {
      document.getElementById(`Answer_${index}`).style.display = 'block';
      document.getElementById(`Button_${index}`).style.backgroundImage = "url('./Icons/Vector-2.svg')"
      setCardState(false)
    } else {
      document.getElementById(`Answer_${index}`).style.display = 'none';
      document.getElementById(`Button_${index}`).style.backgroundImage = "url('./Icons/Vector-3.svg')"
      setCardState(true)
    }
  })

  return <div className={classNames(styles.QuestionCard, className)} >
    <button onClick={toggle} className={styles.Question}>
      <h2>{question}</h2>
      <div id={`Button_${index}`} className={styles.Image} />
    </button>
    <BlockContent id={`Answer_${index}`} className={styles.Answer} blocks={answer} />
  </div>;
};

QuestionCard.propTypes = {
  question: string.isRequired,
  index: number.isRequired,
  answer: array.isRequired,
  className: string
};

export default QuestionCard;
