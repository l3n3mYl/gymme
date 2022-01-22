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
  getCommunityPageData
 } from '../lib/sanity'

import HomeSection from '../components/Layouts/HomeSection'
import AboutSection from '../components/Layouts/AboutSection'
import Workouts from '../components/Layouts/Workouts'
import PricingSection from '../components/Layouts/PricingSection'
import CommunitySection from '../components/Layouts/CommunitySection'
import Wrapper from '../components/WideScreenWrapper'

const Index = ({ homePageData, aboutPageData, workoutsPageData, pricingPageData, communityPageData }) => {
  
  const router = useRouter()
  const { data: pageData } = usePreviewSubscription(getHomeDataQuery, {
    initialData: homePageData,
    enabled: router.query.preview !== null
  })

  const { home, siteSettings } = pageData
  const { openGraph } = siteSettings

  return (
    <Wrapper>
      <Layout title={siteSettings.openGraph.title}>
      <Meta {...openGraph} />
      <HomeSection 
        id='Home'
        image={home.image}
        title={home.title}
        coloredTitle={home.coloredTitle}
        subtitle={home.subtitle}
      />
      <AboutSection 
      id='About' 
      title={aboutPageData.title}
      description={aboutPageData.description}
      offerings={aboutPageData.offerings}
      />
      <Workouts
        id='Workouts'
        title={workoutsPageData.title}
        offerings={workoutsPageData.offerings}
      />
      <PricingSection
      id='Pricing'
      title={pricingPageData.title}
      pricings={pricingPageData.pricings}
      />
      <CommunitySection
      id='Community'
      title={communityPageData.title}
      photos={communityPageData.photos}
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
  const communityPageData = await getCommunityPageData()

  return {
    props: { 
      homePageData: homePageData,
      aboutPageData: aboutPageData,
      workoutsPageData: workoutsPageData,
      pricingPageData: pricingPageData,
      communityPageData: communityPageData
     },
    revalidate: 60
  }
}

export default Index
