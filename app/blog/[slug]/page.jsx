/* eslint-disable react/no-unescaped-entities */
import _ from 'lodash'
import moment from 'moment'
import Link from 'next/link'
// function
import { getGeneralInfo, getBlogAuthors } from '@/function/page'
import { generateStaticBlogs, checkBlog, nextAndPrevBlog } from '@/function/navigation'
// components
import { DefaultHero } from '@/components/sections'
import { notFound } from 'next/navigation'
import { Container, Section } from '@/app/layouts'
import { ImageHolder } from '@/app/components/shared'

export async function generateMetadata({ params }) {
  const blogDetails = await checkBlog(params.slug)
  const general = await getGeneralInfo()
  const metaTitle = _.get(blogDetails, 'fields.metaTitle') ? _.get(blogDetails, 'fields.metaTitle') : `${_.get(blogDetails, 'name')} - ${_.get(general, 'defaultMetaTitle')}`

  return {
    title: metaTitle,
    description: _.get(blogDetails, 'fields.metaDescription'),
    openGraph: {
      title: metaTitle,
      description: _.get(blogDetails, 'fields.metaDescription'),
      images: [`${_.get(blogDetails, 'fields.ogImage.imageUrl')}`],
      url: `${_.get(general, 'url')}${_.get(blogDetails, 'slug')}`,
      site_name: _.get(general, 'organizationName')
    },
    alternates: {
      canonical: `${_.get(general, 'url')}${_.get(blogDetails, 'slug')}`,
    },
  };
}

export default async function Blog({ params }) {
  const blogDetails = await checkBlog(params.slug)

  if (!blogDetails) {
    notFound()
  }
  
  const authors = await getBlogAuthors()
  const nextAndPrev = await nextAndPrevBlog(params.slug)

  return (
    <>
      <DefaultHero
        data={{
          name: _.get(blogDetails, 'name')
        }}
      />

      <Section className="relative" bg="transparent">
        <Container  className="relative mx-auto" width="max-w-screen-xl" margin="section">
          <div className="max-w-4xl mx-auto">
            <ImageHolder
              image={_.get(blogDetails, 'fields.image')} 
              className={{
                figure: "aspect-w-3 aspect-h-2",
                image: "object-cover w-full h-full rounded-xl shadow-xl"
              }}
            />
          </div>
          
          <div className="max-w-prose mx-auto mt-6">
            {
              _.get(blogDetails, 'fields.date') && (
                <time dateTime={_.get(blogDetails, 'fields.date')} className="text-gray-500 mt-8">
                  {moment(_.get(blogDetails, 'fields.date')).format('LL')}
                </time>
              )
            }

            {
              (_.get(blogDetails, 'fields.authors') && _.get(blogDetails, 'fields.authors').length > 0) && (
                _.get(blogDetails, 'fields.authors')?.map(item => {
                  const author = _.find(authors, data => data.id === item)

                  return (
                    <div className="mt-1" key={item.id}>
                      <div className="flex items-center gap-x-4">
                        {
                          _.get(author, 'fields.image') && (
                            <ImageHolder
                              image={_.get(author, 'fields.image')} 
                              className={{
                                figure: "",
                                image: "h-10 w-10 rounded-full bg-gray-50"
                              }}
                            />
                          )
                        }

                        {
                          _.get(author, 'name') && (
                            <div className="text-sm leading-6">
                              <p className="font-semibold text-gray-900">
                                <span className="absolute inset-0" />
                                By: {_.get(author, 'name')}
                              </p>
                            </div>
                          )
                        }
                        
                      </div>
                    </div>
                  )
                })
              )
            }

            {
              _.get(blogDetails, 'fields.shortDescription') && (
                <div className="relative mx-auto mt-6 prose prose-lg" dangerouslySetInnerHTML={{__html: _.get(blogDetails, 'fields.shortDescription')}}/>
              )
            }

            <div className="relative mx-auto mt-6 prose prose-lg" dangerouslySetInnerHTML={{__html: _.get(blogDetails, 'fields.body')}}/>

            <div className="relative z-1 flex space-x-4">
              {
                nextAndPrev.prevIndex && (
                  <Link href={`/blog/${nextAndPrev.prevIndex}`} className="mt-8 button button inline-flex border-white bg-secondary-600 text-gray-900 hover:bg-secondary-700">Previous</Link>
                )
              }

              {
                nextAndPrev.nextIndex && (
                  <Link href={`/blog/${nextAndPrev.nextIndex}`} className="mt-8 button button inline-flex border-white bg-secondary-600 text-gray-900 hover:bg-secondary-700">Next</Link>
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
  return await generateStaticBlogs()
}
