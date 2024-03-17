/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash'
import moment from 'moment'
import Link from 'next/link'
// function
import { getGeneralInfo } from '@/function/page'
import { generateStaticNews, checkNews, nextAndPrevNews } from '@/function/navigation'
// components
import { DefaultHero } from '@/components/sections'
import { notFound } from 'next/navigation'
import { Container, Section } from '@/app/layouts'
import { ImageHolder } from '@/app/components/shared'

export async function generateMetadata({ params }) {
  const newsDetails = await checkNews(params.slug)

  const general = await getGeneralInfo()
  const metaTitle = _.get(newsDetails, 'fields.metaTitle') ? `${_.get(newsDetails, 'fields.metaTitle')}  - ${_.get(general, 'defaultMetaTitle')}` : `${_.get(newsDetails, 'name')} - ${_.get(general, 'defaultMetaTitle')}`

  return {
    title: metaTitle,
    description: _.get(newsDetails, 'fields.metaDescription'),
    openGraph: {
      title: metaTitle,
      description: _.get(newsDetails, 'fields.metaDescription'),
      images: [`${_.get(newsDetails, 'fields.ogImage.imageUrl')}`],
      url: `${_.get(general, 'url')}${_.get(newsDetails, 'slug')}`,
      site_name: _.get(general, 'organizationName')
    },
    alternates: {
      canonical: `${_.get(general, 'url')}${_.get(newsDetails, 'slug')}`,
    },
  };
}

export default async function Blog({ params }) {
  const newsDetails = await checkNews(params.slug)

  if (!newsDetails) {
    notFound()
  }

  const nextAndPrev = await nextAndPrevNews(params.slug)
  
  return (
    <>
      <DefaultHero
        data={{
          name: _.get(newsDetails, 'name')
        }}
      />

      <Section className="relative" bg="transparent">
        <Container  className="relative mx-auto" width="max-w-screen-xl" margin="section">
          <div className="max-w-4xl mx-auto">
            <ImageHolder
              image={_.get(newsDetails, 'fields.image')} 
              className={{
                figure: "aspect-w-3 aspect-h-2",
                image: "object-cover w-full h-full rounded-xl shadow-xl"
              }}
            />
          </div>
          
          <div className="max-w-prose mx-auto mt-6">
            {
              _.get(newsDetails, 'fields.date') && (
                <time dateTime={_.get(newsDetails, 'fields.date')} className="text-gray-500 mt-8">
                  {moment(_.get(newsDetails, 'fields.date')).format('LL')}
                </time>
              )
            }

            <div className="mx-auto mt-6 prose prose-lg" dangerouslySetInnerHTML={{__html: _.get(newsDetails, 'fields.body')}}/>

            <div className="relative z-1 flex space-x-4">
              {
                nextAndPrev.prevIndex && (
                  <Link href={`/resources/rjh-in-the-news/${nextAndPrev.prevIndex}`} className="mt-8 button button inline-flex border-white bg-secondary-600 text-gray-900 hover:bg-secondary-700">Previous</Link>
                )
              }

              {
                nextAndPrev.nextIndex && (
                  <Link href={`/resources/rjh-in-the-news/${nextAndPrev.nextIndex}`} className="mt-8 button button inline-flex border-white bg-secondary-600 text-gray-900 hover:bg-secondary-700">Next</Link>
                )
              }
              
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export async function generateStaticParams() {
  return await generateStaticNews()
}
