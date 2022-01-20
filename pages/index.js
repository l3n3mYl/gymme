import Layout from '../components/Layout/Layout'
import { useRouter } from 'next/router'
import { getHomeDataQuery } from '../lib/queries'
import Meta from '../components/Meta/Meta'
import { 
  getHomeData,
  getAboutPageData,
  usePreviewSubscription,
  getWorkoutsPageData,
  getPricingPageData,
  getContactPageData
 } from '../lib/sanity'

import { useRef } from 'react'
import HomePage from '../components/Layouts/HomePage'
import AboutPage from '../components/Layouts/AboutPage'
import Workouts from '../components/Layouts/Workouts'
import PricingPage from '../components/Layouts/PricingPage'
import Contact from '../components/Contact'
import Wrapper from '../components/WideScreenWrapper'

const Index = ({ homePageData, aboutPageData, workoutsPageData, pricingPageData, contactPageData }) => {

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
  const pricing = useRef(null)
  const contact = useRef(null)

  const allRefs = [homeRef, about, workouts, pricing, contact]

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
      <PricingPage
      refer={pricing}
      id='Pricing'
      title={pricingPageData.title}
      pricings={pricingPageData.pricings}
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
  const pricingPageData = await getPricingPageData()
  const contactPageData = await getContactPageData()

  return {
    props: { 
      homePageData: homePageData,
      aboutPageData: aboutPageData,
      workoutsPageData: workoutsPageData,
      pricingPageData: pricingPageData,
      contactPageData: contactPageData
     },
    revalidate: 60
  }
}

export default Index
