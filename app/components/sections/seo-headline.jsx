/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromLeft, fadeInFromBottom } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title } from '@/components/shared'

const defaults = {
  textAlign: 'text-left',
  width: 'max-w-screen-xl',
  bgColor: 'transparent',
  title: {
    size: 'default',
    style: 'seo-headline'
  },
  subtitle: {
    size: 'text-xl',
    style: 'subtitle-seo-headline'
  },
  bodySize: 'default',
  extraBodySize: 'default',
  buttonStyle: 'button-primary',
  buttonStyle2: 'default'
}

export async function SeoHeadline({ data, sectionCount }) {
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

  return (
    <Section className="relative" bg={bg}>
      <div className="absolute inset-0 pattern-primary"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white"></div>

      <Container className="relative z-1 py-8" width={width} margin="section">
        <div className="relative isolate overflow-hidden bg-primary-600 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16 lg:text-left">
          <div className="pattern-secondary absolute inset-0"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600"></div>

          <div className="relative z-1">
            <Motion className="grid gap-8 md:gap-10 lg:grid-cols-2 lg:gap-16">
              {/* title */}
              <MotionVariant variants={fadeInFromLeft}>
                <Title
                  title={_.get(fields, 'title')}
                  tag={titleTag}
                  align={titleAlign}
                  style={title.style}
                  size={title.size}
                  className={`mx-auto ${_.get(fields, 'titleClass') ?? _.get(fields, 'titleClass')}`}
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
                  className={`mx-auto max-w-xl ${_.get(fields, 'subtitleClass') ?? _.get(fields, 'subtitleClass')}`}
                />
              </MotionVariant>
            </Motion>
          </div>
        </div>
      </Container>
    </Section>
  )
}
