import { groq } from 'next-sanity'

export const getHomePageDataQuery = groq`*[_type == "homePage"][0] {
  _id,
  title,
  coloredTitle,
  subtitle,
  hero,
  image,
  openGraph
}`

export const getSiteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  _id,
  openGraph
}`

export const getHomeDataQuery = groq`{
  "home": ${getHomePageDataQuery},
  "siteSettings": ${getSiteSettingsQuery}
}`

export const getAboutDataQuery = groq`*[_type == "about"][0] {
  _id,
  title,
  description
}`

export const getWorkoutsDataQuery = groq`*[_type == "workouts"][0] {
  _id,
  title,
  offerings
}`

export const getPricingPageDataQuery = groq`*[_type == "pricingPage"][0] {
  _id,
  title,
  pricings
}`

export const getCommunityPageDataQuery = groq`*[_type == "community"][0] {
  _id,
  title,
  photos
}`