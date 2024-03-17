/* eslint-disable @next/next/no-img-element */
import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom, fadeInFromLeft } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, Button, FormWufoo, CalendlyWidget } from '@/components/shared'

const defaults = {
  textAlign: 'text-center',
  width: 'max-w-screen-xl',
  bgColor: 'primary-500',
  title: {
    size: 'hero-consultation',
    style: 'hero-title'
  },
  subtitle: {
    size: 'hero-subtitle',
    style: 'hero-subtitle'
  },
  bodySize: 'hero',
  extraBodySize: 'hero',
  buttonStyle: 'hero',
  buttonStyle2: 'hero'
}

export function HeroCalendlyCenter({ data, sectionCount }) {
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
    <Section className="relative overflow-hidden" bg={bg}>
      <div className="hero-pattern absolute inset-0"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700"></div>
      
      <div className="md:h-22 h-20 lg:h-24 xl:h-28"></div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden"></div>
      <div className="relative"></div>

      <Container className="relative z-1" width={width} margin="hero">
        <div className="grid gap-8 text-center">
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
                className={`mt-6 ${_.get(fields, 'subtitleClass') ?? _.get(fields, 'subtitleClass')}`}
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
          </Motion>
          
          <CalendlyWidget data={data}/>
        </div>
      </Container>

      <div className="absolute w-1/2 bottom-0 right-0">
        <svg className="fill-primary-500 h-8 sm:h-10 md:h-14 xl:h-16" xmlns="http://www.w3.org/2000/svg" id="Layer_2" data-name="Layer 2" viewBox="0 0 830.96 29.76">
          <g id="Logos">
            <g>
              <polygon points="807.3 29.76 88.51 29.76 112.16 0 830.96 0 807.3 29.76"/>
              <polygon points="65.62 29.76 27.44 29.76 51.1 0 89.27 0 65.62 29.76"/>
              <polygon points="10.11 29.76 0 29.76 23.66 0 33.77 0 10.11 29.76"/>
            </g>
          </g>
        </svg>
      </div>
    </Section>
  )
}
