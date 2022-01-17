import React from 'react'
import { object, number, array, oneOfType } from 'prop-types'
import { Parallax as ReactParallax } from 'react-parallax'
import imageUrlBuilder from '@sanity/image-url'

const Parallax = ({ image, children, strength, blur, alt, opacity }) => {

  const imgUrlBuilder = imageUrlBuilder({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET
  })
  const el = imgUrlBuilder.image(image)
  return (
    <ReactParallax
      // bgImage={imgUrlBuilder.image(image)}
      bgImage={el}
      bgImageAlt={alt}
      strength={strength ? strength : 400}
      blur={blur ? blur : 0}
      bgImageStyle={{opacity: opacity}}
    >
      {children}
    </ReactParallax>
  )
}

Parallax.propTypes = {
  image: object.isRequired,
  children: oneOfType([array, object]).isRequired,
  strength: number,
  style: object,
  blur: number
}

export default Parallax
