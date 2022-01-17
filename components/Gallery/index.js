import React from 'react'
import classNames from 'classnames'
import { object, string, array } from 'prop-types'
import { Swiper, SwiperSlide } from 'swiper/react'
import AnyImage from '../Handlers/ImageHandler'
import SwiperCore, { Pagination } from 'swiper';
import 'swiper/css'
import "swiper/css/pagination"

import styles from './Gallery.module.scss'
import BlockContent from '../Handlers/BlockContentHandler'

SwiperCore.use([Pagination]);

const Gallery = ({ id, refer, className, subtitle, photos }) => {
  return (
    <div id={id} ref={refer} className={classNames(styles.Gallery, className)}>
      <h2>Gallery</h2>
      <p className={styles.subtitle}>{subtitle}</p>
      <Swiper
        className={styles.carousel}
        loop={true}
        pagination={true}
        spaceBetween={50}
        breakpoints={{
          10: {
            slidesPerView: 1
          },
          650: {
            slidesPerView: 2
          },
          1030: {
            slidesPerView: 3
          },
          1370: {
            slidesPerView: 4
          }
        }}
      >
        {photos.map(photo => {
          return <SwiperSlide key={photo._key} className={styles.swiperSlide}>
            <AnyImage src={photo.image} alt={photo.alt} className={styles.photo} />
            <div className={styles.effect}>
              {photo.description && <BlockContent className={styles.imageTxt} blocks={photo.description} />} 
            </div>
          </SwiperSlide>
        })}
      </Swiper>
    </div>
  )
}

Gallery.propTypes = {
  photos: array.isRequired,
  refer: object.isRequired,
  id: string.isRequired,
  subtitle: string,
  className: string
}

export default Gallery
