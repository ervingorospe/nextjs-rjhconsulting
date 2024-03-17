import _ from 'lodash'
import { cache } from 'react';
// api
import { getCollection, generalInfo } from '@/api/collection'
import { getItem } from '@/api/item'
import { getFacebookFeed } from '@/api/social-media'

const ids = {
  callToActionSections: 30835,
  footerLocationInfo: 30808,
  socialMedia: 30810,
  location: 30807,
  settings: 174735,
  footerLogos: 30809,
  blogAuthors: 30818
}

const getBlogAuthors = cache(async () => {
  const temp =  await getCollection(`${ids.blogAuthors}`)
  return temp[0].items
})

const getFooterLogos = cache(async () => {
  return await getCollection(`${ids.footerLogos}`)
})

const facebookFeed = cache(async (id, limit, token) => {
  return await getFacebookFeed(id, limit, token)
})

const getLocation = cache(async () => {
  return await getCollection(`${ids.location}`)
})

const getGeneralInfo = cache(async () => {
  return await generalInfo()
})

const getSettings = cache(async () => {
  const items = await getItem(ids.settings)
  return items
})

const pageDetails = cache(async (id) => {
  const collection = await getItem(id)

  const { sectionItems } = _.first(collection)
  const activeSections = _.filter(sectionItems, data => _.get(data, 'fields.active') === '1')

  return {
    activeSections
  }
})

const getCallToAction = cache(async () => {
  const temp = await getCollection(ids.callToActionSections)
  return temp[0].items
})

const getSocialMedia = cache(async () => {
  const temp = await getCollection(ids.socialMedia)
  return temp[0].items
})

const getFooterLocationInfo = cache(async () => {
  const temp = await getCollection(ids.footerLocationInfo)
  return temp[0].items
})

export {
  pageDetails,
  getSettings,
  getCallToAction,
  getSocialMedia,
  getLocation,
  getGeneralInfo,
  getFooterLocationInfo,
  facebookFeed,
  getFooterLogos,
  getBlogAuthors
}