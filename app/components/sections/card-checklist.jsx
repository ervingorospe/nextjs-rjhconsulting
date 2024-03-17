/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
import Image from 'next/image'
// motion
import { fadeInFromBottom, fadeInFromLeft } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body } from '@/components/shared'
// api
import { getCollection } from '@/api/collection'

const defaults = {
  textAlign: 'text-left',
  width: 'max-w-screen-2xl',
  bgColor: 'transparent',
  title: {
    size: 'default',
    style: 'default-inverted'
  },
  subtitle: {
    size: 'text-base',
    style: 'default-subtitle-inverted'
  },
  bodySize: 'default',
  extraBodySize: 'default',
  buttonStyle: 'button-primary',
  buttonStyle2: 'default'
}

export async function CardChecklist({ data, sectionCount }) {
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
    <Section className="relative" bg={bg}>
      <Container className="relative z-1 mx-auto" width={width} margin="section">
        <div className="mx-auto grid p-4 max-w-3xl grid-cols-1 gap-x-8 gap-y-8 lg:gap-y-16 rounded-lg bg-primary-600 sm:gap-y-20 md:p-12 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <Motion>
            {/* title */}
            <MotionVariant variants={fadeInFromLeft}>
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
            <MotionVariant variants={fadeInFromLeft}>
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
                className={`mt-6 ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')} text-gray-300`}
              />
            </MotionVariant>

            {/* extra body */}
            <MotionVariant variants={fadeInFromBottom}>
              <Body
                body={_.get(fields, 'extraBody')}
                size={extraBodySize}
                className={`mt-1 ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')}`}
              />
            </MotionVariant>
          </Motion>

          {
            subCollection.length > 0 && (
              <Motion className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-sm md:text-base leading-7 text-gray-600 lg:grid-cols-2 xl:grid-cols-3">
                {
                  subCollection?.map(item => <CheckList item={item} key={item.id}/>)
                }
              </Motion>
            )
          }
          
        </div>
      </Container>
    </Section>
  )
}

const CheckList = ({ item }) => {
  return (
    <MotionVariant variants={fadeInFromBottom} className="relative pl-9">
      <div className="font-normal text-gray-200">
        <Image
          src={_.get(item, 'fields.icon.imageUrl')}
          alt="RJH Consulting"
          width={500}
          height={500}
          className="absolute left-0 top-1 h-5 w-5"
        />
        { _.get(item, 'fields.title') }
      </div>
    </MotionVariant>
  )
}
