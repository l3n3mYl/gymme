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

const Workouts = ({ title, offerings, id, refer, className }) => {

  SwiperCore.use([Navigation])

  const prevRef = useRef(null)
  const nextRef = useRef(null);

  return (
    <div id={id} ref={refer} className={classNames(styles.Workouts, className)}>
      <IconHeading
        icon={'./Icons/Callendar.png'}
        className={styles.sectionName}
        imageClass={styles.sectionImg}
        text={title}
      />
      <Swiper 
        className={styles.carousel}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
          swiper.navigation.init()
          swiper.navigation.update()
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
          hideOnClick: true
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current
          swiper.params.navigation.nextEl = nextRef.current
        }}
        loop={true}
        breakpoints={{
          10: {
            spaceBetween: 40,
            slidesPerView: 2.5
          },
          850: {
            spaceBetween: 20,
            slidesPerView: 3.5
          },
          1156: {
            spaceBetween: -200,
            slidesPerView: 3.5
          }
        }}
        centeredSlides={true}
      >
        <div className={styles.nav}>
          <AnyImage ref={nextRef} className={styles.next} src='Icons/ArrowLeft.png' />
          <AnyImage ref={prevRef} className={styles.prev} src='Icons/ArrowRight.png' />
        </div>
        {offerings.map(offer => {
          return <SwiperSlide className={styles.card}>
          {({ isActive }) => {
            return <div className={classNames(styles.offer, isActive && styles.active)}>
                      <AnyImage className={styles.image} src={offer.image} />
                      <p className={styles.title}>{offer.title}</p>
            </div>
          }}
        </SwiperSlide>
        })}
      </Swiper>
    </div> 
      
  )
}

Workouts.propTypes = {
  title: string.isRequired,
  offerings: array.isRequired,
  id: string,
  className: string
}

export default Workouts
