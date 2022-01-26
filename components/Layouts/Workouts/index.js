import React, { useRef } from 'react'
import classNames from 'classnames'
import { string, array } from 'prop-types'
import styles from './Workouts.module.scss'
import AnyImage from '../../Handlers/ImageHandler'
import 'swiper/css'
import IconHeading from '../../IconHeading'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css'
import "swiper/css/navigation"
import Container from '../../Handlers/ContentHandlers/Container'

const Workouts = ({ title, offerings, id, className }) => {

  SwiperCore.use([Navigation])

  const prevRef = useRef(null)
  const nextRef = useRef(null);

  return (
    <Container center>
      <div id={id} className={classNames(styles.Workouts, className)}>
        <IconHeading
          icon={'./Icons/Vector-9.svg'}
          className={styles.SectionName}
          imageClass={styles.SectionImg}
          text={title && title}
        />
        <Swiper 
          className={styles.Carousel}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
            hideOnClick: true
          }}
          loop={true}
          breakpoints={{
            10: {
              spaceBetween: 40,
              slidesPerView: 2.5
            },
            960: {
              spaceBetween: 20,
              slidesPerView: 3.5
            },
            1156: {
              slidesPerView: 4.5
            }
          }}
          centeredSlides={true}
        >
          <div className={styles.Nav}>
            <AnyImage ref={prevRef} className={styles.Next} src='Icons/Vector-7.svg' />
            <AnyImage ref={nextRef} className={styles.Prev} src='Icons/Vector-8.svg' />
          </div>
          {offerings && offerings.map(offer => {
            return <SwiperSlide key={offer._key} className={styles.Card}>
            {({ isActive }) => {
              return <div className={classNames(styles.Offer, isActive && styles.Active)}>
                        <AnyImage className={styles.Image} src={offer.image} />
                        <p className={styles.Title}>{offer.title}</p>
              </div>
            }}
          </SwiperSlide>
          })}
        </Swiper>
      </div> 
    </Container>
      
  )
}

Workouts.propTypes = {
  title: string.isRequired,
  offerings: array.isRequired,
  id: string,
  className: string
}

export default Workouts
