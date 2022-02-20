import { useRouter } from 'next/router'
import Meta from '../components/Meta/Meta'
import Layout from '../components/Layout/Layout'
import { getHomeDataQuery } from '../lib/queries'
import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/JWTVerification'
import {
  getHomeData,
  getAboutPageData,
  usePreviewSubscription,
  getWorkoutsPageData,
  getPricingPageData,
  getCommunityPageData,
  getFAQSectionData
} from '../lib/sanity'

import Workouts from '../components/Layouts/Workouts'
import FAQSection from '../components/Layouts/FAQSection'
import HomeSection from '../components/Layouts/HomeSection'
import AboutSection from '../components/Layouts/AboutSection'
import LoadingOverlay from '../components/LoadingOverlay/LoadingOverlay.js'
import PricingSection from '../components/Layouts/PricingSection'
import CommunitySection from '../components/Layouts/CommunitySection'

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

  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [userLogged, setUserLogged] = useState(false)
  const { verifyJWT, authState } = useContext(AuthContext)

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      verifyJWT(window.sessionStorage.getItem('token'))
      authState.user && setUser(authState.user)
    }

    if (user !== 'Token Expired' && Object.keys(user).length !== 0) {
      setUserLogged(true)
      setLoading(false)
    } else {
      setUserLogged(false)
      setLoading(false)
    }
  }, [authState, user, verifyJWT])

  const { home, siteSettings } = pageData
  const { openGraph } = siteSettings

  if (loading) return <LoadingOverlay loading />
  else
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
