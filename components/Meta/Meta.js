import { client } from '../../lib/sanity'
import { NextSeo } from 'next-seo'
import { string, object } from 'prop-types'
import { useNextSanityImage } from 'next-sanity-image'

import config from '../../config'

const { url } = config.meta

const Meta = ({ title, description, canonical, image }) => {
  const canonicalUrl = `${url}${canonical}`
  const nsImage = useNextSanityImage(client, image)
  const config = {
    title: title,
    description: description,
    ...(canonical && { canonical: canonicalUrl}),
    openGraph: {
      title: title,
      description: description,
      url: canonicalUrl,
      images: nsImage && [
        {
          url: nsImage.src,
          width: nsImage.width,
          height: nsImage.height,
          alt: 'E-Commerce'
        }
      ]
    }
  }
  return <NextSeo {...config} />
}

Meta.propTypes = {
  title: string,
  description: string,
  canonical: string,
  image: object
}

export default Meta