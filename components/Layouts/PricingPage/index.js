import React from 'react'
import classNames from 'classnames'
import { object, string, array } from 'prop-types'
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
      {pricings.map(plan => {
        return <div className={styles.plan}>
          <div className={styles.price}>
            <p className={styles.name}>{plan.plan}</p>
            <p className={styles.cost}>{plan.price}<span>$</span></p>
            <p className={styles.freq}>/{plan.freq}</p>
          </div>
          <div className={styles.extras}>
            {plan.extras.map(ex => (
              <p>{ex}</p>
            ))}
          </div>
        </div>
      })}
    </div>
  )
}

PricingPage.propTypes = {
  photos: array.isRequired,
  refer: object.isRequired,
  id: string.isRequired,
  subtitle: string,
  className: string
}

export default PricingPage
