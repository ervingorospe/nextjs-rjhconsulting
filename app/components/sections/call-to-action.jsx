/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import _ from 'lodash'
// layouts
import { Section, Container } from '@/app/layouts'
// component
import { ButtonLink } from '@/components/layouts'
import { Body } from '@/components/shared'

const defaults = {
  textAlign: 'text-center',
  width: 'max-w-screen-xl',
  bgColor: 'transparent',
  title: 'call-to-action',
  subtitle: 'call-to-action-subtitle',
  bodySize: 'prose',
  extraBodySize: 'prose',
  buttonStyle: 'default',
  buttonStyle2: 'default'
}

export function CallToAction({ data = {}, navigation }) {
  const { fields } = data
  const bg = _.get(fields, 'backgroundColorClass') === 'default' || !_.get(fields, 'backgroundColorClass') ? defaults.bgColor : _.get(fields, 'backgroundColorClass')
  const width = _.get(fields, 'containerWidth') === 'default' || !_.get(fields, 'containerWidth') ? defaults.width : _.get(fields, 'containerWidth')
  const bodySize = _.get(fields, 'bodySize') === 'default' ? defaults.bodySize : _.get(fields, 'bodySize') 

  let title = defaults.title
  let subtitle = defaults.subtitle

  if (_.get(fields, 'titlesInverted') === 'inverted') {
    title = defaults.subtitle
    subtitle = defaults.title
  }

  return (
    <Section className="relative overflow-hidden" bg={bg}>
      <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-primary-700">
        <svg className="mx-auto -mt-6 md:-mt-10 fill-primary-600 h-8 sm:h-10 md:h-14 xl:h-16" xmlns="http://www.w3.org/2000/svg" id="Layer_2" data-name="Layer 2" viewBox="0 0 830.96 29.76">
          <g id="Logos">
            <g>
              <polygon points="807.3 29.76 88.51 29.76 112.16 0 830.96 0 807.3 29.76"/>
              <polygon points="65.62 29.76 27.44 29.76 51.1 0 89.27 0 65.62 29.76"/>
              <polygon points="10.11 29.76 0 29.76 23.66 0 33.77 0 10.11 29.76"/>
            </g>
          </g>
        </svg>
      </div>

      <Container width={width} margin="section" className="relative z-1">
        <div className="relative isolate overflow-hidden bg-primary-600 px-6 py-14 text-center shadow-2xl rounded-3xl sm:px-8">
          <div className="absolute inset-0 pattern-secondary"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600"></div>

          <div className="relative z-1">
            <h2 className="mx-auto max-w-full font-heading text-3xl font-bold text-white md:text-4xl">{_.get(fields, 'title')}</h2>
            {/* body */}
            <Body
              body={_.get(fields, 'body')}
              size={bodySize}
              className={`${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')} mx-auto mt-6 prose prose-lg md:prose-xl leading-8 text-gray-200`}
            />

            {
              (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  {
                    _.get(fields, 'button') && (
                      <ButtonLink
                        data={{
                          button: {
                            ..._.get(fields, 'button'),
                          },
                          buttonPageLink: _.get(fields, 'buttonPageLink')
                        }}
                        className="button button-base inline-flex w-full border-2 border-white bg-transparent text-center text-white hover:border-white hover:bg-white hover:text-primary-700 md:w-auto"
                        navigation={navigation}
                      />
                    )
                  }

                  {
                    _.get(fields, 'button-2') && (
                      <ButtonLink
                        data={{
                          button: {
                            ..._.get(fields, 'button-2'),
                          },
                          buttonPageLink: _.get(fields, 'buttonPageLink-2')
                        }}
                        className="button button-base inline-flex w-full border-2 border-white bg-transparent text-center text-white hover:border-white hover:bg-white hover:text-primary-700 md:w-auto"
                        navigation={navigation}
                      />
                    )
                  }
                </div>
              )
            }
          </div>
        </div>
      </Container>
    </Section>
  )
}
