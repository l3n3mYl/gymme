import React from 'react'
import classNames from 'classnames'
import { string, array } from 'prop-types'
import Image from '../../Handlers/ImageHandler'
import SwiperCore, { Pagination } from 'swiper';
import Container from '../../Handlers/ContentHandlers/Container'
import 'swiper/css'
import "swiper/css/pagination"

import styles from './Pricing.module.scss'
import IconHeading from '../../IconHeading';

SwiperCore.use([Pagination]);

const PricingSection = ({ id, className, title, pricings }) => {
  return (
    <Container center size='mediumLarge'>
      <div id={id} className={classNames(styles.PricingSection, className)}>
        <IconHeading
          icon='./Icons/Vector-4.svg'
          text={title && title}
          className={styles.SectionName}
          imageClass={styles.SectionImage}
        />
        <div className={styles.Cards}>
        {pricings && pricings.map((plan, i) => {
          return <div key={plan._key} className={styles.Plan}>
            <div className={styles.Price}>
              <h3 className={styles.Name}>{plan.plan}</h3>
              <p className={styles.Cost}>{plan.price}<span>$</span></p>
              <p className={styles.Freq}>/{plan.freq}</p>
            </div>
            <div className={styles.ExtrasDiv}>
              {plan.extras.map((ex, index) => (
                <p key={`${plan._key}_${index}`} >
                  <Image className={styles.Image} 
                          src={i % 2 == 1 ? './Icons/Vector-5.svg' 
                                          : './Icons/Vector-6.svg'}/> {ex}</p>
              ))}
            <button className={styles.JoinBtn}>Join Now</button>
            </div>
          </div>
        })}
        </div>
     </div>
    </Container>
  )
}

PricingSection.propTypes = {
  pricings: array.isRequired,
  id: string.isRequired,
  title: string.isRequired,
  className: string
}

export default PricingSection
