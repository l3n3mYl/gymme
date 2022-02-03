import Layout from '../components/Layout/Layout'
import { useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/router'
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

  useLayoutEffect(() => {
    const token = window.sessionStorage.getItem('token')
    fetch(`${process.env.NEXT_PUBLIC_SERVER}/users/verifyJWT`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: token
      })
    })
      .then((e) => {
        if (e.status === 201) setUserLogged(false)
        else setUserLogged(true)
      })
      .catch((err) => console.log(err))
  })

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
