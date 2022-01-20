import {
  groq,
  createClient,
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
} from 'next-sanity'

import {
  getHomeDataQuery,
  getAboutDataQuery,
  getWorkoutsDataQuery,
  getPricingPageDataQuery,
  getContactPageDataQuery
} from './queries'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2022-01-02',
  ignoreBrowserTokenWarning: true
}

export const imageBuilder = source => createImageUrlBuilder(config).image(source)
export const usePreviewSubscription = createPreviewSubscriptionHook(config)
export const client = createClient(config)
export const previewClient = createClient({
  ...config,
  useCdn: false,
  apiVersion: '2022-01-02',
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
})

export const getClient = (usePreview) => (usePreview ? previewClient : client)
export default client

export async function getHomeData(preview) {
  const data = await getClient(preview).fetch(getHomeDataQuery)

  return data
}

export async function getAboutPageData(preview) {
  const data = await getClient(preview).fetch(getAboutDataQuery)
  
  return data
}

export async function getWorkoutsPageData(preview) {
  const data = await getClient(preview).fetch(getWorkoutsDataQuery)
  
  return data
}

export async function getPricingPageData(preview) {
  const data = await getClient(preview).fetch(getPricingPageDataQuery)
  
  return data
}

export async function getContactPageData(preview) {
  const data = await getClient(preview).fetch(getContactPageDataQuery)

  return data
}