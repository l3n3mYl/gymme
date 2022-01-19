import Layout from '../components/Layout/Layout'
import { useRouter } from 'next/router'
import { getHomeDataQuery } from '../lib/queries'
import Meta from '../components/Meta/Meta'
import { 
  getHomeData,
  getAboutPageData,
  usePreviewSubscription,
  getWorkoutsPageData,
  getGalleryPageData,
  getContactPageData
 } from '../lib/sanity'

import { useRef } from 'react'
import HomePage from '../components/Layouts/HomePage'
import AboutPage from '../components/Layouts/AboutPage'
import Workouts from '../components/Layouts/Workouts'
import Gallery from '../components/Gallery'
import Contact from '../components/Contact'
import Wrapper from '../components/WideScreenWrapper'

const Index = ({ homePageData, aboutPageData, workoutsPageData, galleryPageData, contactPageData }) => {

  const router = useRouter()
  const { data: pageData } = usePreviewSubscription(getHomeDataQuery, {
    initialData: homePageData,
    enabled: router.query.preview !== null
  })

  const { home, siteSettings } = pageData
  const { openGraph } = siteSettings
  
  const homeRef = useRef(null)
  const about = useRef(null)
  const workouts = useRef(null)
  const gallery = useRef(null)
  const contact = useRef(null)

  const allRefs = [homeRef, about, workouts, gallery, contact]

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
      <AboutPage 
      refer={about} 
      id='About' 
      title={aboutPageData.title}
      description={aboutPageData.description}
      offerings={aboutPageData.offerings}
      />
      <Workouts
        refer={workouts}
        id='Workouts'
        title={workoutsPageData.title}
        offerings={workoutsPageData.offerings}
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
  const aboutPageData = await getAboutPageData()
  const workoutsPageData = await getWorkoutsPageData()
  const galleryPageData = await getGalleryPageData()
  const contactPageData = await getContactPageData()

  return {
    props: { 
      homePageData: homePageData,
      aboutPageData: aboutPageData,
      workoutsPageData: workoutsPageData,
      galleryPageData: galleryPageData,
      contactPageData: contactPageData
     },
    revalidate: 60
  }
}

export default Index
