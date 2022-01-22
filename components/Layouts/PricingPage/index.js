import React from 'react'
import classNames from 'classnames'
import { object, string, array } from 'prop-types'
import Image from '../../Handlers/ImageHandler'
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/css'
import "swiper/css/pagination"

import styles from './Pricing.module.scss'
import IconHeading from '../../IconHeading';

SwiperCore.use([Pagination]);

const PricingPage = ({ id, refer, className, title, pricings }) => {
  return (
    <div id={id} ref={refer} className={classNames(styles.Pricing, className)}>
      <IconHeading
        icon='./Icons/PriceTag.png'
        text={title}
        className={styles.sectionName}
      />
      <div className={styles.cards}>
      {pricings.map((plan, i) => {
        return <div key={plan._key} className={styles.plan}>
          <div className={styles.price}>
            <h3 className={styles.name}>{plan.plan}</h3>
            <p className={styles.cost}>{plan.price}<span>$</span></p>
            <p className={styles.freq}>/{plan.freq}</p>
          </div>
          <div className={styles.extrasDiv}>
            {plan.extras.map((ex, i) => (
              <p key={`${plan._key}_${i}`} >
                <Image className={styles.image} 
                        src={i % 2 == 1 ? './Icons/CheckmarkW.png' 
                                        : './Icons/CheckmarkB.png'}/> {ex}</p>
            ))}
          <div className={styles.joinBtn}>Join Now</div>
          </div>
        </div>
      })}
      </div>
    </div>
  )
}

PricingPage.propTypes = {
  pricings: array.isRequired,
  refer: object.isRequired,
  id: string.isRequired,
  title: string.isRequired,
  className: string
}

export default PricingPage
