import { cache } from 'react';
import _ from 'lodash'
// function
import { formatRouteName } from './formatting'
// api
import { getCollection } from '@/api/collection'
import { getItem } from '@/api/item'

const ids = {
  navigation: 30839,
  actionButtons: 30812,
  freeStandingPages: 30841,
  blogs: 30819,
  profiles: 31178,
  news: 31180,
  legalNavigation: 30840
}

const getPages = cache(async (id) => {
  const collections = await getCollection(id)
  return collections[0].items
})

const generateStaticRoutes = cache(async () => {
  const navigations = await getPages(ids.navigation)
  const standingPages = await getPages(ids.freeStandingPages)
  const legalNavigationPages = await getPages(ids.legalNavigation)

  // standing pages loop
  const standingPagesPaths = standingPages?.map(data => {
    const slug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : formatRouteName(data.name)

    return {
      slug: [`${slug}`]
    }
  })
  
  // legal navigation pages loop
  const legalNavigationPaths = legalNavigationPages?.map(data => {
    const slug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : formatRouteName(data.name)

    return {
      slug: [`${slug}`]
    }
  })

  // navigations
  const paths = await Promise.all(navigations?.map(async data => {
    const parentSlug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : data.name

    if (data.parentId !== 0) {
      const items = await getItem(data.parentId)
      const parentRoute = formatRouteName(_.get(items[0], 'fields.slug') ? _.get(items[0], 'fields.slug') : _.get(items[0], 'name'))

      if (_.get(items[0], 'parentId') !== 0) {
        const mainParent = await getItem(_.get(items[0], 'parentId'))
        const mainParentRoute = formatRouteName(_.get(mainParent[0], 'fields.slug') ? _.get(mainParent[0], 'fields.slug') : _.get(mainParent[0], 'name'))

        return {
          slug: [`${mainParentRoute}`,`${parentRoute}`,`${formatRouteName(parentSlug)}`]
        }
      }

      return {
        slug: [`${parentRoute}`,`${formatRouteName(parentSlug)}`]
      }
    }
    
    return {
      slug: [`${formatRouteName(parentSlug)}`]
    }
  }))

  return [...paths, ...standingPagesPaths, ...legalNavigationPaths]
})

const getNavigationDetails = cache(async () => {
  const navigations = await getPages(ids.navigation)
  const standingPages = await getPages(ids.freeStandingPages)
  const legalNavigationPages = await getPages(ids.legalNavigation)

  // standing pages loop
  const standingPagesPaths = standingPages?.map(data => {
    const slug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : formatRouteName(data.name)

    return {
      ...data,
      type: 'standing page',
      slug
    }
  })

  // legal navigation pages loop
  const legalNavigationPaths = legalNavigationPages?.map(data => {
    const slug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : formatRouteName(data.name)

    return {
      ...data,
      type: 'legal navigation page',
      slug
    }
  })

  // navigation
  const paths = await Promise.all(navigations?.map(async data => {
    const parentSlug = _.get(data, 'fields.slug') ? _.get(data, 'fields.slug') : data.name

    if (data.parentId !== 0) {
      const items = await getItem(data.parentId)
      const parentRoute = formatRouteName(_.get(items[0], 'fields.slug') ? _.get(items[0], 'fields.slug') : _.get(items[0], 'name'))

      if (_.get(items[0], 'parentId') !== 0) {
        const mainParent = await getItem(_.get(items[0], 'parentId'))
        const mainParentRoute = formatRouteName(_.get(mainParent[0], 'fields.slug') ? _.get(mainParent[0], 'fields.slug') : _.get(mainParent[0], 'name'))

        return {
          ...data,
          type: 'navigation page',
          slug: `${mainParentRoute}/${parentRoute}/${formatRouteName(parentSlug)}`,
        }
      }

      return {
        ...data,
        slug: `${parentRoute}/${formatRouteName(parentSlug)}`,
      }
    }

    return {
      ...data,
      slug: formatRouteName(parentSlug),
    }
  }))

  return [...paths, ...standingPagesPaths, ...legalNavigationPaths]
})

const checkRoute = cache(async (routeName) => {
  if (routeName === '/') {
    routeName = 'home'
  }

  const paths = await getNavigationDetails()
  return _.find(paths, data => data.slug == routeName)
})

const getActionButtons = cache(async () => {
  const temp = await getCollection(ids.actionButtons)
  return temp[0].items
})


