import React from 'react'
import classNames from 'classnames'
import { string, object, array } from 'prop-types'
import styles from './Testimonials.module.scss'
import BlockContent from '../Handlers/BlockContentHandler'
import AnyImage from '../Handlers/ImageHandler'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Parallax from '../Animations/Parallax'

const Testimonials = ({ bckImage, alt, title, description, testimonials, id, refer, className }) => {

  return (
    <div id={id} ref={refer} className={styles.Testimonials}>
      <Parallax 
        image={bckImage}
        blur={3}
        alt={alt}
        opacity={1}
      >
        <div className={classNames(className, styles.backg)}>
          <h2>{title}</h2>
          {description && <BlockContent className={styles.subtitle} blocks={description} />}
          <Swiper
            className={styles.carousel}
            loop={true}
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
            {testimonials.map(item => {
              return <SwiperSlide key={item._key} className={styles.card}>
                <AnyImage className={styles.cardImage} alt={item.alt} src={item.image} />
                <BlockContent className={styles.cardText} blocks={item.description} />
              </SwiperSlide>
            })}
          </Swiper>
        </div>
      </Parallax>
    </div> 
      
  )
}

Testimonials.propTypes = {
  bckImage: object.isRequired,
  alt: string.isRequired,
  title: string.isRequired,
  refer: object.isRequired,
  id: string.isRequired,
  testimonials: array,
  description: array,
  className: string
}

export default Testimonials
