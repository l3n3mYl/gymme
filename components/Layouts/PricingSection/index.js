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
    <div id={id} className={classNames(styles.PricingSection, className)}>
      <Container center size='mediumLarge'>
        <IconHeading
          icon='./Icons/PriceTag.png'
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
                          src={i % 2 == 1 ? './Icons/CheckmarkW.png' 
                                          : './Icons/CheckmarkB.png'}/> {ex}</p>
              ))}
            <button className={styles.JoinBtn}>Join Now</button>
            </div>
          </div>
        })}
        </div>
      </Container>
    </div>
  )
}

PricingSection.propTypes = {
  pricings: array.isRequired,
  id: string.isRequired,
  title: string.isRequired,
  className: string
}

export default PricingSection
