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

const CommunitySection = ({ id, className, title, photos }) => {

  const prevRef = useRef(null)
  const nextRef = useRef(null);
  SwiperCore.use([Pagination]);

  return (
    <div id={id} className={classNames(styles.CommunitySection, className)}>
      <IconHeading
        icon='./Icons/SpeechIcon.png'
        text={title && title}
        className={styles.SectionName}
      />
      <Swiper 
        className={styles.Cards}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
          hideOnClick: true
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
      {photos && photos.map((photo) => {
        return <SwiperSlide key={photo._key} className={styles.Card}>
            <Image
              className={styles.Image}
              src={photo.image}
              alt={photo.alt}
            />
            <div className={styles.Testimonials}>
              <BlockContent className={styles.Description} blocks={photo.description} />
              <p className={styles.Name}><span>~</span>{photo.name}</p>
            </div>
        </SwiperSlide>
      })}
      </Swiper>
      <div className={styles.Nav}>
          <Image ref={nextRef} className={styles.Next} src='Icons/ArrowLeft.png' />
          <Image ref={prevRef} className={styles.Prev} src='Icons/ArrowRight.png' />
        </div>
    </div>
  )
}

CommunitySection.propTypes = {
  photos: array.isRequired,
  id: string.isRequired,
  title: string.isRequired,
  className: string
}

export default CommunitySection
