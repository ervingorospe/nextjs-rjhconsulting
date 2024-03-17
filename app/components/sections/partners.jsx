/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'
import _ from 'lodash'
// motion
import { fadeInFromBottom, fadeInFromLeft } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, Button, ImageHolder } from '@/components/shared'
// api
import { getCollection } from '@/api/collection'

const defaults = {
  textAlign: 'text-left',
  width: 'max-w-screen-xl',
  bgColor: 'transparent',
  title: {
    size: 'default',
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

export async function Partners({ data, sectionCount }) {
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
        <Motion className="mx-auto lg:mx-0">
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
              className={`mt-6 ${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')}`}
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

          {
            (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
              <Motion className="mt-8 grid space-y-2 sm:space-y-0 space-x-0 sm:flex sm:space-x-4">
                {
                  _.get(fields, 'button') && (
                    <MotionVariant variants={fadeInFromBottom}>
                      <Button
                        data={{
                          button: {
                            ..._.get(fields, 'button'),
                          },
                          buttonPageLink: _.get(fields, 'buttonPageLink')
                        }}
                        styles={defaults.buttonStyle}
                        className=""
                      />
                    </MotionVariant>
                  )
                }

                {
                  _.get(fields, 'button-2') && (
                    <MotionVariant variants={fadeInFromBottom}>
                      <Button
                        data={{
                          button: {
                            ..._.get(fields, 'button-2'),
                          },
                          buttonPageLink: _.get(fields, 'buttonPageLink-2')
                        }}
                        styles={defaults.buttonStyle2}
                        className=""
                      />
                    </MotionVariant>
                  )
                }
              </Motion>
            )
          }

          {
            subCollection.length > 0 && (
              <Partner subCollection={subCollection}/>
            )
          }
        </Motion>
      </Container>
    </Section>
  )
}

const Partner = ({ subCollection }) => {
  return (
    <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-3 gap-8">
      {
        subCollection?.map(item => (
          <Link href={_.get(item, 'fields.button.url')} target={_.get(item, 'fields.button.target')} className="grid p-6 border rounded-lg group" key={item.id}>
            <ImageHolder
              image={_.get(item, 'fields.image')} 
              className={{
                figure: "",
                image: "h-14 md:h-20 w-auto"
              }}
            />

            <h2 className="mt-6 text-3xl font-heading font-bold tracking-wide text-primary-600">{_.get(item, 'name')}</h2>

            <p className="mt-2 text-gray-900 text-base prose">
              {_.get(item, 'fields.body')}
            </p>

            <p className="mt-4 text-secondary-900 text-sm mt-4">
              {_.get(item, 'fields.button.text')} <span className="transition-transform duration-500 group-hover:ml-1"aria-hidden="true">→</span>
            </p>
          </Link>
        ))
      }
    </div>
  )
}


