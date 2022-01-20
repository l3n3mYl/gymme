import React, { useRef } from 'react'
import classNames from 'classnames'
import { object, string, array } from 'prop-types'
import BlockContent from '../../Handlers/BlockContentHandler'
import Image from '../../Handlers/ImageHandler'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/css'
import "swiper/css/pagination"

import styles from './Community.module.scss'
import IconHeading from '../../IconHeading';

const PricingPage = ({ id, refer, className, title, photos }) => {

  const prevRef = useRef(null)
  const nextRef = useRef(null);
  SwiperCore.use([Pagination]);

  return (
    <div id={id} ref={refer} className={classNames(styles.Community, className)}>
      <IconHeading
        icon='./Icons/SpeechIcon.png'
        text={title}
        className={styles.sectionName}
      />
      <Swiper 
        className={styles.cards}
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
        spaceBetween={0}
        breakpoints={{
          10: {
            slidesPerView: 1.8
          },
          480: {
            slidesPerView: 2.0,
          },
          550: {
            slidesPerView: 2.2,
          },
          650: {
            slidesPerView: 2.3,
          },
          700: {
            slidesPerView: 2.5,
          },
        }}
        centeredSlides={true}
      >
      {photos.map((photo) => {
        return <SwiperSlide className={styles.card}>
            <Image
              className={styles.image}
              src={photo.image}
              alt={photo.alt}
            />
            <div className={styles.testimonials}>
              <BlockContent className={styles.description} blocks={photo.description} />
              <p className={styles.name}><span>~</span>{photo.name}</p>
            </div>
        </SwiperSlide>
      })}
      </Swiper>
      <div className={styles.nav}>
          <Image ref={nextRef} className={styles.next} src='Icons/ArrowLeft.png' />
          <Image ref={prevRef} className={styles.prev} src='Icons/ArrowRight.png' />
        </div>
    </div>
  )
}

PricingPage.propTypes = {
  photos: array.isRequired,
  refer: object.isRequired,
  id: string.isRequired,
  title: string.isRequired,
  className: string
}

export default PricingPage
