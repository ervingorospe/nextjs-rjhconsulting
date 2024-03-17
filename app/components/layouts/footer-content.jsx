'use client'

import { usePathname } from 'next/navigation';
import _ from 'lodash'
import Image from 'next/image';
import Link from 'next/link'
// function
import { sectionsComponent, formatComponentName, capitalizeFirstLetter } from '@/function/formatting'
// component
import * as FooterSection from '@/components/layouts/location-info'
import { NavButtonLink } from '@/components/layouts/functions'
import { LocationCard } from '@/components/layouts'
import * as SocialPlatform from '@/components/shared/socialmedia-platform'
//layouts
import { Container } from '@/app/layouts'


export function FooterContent({ navigation, locationInfo, location, socialMedia, general, logos }) {
  let pathname = usePathname();

  if (pathname === '/') {
    pathname = '/home'
  }

  const navDetails = _.find(navigation, data => `/${data.slug}` === pathname)
  const defaultLocationInfo = _.find(location, data => data.name === 'RJH Consulting')
  const filterNavigation = _.filter(navigation, data => _.get(data, 'fields.showInNavigation'))
  const filterLocation = _.filter(location, data => data.name !== 'RJH Consulting')
  const legalNavigation = _.filter(navigation, data => _.get(data, 'type') === 'legal navigation page')

  if (!_.get(navDetails, 'fields.hideFooter')) {
    return (
      <footer className="relative z-1 bg-primary-700 pb-24 pt-12">
        <Container width="max-w-screen-xl" margin="default" className="text-center lg:text-left">
          <div className="space-y-14">
            {/* location info */}
            {
              !_.get(navDetails, 'fields.hideFooterLocationInfo') && (
                <LocationInfo locationInfo={locationInfo} navigation={navigation} socialMedia={socialMedia} defaultLocationInfo={defaultLocationInfo}/>
              )
            }

            {/* navigation */}
            <Nav filterNavigation={filterNavigation} navigation={navigation}/>

            {/* Logos */}
            <Logos general={general} logos={logos}/>
          </div>

          <LegalNavigationLink legalNavigation={legalNavigation}/>

          {/* Social Media */}
          <SocialMedia socialMedia={socialMedia}/>
        </Container>
      </footer>
    )
  }
}

const Locations = ({ filterLocation }) => {
  return (
    filterLocation.length > 0 && (
      <div>
        <p className="text-center font-heading text-4xl font-semibold text-white md:text-5xl">Our Locations</p>
        <div className="mt-6 grid gap-3 md:mt-7 md:grid-cols-2 xl:grid-cols-4">
          {
            filterLocation?.map(item => (
              <LocationCard data={item} key={item.name}/>
            ))
          }
        </div>
      </div>
    )
  )
}

const LocationInfo = ({ locationInfo, navigation, socialMedia, defaultLocationInfo }) => {
  return (
    <div className="space-y-5 lg:flex lg:justify-between lg:space-y-0">
      {
        locationInfo?.map((item, i) => {
          const componentName = sectionsComponent(item)
          
          if (componentName && _.get(item, 'fields.active')) {
            const ComponentType = FooterSection[formatComponentName(componentName)]

            if (ComponentType) {
              return <ComponentType 
                navigation={navigation}
                data={item} 
                socialMedia={socialMedia} 
                key={i}
                location={defaultLocationInfo}
                styles={{
                  title: 'font-heading text-2xl font-normal text-white',
                  contentText: 'mt-3 text-lg text-gray-200',
                  link: 'text-white hover:underline',
                  buttonStyle: 'button button-sm mt-2 flex w-full max-w-sm mx-auto border-transparent bg-secondary-600 text-gray-900 hover:bg-white'
                }}
              />
            }
          }
        })
      }
    </div>
  )
}


const Nav = ({ filterNavigation, navigation }) => {
  return (
    <ul className="space-y-2 text-center lg:text-left lg:flex lg:justify-between lg:space-y-0">
      {
        filterNavigation?.map(item => {
          if (_.get(item, 'parentId') === 0) {
            const subNav = _.filter(filterNavigation, data => data.parentId === item.id);

            if (subNav.length === 0) {
              return (
                <li key={item.name}>
                  <NavButtonLink
                    navigation={navigation}
                    className="block text-base uppercase tracking-wide text-white hover:text-primary-200"
                    data={{
                      button: {
                        url: _.get(item, 'fields.nav.url') ? _.get(item, 'fields.nav.url') : item.slug,
                        text: item.name,
                        target: _.get(item, 'fields.nav.target'),
                      },
                      buttonPageLink: _.get(item, 'fields.pageLink'),
                    }}
                  />
                </li>
              )
            }

            return (
              <li key={item.name} className="block">
                <div className="block text-base uppercase tracking-wide text-white hover:text-primary-200">{item.name}</div>
                {
                  subNav?.map((subItem) => (
                    <NavButtonLink
                      navigation={navigation}
                      className="mt-1 block text-sm font-normal tracking-wide text-gray-200 hover:text-white"
                      data={{
                        button: {
                          url: _.get(subItem, 'fields.nav.url') ? _.get(subItem, 'fields.nav.url') : subItem.slug,
                          text: subItem.name,
                          target: _.get(item, 'fields.nav.target'),
                        },
                        buttonPageLink: _.get(subItem, 'fields.pageLink'),
                      }}
                      key={subItem.name}
                    />
                  ))
                }
              </li>
            )
          }
        })
      }
    </ul>
  )
} 

