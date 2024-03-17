/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
import Link from 'next/link'
// motion
import { fadeInFromBottom } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, Button, ImageHolder } from '@/components/shared'
// function
import { formatRouteName } from '@/function/formatting';
// api
import { getCollection } from '@/api/collection'

const defaults = {
  textAlign: 'text-center',
  width: 'max-w-screen-xl',
  bgColor: 'transparent',
  title: {
    size: 'hero-title',
    style: 'default'
  },
  subtitle: {
    size: 'default-subtitle',
    style: 'default-subtitle'
  },
  bodySize: 'default',
  extraBodySize: 'default',
  buttonStyle: 'button-primary',
  buttonStyle2: 'default'
}

export async function TeamCentered({ data, sectionCount }) {
  const { fields } = data
  const bg = _.get(fields, 'backgroundColorClass') === 'default' || !_.get(fields, 'backgroundColorClass') ? defaults.bgColor : _.get(fields, 'backgroundColorClass')
  const width = _.get(fields, 'containerWidth') === 'default' || !_.get(fields, 'containerWidth') ? defaults.width : _.get(fields, 'containerWidth')
  const titleAlign = _.get(fields, 'textAlign') === 'default' || !_.get(fields, 'textAlign') ? defaults.textAlign : _.get(fields, 'textAlign')
  const titleTag = _.get(fields, 'titleTag') !== 'default' ? _.get(fields, 'titleTag') : sectionCount === 1 ? 'h1' : 'h2'
  const subtitleTag = _.get(fields, 'subtitleTag') !== 'default' ? _.get(fields, 'subtitleTag') : sectionCount === 1 ? 'h2' : 'h3'
  const bodySize = _.get(fields, 'bodySize') === 'default' ? defaults.bodySize : _.get(fields, 'bodySize') 
  const extraBodySize = _.get(fields, 'extraBodySize') === 'default' ? defaults.extraBodySize : _.get(fields, 'extraBodySize') 

  let title = {...defaults.title}
  let subtitle ={...defaults.subtitle}

  if (_.get(fields, 'titlesInverted') === 'inverted') {
    title = {...defaults.subtitle}
    subtitle = {...defaults.title}
  }

  let subCollection = [];

  if (_.get(fields, 'contentCollection')) {
    const collections = await getCollection(_.get(fields, 'contentCollection'))
    subCollection = _.filter(collections[0].items, data => data.fields.active)
  }

  return (
    <Section className="relative overflow-hidden" bg={bg}>
      <Container width={width} margin="section" className="relative">
        <Motion>
          {/* title */}
          <MotionVariant variants={fadeInFromBottom}>
            <Title
              title={_.get(fields, 'title')}
              tag={titleTag}
              align={titleAlign}
              style={title.style}
              size={title.size}
              className={`${_.get(fields, 'titleClass') ?? _.get(fields, 'titleClass')}`}
            />
          </MotionVariant>
          

          {/* subtitle */}
          <MotionVariant variants={fadeInFromBottom}>
            <Title
              title={_.get(fields, 'subtitle')}
              tag={subtitleTag}
              align={titleAlign}
              style={subtitle.style}
              size={subtitle.size}
              className={`mt-1 ${_.get(fields, 'subtitleClass') ?? _.get(fields, 'subtitleClass')}`}
            />
          </MotionVariant>

          {/* body */}
          <MotionVariant variants={fadeInFromBottom}>
            <Body
              body={_.get(fields, 'body')}
              size={bodySize}
              className={`${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')}`}
            />
          </MotionVariant>

          {/* extra body */}
          <MotionVariant variants={fadeInFromBottom}>
            <Body
              body={_.get(fields, 'extraBody')}
              size={extraBodySize}
              className={`mt-4 ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')}`}
            />
          </MotionVariant>
        </Motion>

        {
          subCollection.length > 0 && (
            <Motion
              role="list"
              className="mx-auto mt-20 grid grid-cols-1 gap-x-10 gap-y-20 sm:grid-cols-2 lg:gap-x-12"
            >
              {
                subCollection?.map(item => {
                  const formatPhone = _.get(item, 'fields.contact') ? _.get(item, 'fields.contact').replace(/[^A-Z0-9]/gi, '') : ''
                  const removeChar = item.name.replace(/[^a-zA-Z0-9 ]/g, ' ')
                  const slug = `/about/team/${formatRouteName(removeChar.replace(/  +/g, ' '))}`

                  return (
                    <MotionVariant variants={fadeInFromBottom} key={item.id} className="flex flex-col gap-6 xl:flex-row">
                      <ImageHolder
                        image={_.get(item, 'fields.image')} 
                        className={{
                          figure: "aspect-[4/5] w-52 flex-none rounded-2xl object-cover",
                          image: "aspect-[4/5] w-52 flex-none rounded-2xl object-cover shadow-xl"
                        }}
                      />
                      <div className="flex-auto">
                        <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">{_.get(item, 'name')}</h3>
                        <p className="text-base leading-7 text-gray-600">{_.get(item, 'fields.profession')}</p>

                        <div className="grid mt-2">
                          {
                            formatPhone && (
                              <Link href={`tel:${formatPhone}`} className="text-sm text-gray-600 hover:text-secondary-700">{_.get(item, 'fields.contact')}</Link>
                            )
                          }
                          
                          <Link href={`mailto:${_.get(item, 'fields.email')}`} targe="_blank" className="text-sm text-gray-600 underline hover:text-secondary-700">{_.get(item, 'fields.email')}</Link>
                        </div>
                        
                        <p className="mt-2 text-sm leading-7 text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{__html: _.get(item, 'fields.shortDescription')}}/>
                        <Link href={slug} className="mt-4 button button-xs inline-flex border-white bg-secondary-600 text-gray-900 hover:bg-secondary-700">Read More</Link>
                      </div>
                    </MotionVariant>
                  )
                })
              }
            </Motion>
          )
        }
      </Container>
    </Section>
  )
}
