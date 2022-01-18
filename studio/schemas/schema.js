// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import blockContent from './objects/blockContent'
import openGraph from './objects/openGraph'
import home from './pages/HomePage'
import imageTitle from './plugs/imageTitle'
import about from './pages/AboutPage'
import pricingPage from './pages/PricingPage'
import pricingTemp from './plugs/pricingTemp'
import galleryPage from './pages/GalleryPage'
import workoutsPage from './pages/WorkoutsPage'
import communityPage from './pages/CommunityPage'
import FAQPage from './pages/FAQPage'
import FAQTemp from './plugs/FAQTemp'
import itemGallery from './plugs/itemGallery'
import imageCard from './plugs/imageCard'
import gallery from './plugs/gallery'
import figure from './plugs/figure'
import grid from './plugs/grid'
import post from './post'
import location from './plugs/location'
import mainImage from './plugs/mainImage'
import video from './plugs/video'
import author from './author'
import siteSettings from './siteSettings'
import category from './category'
import companyInfo from './companyInfo'


// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    blockContent,
    pricingPage,
    FAQPage,
    FAQTemp,
    pricingTemp,
    workoutsPage,
    communityPage,
    imageTitle,
    openGraph,
    home,
    about,
    galleryPage,
    itemGallery,
    imageCard,
    gallery,
    figure,
    grid,
    post,
    location,
    mainImage,
    video,
    author,
    siteSettings,
    category,
    companyInfo  
  ])
})
