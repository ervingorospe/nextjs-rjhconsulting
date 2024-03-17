import React from 'react'
import _ from 'lodash'
// motion
import { fadeInFromBottom, fadeInFromLeft } from '@/function/framer-animation'
// layouts
import { Section, Container, Motion, MotionVariant } from '@/app/layouts'
// components
import { Title, Body, Button, ImageHolder } from '@/components/shared'

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

export async function ImageRightDetachedTitleCustomBody({ data, sectionCount }) {
  const { fields } = data
  const bg = _.get(fields, 'backgroundColorClass') === 'default' || !_.get(fields, 'backgroundColorClass') ? defaults.bgColor : _.get(fields, 'backgroundColorClass')
  const width = _.get(fields, 'containerWidth') === 'default' || !_.get(fields, 'containerWidth') ? defaults.width : _.get(fields, 'containerWidth')
  const titleAlign = _.get(fields, 'textAlign') === 'default' || !_.get(fields, 'textAlign') ? defaults.textAlign : _.get(fields, 'textAlign')
  const titleTag = _.get(fields, 'titleTag') !== 'default' ? _.get(fields, 'titleTag') : sectionCount === 1 ? 'h1' : 'h2'
  const subtitleTag = _.get(fields, 'subtitleTag') !== 'default' ? _.get(fields, 'subtitleTag') : sectionCount === 1 ? 'h2' : 'h3'
  const bodySize = _.get(fields, 'bodySize') === 'default' ? defaults.bodySize : _.get(fields, 'bodySize') 
  const extraBodySize = _.get(fields, 'extraBodySize') === 'default' ? defaults.extraBodySize : _.get(fields, 'extraBodySize') 

  let title = defaults.title
  let subtitle = defaults.subtitle

  if (_.get(fields, 'titlesInverted') === 'inverted') {
    title = defaults.subtitle
    subtitle = defaults.title
  }

  return (
    <Section className="relative" bg={bg}>
      <Container width={width} margin="section" className="relative z-1">
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
            <h3 className="mt-4 prose xl:prose-lg max-w-full">{_.get(fields, 'subtitle')}</h3>
          </MotionVariant>
        </Motion>

        <div className="mt-6 items-center grid gap-10 md:mt-8 lg:mt-6 lg:grid-cols-2 xl:gap-x-12">
          {
            fields.image && (
              <Motion>
                <MotionVariant variants={fadeInFromBottom} className="relative">
                  <ImageHolder
                    image={fields.image} 
                    className={{
                      figure: "",
                      image: "h-full w-full object-center rounded-xl shadow-xl"
                    }}
                  />
                </MotionVariant>
              </Motion>
            )
          }

          <Motion className="md:row-start-1">
            {/* body */}
            <MotionVariant variants={fadeInFromBottom}>
              <Body
                body={_.get(fields, 'body')}
                size={bodySize}
                className={`${_.get(fields, 'bodyClass') ?? _.get(fields, 'bodyClass')}`}
              />
            </MotionVariant>

            {
              (_.get(fields, 'button') || _.get(fields, 'button-2')) && (
                <div className="mt-6">
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
                </div>
              )
            }
          </Motion>
        </div>

        <Motion>
          {/* extra body */}
          <MotionVariant variants={fadeInFromBottom}>
            <Body
              body={_.get(fields, 'extraBody')}
              size={extraBodySize}
              className={`mt-4 ${_.get(fields, 'extraBodyClass') ?? _.get(fields, 'extraBodyClass')} max-w-full`}
            />
          </MotionVariant>
        </Motion>
      </Container>
    </Section>
  )
}
