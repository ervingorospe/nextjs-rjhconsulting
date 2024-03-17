/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash'
import Link from 'next/link'
// function
import { getGeneralInfo } from '@/function/page'
import { generateStaticProfiles, checkProfile } from '@/function/navigation'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
// layouts
import { Container, Section, Motion, MotionVariant } from '@/app/layouts'
// components
import { DefaultHero } from '@/components/sections'
import { notFound } from 'next/navigation'

import { ImageHolder } from '@/app/components/shared'

export async function generateMetadata({ params }) {
  const profileDetails = await checkProfile(params.slug)

  const general = await getGeneralInfo()
  const metaTitle = _.get(profileDetails, 'fields.metaTitle') ? _.get(profileDetails, 'fields.metaTitle') : `${_.get(profileDetails, 'name')} - ${_.get(general, 'defaultMetaTitle')}`

  return {
    title: metaTitle,
    description: _.get(profileDetails, 'fields.metaDescription'),
    openGraph: {
      title: metaTitle,
      description: _.get(profileDetails, 'fields.metaDescription'),
      images: [`${_.get(profileDetails, 'fields.ogImage.imageUrl')}`],
      url: `${_.get(general, 'url')}${_.get(profileDetails, 'slug')}`,
      site_name: _.get(general, 'organizationName')
    },
    alternates: {
      canonical: `${_.get(general, 'url')}${_.get(profileDetails, 'slug')}`,
    },
  };
}

export default async function Profile({ params }) {
  const profileDetails = await checkProfile(params.slug)
  
  if (!profileDetails) {
    notFound()
  }

  const formatPhone = _.get(profileDetails, 'fields.contact') ? _.get(profileDetails, 'fields.contact').replace(/[^A-Z0-9]/gi, '') : ''
  
  return (
    <>
      <DefaultHero
        data={{
          name: `${_.get(profileDetails, 'name')}`
        }}
      />

      <Section className="relative" bg="transparent">
        <Container  className="relative mx-auto" width="max-w-screen-xl" margin="section">
          <Motion className="grid lg:grid-cols-2 items-center">
            <MotionVariant variants={fadeInFromBottom}>
              <ImageHolder
                image={_.get(profileDetails, 'fields.image')} 
                className={{
                  figure: "w-auto h-auto",
                  image: "rounded-xl shadow-xl"
                }}
              />
            </MotionVariant>

            <MotionVariant variants={fadeInFromBottom}>
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-gray-900">{_.get(profileDetails, 'name')}</h3>
              <p className="mt-2 text-lg md:text-xl leading-7 font-semibold uppercase tracking-wide text-primary-600">{_.get(profileDetails, 'fields.profession')}</p>

              <div className="grid mt-6">
                {
                  formatPhone && (
                    <Link href={`tel:${formatPhone}`} className="text-base text-gray-600">{_.get(profileDetails, 'fields.contact')}</Link>
                  )
                }
                
                <Link href={`mailto:${_.get(profileDetails, 'fields.email')}`} targe="_blank" className="text-base text-gray-600 underline">{_.get(profileDetails, 'fields.email')}</Link>
              </div>
              
              <p className="mt-6 prose xl:prose-lg text-gray-600" dangerouslySetInnerHTML={{__html: _.get(profileDetails, 'fields.shortDescription')}}/>
            </MotionVariant>
          </Motion>
          
          {
            _.get(profileDetails, 'fields.description') && (
              <Motion>
                <MotionVariant variants={fadeInFromBottom}>
                  <p className="mt-6 prose xl:prose-lg text-gray-600 max-w-full" dangerouslySetInnerHTML={{__html: _.get(profileDetails, 'fields.description')}}/>
                </MotionVariant>
              </Motion>
            )
          }
          
        </Container>
      </Section>
    </>
  )
}

export async function generateStaticParams() {
  return await generateStaticProfiles()
}
