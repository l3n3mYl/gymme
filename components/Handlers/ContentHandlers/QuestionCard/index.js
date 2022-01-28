import React, { useState } from 'react'
import { string, array } from 'prop-types'
import classNames from 'classnames'
import BlockContent from '../../BlockContentHandler'

import styles from './QuestionCard.module.scss'

const QuestionCard = ({ question, answer, className }) => {
  const [isToggled, setIsToggled] = useState(false)

  return (
    <div className={classNames(styles.QuestionCard, className)}>
      <button
        onClick={() => setIsToggled(!isToggled)}
        className={styles.Question}
      >
        <h2>{question}</h2>
        <div
          className={classNames(styles.Image, isToggled && styles.imageOpen)}
        />
      </button>
      <BlockContent
        className={classNames(styles.Answer, isToggled && styles.answerOpen)}
        blocks={answer}
      />
    </div>
  )
}

QuestionCard.propTypes = {
  question: string.isRequired,
  answer: array.isRequired,
  className: string
}

export default QuestionCard
