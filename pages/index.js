import Layout from '../components/Layout/Layout'
import { useRouter } from 'next/router'
import { getHomeDataQuery } from '../lib/queries'
import Meta from '../components/Meta/Meta'
import { 
  getHomeData,
  getWhatWeDoData,
  usePreviewSubscription,
  getTestimonialsPageData,
  getGalleryPageData,
  getContactPageData
 } from '../lib/sanity'

import { useRef } from 'react'
import HomePage from '../components/HomePage'
import WhatWeDo from '../components/WhatWeDo'
import Testimonials from '../components/Testimonials'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'
import Wrapper from '../components/WideScreenWrapper'

const Index = ({ homePageData, whatWeDoPageData, testimonialsPageData, galleryPageData, contactPageData }) => {

  const router = useRouter()
  const { data: pageData } = usePreviewSubscription(getHomeDataQuery, {
    initialData: homePageData,
    enabled: router.query.preview !== null
  })

  const { home, siteSettings } = pageData
  const { openGraph } = siteSettings
  
  const homeRef = useRef(null)
  const whatWeDo = useRef(null)
  const testimonials = useRef(null)
  const gallery = useRef(null)
  const contact = useRef(null)

  const allRefs = [homeRef, whatWeDo, testimonials, gallery, contact]

  return (
    <Wrapper>
      <Layout refs={allRefs} title={siteSettings.openGraph.title}>
      <Meta {...openGraph} />
      <HomePage 
        refer={homeRef}
        id='Home'
        image={home.image}
        title={home.title}
        coloredTitle={home.coloredTitle}
        subtitle={home.subtitle}
      />
      <WhatWeDo 
      refer={whatWeDo} 
      id='What We Do' 
      title={whatWeDoPageData.title}
      description={whatWeDoPageData.description}
      offerings={whatWeDoPageData.offerings}
      />
      <Testimonials
        refer={testimonials}
        id='Testimonials'
        bckImage={testimonialsPageData.bckImage}
        alt={testimonialsPageData.alt}
        title={testimonialsPageData.title}
        description={testimonialsPageData.description}
        testimonials={testimonialsPageData.testimonials}
      />
      <Gallery
      refer={gallery}
      id='Gallery'
      subtitle={galleryPageData.subtitle}
      photos={galleryPageData.photos}
      />
      <Contact
      refer={contact}
      id='Contact'
      mainImage={contactPageData.mainImage}
      subtitle={contactPageData.subtitle}
      phone={contactPageData.phone}
      facebook={contactPageData.facebook}
      instagram={contactPageData.instagram}
      />
      </Layout>
    </Wrapper>
  )
}

export const getStaticProps = async () => {
  const homePageData = await getHomeData()
  const whatWeDoPageData = await getWhatWeDoData()
  const testimonialsPageData = await getTestimonialsPageData()
  const galleryPageData = await getGalleryPageData()
  const contactPageData = await getContactPageData()

  return {
    props: { 
      homePageData: homePageData,
      whatWeDoPageData: whatWeDoPageData,
      testimonialsPageData: testimonialsPageData,
      galleryPageData: galleryPageData,
      contactPageData: contactPageData
     },
    revalidate: 60
  }
}

export default Index