const Logos = ({ general, logos }) => {
  return (
    <div className="mt-7">
      {
        (logos && logos.length > 0) && (
          <div className="grid gap-y-8 md:flex">
            {
              logos?.map(image => (
                <Link href={_.get(image, 'fields.url')} key={image.id} className="mx-auto" target="_blank">
                  <Image className="h-20 md:h-32 w-auto opacity-70" src={_.get(image, 'fields.image.imageUrl')} alt="RJH Consulting" width={1000} height={1000}/>
                </Link>
              ))
            }
          </div>
        )
      }

      <p className="mt-5 flex items-center justify-center space-x-1 text-center text-sm text-gray-200">
        <span className="inline-block"> ©{new Date().getFullYear()} RJH Consulting | All rights reserved.</span>
        <span className="leading-0 inline-block">
          <a className="" href="https://www.modiphy.com/" target="_blank" rel="noopener noreferrer" title={`MODIPHY® DESIGN |  RJH Consulting`}>
            <svg className="h-6 w-6 fill-current" version="1.1" id="Foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 74.3 74.3" role="img">
              <title id="modiphy-logo-title">MODIPHY® DESIGN | RJH Consulting</title>
              <path
                className="path"
                d="M74.3,28.2c0-4.6-8.3-8.5-19.5-9.6c3.7-6.2,4.8-11.6,2.3-14c-3.3-3.3-11.9-0.2-20.6,7C34.7,4.6,31.7,0,28.2,0
    c-4.6,0-8.5,8.3-9.6,19.5c-6.2-3.7-11.6-4.8-14-2.3c-3.3,3.3-0.2,11.9,7,20.6C4.6,39.5,0,42.6,0,46c0,4.6,8.3,8.5,19.5,9.6
    c-3.7,6.2-4.8,11.6-2.3,14c3.3,3.3,11.9,0.2,20.6-7c1.8,7,4.8,11.6,8.3,11.6c4.6,0,8.5-8.3,9.6-19.5c6.2,3.7,11.6,4.8,14,2.3
    c3.3-3.3,0.2-11.9-7-20.6C69.7,34.7,74.3,31.7,74.3,28.2z M61.1,45.5c-3.9,3.9-14.1,0.1-24-8.4c2,2.9,4.4,5.8,7.3,8.7
    c3.5,3.5,7.1,6.3,10.5,8.5C53,57.9,50.7,60,48.1,60c-5.5,0-10.1-9.9-11-22.9c-0.6,3.4-1,7.3-1,11.3c0,4.9,0.5,9.5,1.4,13.4
    c-3.9,1.2-7,1-8.8-0.8c-3.9-3.9-0.1-14.1,8.4-24c-2.9,2-5.8,4.4-8.7,7.3c-3.5,3.5-6.4,7.1-8.5,10.5c-3.6-1.9-5.7-4.2-5.7-6.8
    c0-5.5,9.9-10.1,22.9-11c-3.4-0.6-7.2-1-11.3-1c-4.9,0-9.5,0.5-13.4,1.4c-1.2-3.9-1-7,0.8-8.9c3.9-3.9,14.1-0.1,24,8.4
    c-2-2.9-4.4-5.8-7.3-8.7c-3.5-3.5-7.1-6.4-10.5-8.5c1.9-3.6,4.2-5.7,6.8-5.7c5.5,0,10.1,9.9,11,22.9c0.6-3.4,1-7.3,1-11.3
    c0-4.9-0.5-9.5-1.4-13.4c3.9-1.2,7-1,8.9,0.8c3.9,3.9,0.1,14.1-8.4,24c2.9-2,5.8-4.4,8.7-7.3c3.5-3.5,6.4-7.1,8.5-10.5
    c3.6,1.9,5.7,4.2,5.7,6.8c0,5.5-9.9,10.1-22.9,11c3.4,0.6,7.3,1,11.3,1c4.9,0,9.5-0.5,13.4-1.4C63.1,40.6,62.9,43.7,61.1,45.5z"
              ></path>
            </svg>
          </a>
        </span>
      </p>
    </div>
  )
}

const SocialMedia = ({ socialMedia }) => {
  return (
    <div className="mt-8 flex justify-center space-x-5">
      {
        socialMedia?.map((item, i) => {
          const ComponentType = SocialPlatform[capitalizeFirstLetter(_.get(item, 'fields.platform'))]

          if (ComponentType)
            return (
              <ComponentType data={item} key={i} className="text-gray-400 hover:text-gray-300"/>
            )
        })
      }
    </div>
  )
}

const LegalNavigationLink = ({ legalNavigation }) => {
  return (
    <div className="mt-4 grid md:flex justify-center gap-4 md:space-x-4">
      {
        legalNavigation?.map(item => (
          <a className="text-sm text-gray-400 hover:underline hover:text-gray-300" href={`/${item.slug}`} key={item.id}>
            {item.name}
          </a>
        ))
      }
    </div>
  )
}