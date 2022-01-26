import React from 'react';
import { array, string } from 'prop-types';
import classNames from 'classnames';
import IconHeading from '../../IconHeading'
import Container from '../../Handlers/ContentHandlers/Container'
import QuestionCard from '../../Handlers/ContentHandlers/QuestionCard';

import styles from './FAQ.module.scss'

const FAQSection = ({ faq, id, className }) => {
  return <div id={id} className={classNames(styles.FAQ, className)} >
    <Container center gutter size='small' >
      <IconHeading
        icon='./Icons/Vector.svg'
        text='FAQ'
        className={styles.Section}
        imageClass={styles.SectionImage}
      />
      {faq.map((card, i) => {
        const { question, answer } = card

        return <QuestionCard
          key={card._key}
          className={styles.Card}
          question={question}
          answer={answer}
          index={i}
        />
      })}
    </Container>
  </div>;
};

FAQSection.propTypes = {
  faq: array.isRequired,
  id: string,
  className: string
};

export default FAQSection;