// for blogs
const generateStaticBlogs = cache( async () => {
  const temp = await getPages(ids.blogs)
  const blogs = _.filter(temp, data => data.fields.active)

  const paths = blogs?.map(blog => {
    const removeChar = blog.name.replace(/[^a-zA-Z0-9 ]/g, ' ')
    const slug = formatRouteName(removeChar.replace(/  +/g, ' '))

    return {
      slug
    }
  })
  
  return paths
})

const getBlogDetails = cache( async () => {
  const temp = await getPages(ids.blogs)
  const blogs = _.filter(temp, data => data.fields.active)

  const paths = blogs?.map(blog => {
    const removeChar = blog.name.replace(/[^a-zA-Z0-9 ]/g, ' ')
    const slug = formatRouteName(removeChar.replace(/  +/g, ' '))

    return {
      slug,
      ...blog
    }
  })
  
  return paths
})

const checkBlog = cache(async (routeName) => {
  if (routeName === '/') {
    return
  }
  
  const paths = await getBlogDetails()

  return _.find(paths, data => data.slug == routeName)
})

const nextAndPrevBlog = cache(async (routeName) => {
  const paths = await getBlogDetails()

  return {
    prevIndex: paths[_.findIndex(paths, { 'slug': routeName }) - 1] ? paths[_.findIndex(paths, { 'slug': routeName }) - 1].slug : '',
    nextIndex: paths[_.findIndex(paths, { 'slug': routeName }) + 1] ? paths[_.findIndex(paths, { 'slug': routeName }) + 1].slug : ''
  }
})

// for team profiles
const generateStaticProfiles = cache( async () => {
  const temp = await getPages(ids.profiles)
  const profiles = _.filter(temp, data => data.fields.active)

  const paths = profiles?.map(profile => {
    const removeChar = profile.name.replace(/[^a-zA-Z0-9 ]/g, ' ')
    const slug = formatRouteName(removeChar.replace(/  +/g, ' '))

    return {
      slug
    }
  })
  
  return paths
})

const getProfileDetails = cache( async () => {
  const temp = await getPages(ids.profiles)
  const profiles = _.filter(temp, data => data.fields.active)

  const paths = profiles?.map(profile => {
    const removeChar = profile.name.replace(/[^a-zA-Z0-9 ]/g, ' ')
    const slug = formatRouteName(removeChar.replace(/  +/g, ' '))

    return {
      slug,
      ...profile
    }
  })
  
  return paths
})

const checkProfile = cache(async (routeName) => {
  if (routeName === '/') {
    return
  }

  const paths = await getProfileDetails()
  return _.find(paths, data => data.slug == routeName)
})


// for news
const generateStaticNews = cache( async () => {
  const temp = await getPages(ids.news)
  const news = _.filter(temp, data => data.fields.active)

  const paths = news?.map(item => {
    const removeChar = item.name.replace(/[^a-zA-Z0-9 ]/g, ' ')
    const slug = formatRouteName(removeChar.replace(/  +/g, ' '))

    return {
      slug
    }
  })
  
  return paths
})

const getNewsDetails = cache( async () => {
  const temp = await getPages(ids.news)
  const news = _.filter(temp, data => data.fields.active)

  const paths = news?.map(item => {
    const removeChar = item.name.replace(/[^a-zA-Z0-9 ]/g, ' ')
    const slug = formatRouteName(removeChar.replace(/  +/g, ' '))

    return {
      slug,
      ...item
    }
  })
  
  return paths
})

const checkNews = cache(async (routeName) => {
  if (routeName === '/') {
    return
  }

  const paths = await getNewsDetails()
  return _.find(paths, data => data.slug == routeName)
})

const nextAndPrevNews = cache(async (routeName) => {
  const paths = await getNewsDetails()

  return {
    prevIndex: paths[_.findIndex(paths, { 'slug': routeName }) - 1] ? paths[_.findIndex(paths, { 'slug': routeName }) - 1].slug : '',
    nextIndex: paths[_.findIndex(paths, { 'slug': routeName }) + 1] ? paths[_.findIndex(paths, { 'slug': routeName }) + 1].slug : ''
  }
})

export {
  checkRoute,
  generateStaticRoutes,
  getNavigationDetails,
  getActionButtons,
  generateStaticBlogs,
  getBlogDetails,
  checkBlog,
  nextAndPrevBlog,
  generateStaticProfiles,
  getProfileDetails,
  checkProfile,
  generateStaticNews,
  checkNews,nextAndPrevNews
}