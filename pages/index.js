import Layout from '../components/Layout/Layout'
import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '../contexts/JWTVerification'
import { getHomeDataQuery } from '../lib/queries'
import Meta from '../components/Meta/Meta'
import {
  getHomeData,
  getAboutPageData,
  usePreviewSubscription,
  getWorkoutsPageData,
  getPricingPageData,
  getCommunityPageData,
  getFAQSectionData
} from '../lib/sanity'

import HomeSection from '../components/Layouts/HomeSection'
import AboutSection from '../components/Layouts/AboutSection'
import Workouts from '../components/Layouts/Workouts'
import PricingSection from '../components/Layouts/PricingSection'
import CommunitySection from '../components/Layouts/CommunitySection'
import FAQSection from '../components/Layouts/FAQSection'

const Index = ({
  homePageData,
  aboutPageData,
  workoutsPageData,
  pricingPageData,
  communityPageData,
  FAQSectionData
}) => {
  const router = useRouter()
  const { data: pageData } = usePreviewSubscription(getHomeDataQuery, {
    initialData: homePageData,
    enabled: router.query.preview !== null
  })

  const [userLogged, setUserLogged] = useState(false)
  const [user, setUser] = useState({})
  const { verifyJWT, authState } = useContext(AuthContext)

  useEffect(() => {
    if (!Object.keys(user).length) {
      verifyJWT(window.sessionStorage)
      setUser(authState.user)
      if (authState.user === 'Token Expired' || authState.user === '')
        setUserLogged(false)
      else setUserLogged(true)
    }
  }, [authState])

  const { home, siteSettings } = pageData
  const { openGraph } = siteSettings

  return (
    <Layout userLogged={userLogged} title={siteSettings.openGraph.title}>
      <Meta {...openGraph} />
      <HomeSection
        id="Home"
        image={home.image}
        title={home.title}
        coloredTitle={home.coloredTitle}
        subtitle={home.subtitle}
      />
      <AboutSection
        id="About"
        title={aboutPageData.title}
        description={aboutPageData.description}
        offerings={aboutPageData.offerings}
      />
      <Workouts
        id="Workouts"
        title={workoutsPageData.title}
        offerings={workoutsPageData.offerings}
      />
      <PricingSection
        id="Pricing"
        title={pricingPageData.title}
        pricings={pricingPageData.pricings}
      />
      <CommunitySection
        id="Community"
        title={communityPageData.title}
        photos={communityPageData.photos}
      />
      <FAQSection id="FAQ" faq={FAQSectionData.faq} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const homePageData = await getHomeData()
  const aboutPageData = await getAboutPageData()
  const workoutsPageData = await getWorkoutsPageData()
  const pricingPageData = await getPricingPageData()
  const communityPageData = await getCommunityPageData()
  const FAQSectionData = await getFAQSectionData()

  return {
    props: {
      homePageData: homePageData,
      aboutPageData: aboutPageData,
      workoutsPageData: workoutsPageData,
      pricingPageData: pricingPageData,
      communityPageData: communityPageData,
      FAQSectionData: FAQSectionData
    },
    revalidate: 60
  }
}

export default Index
