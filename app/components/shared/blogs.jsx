/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import { notFound, useSearchParams } from 'next/navigation';
import Link from 'next/link'
import moment from 'moment'
import _ from 'lodash'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'
// components
import { ImageHolder } from '@/components/shared';
import { formatRouteName } from '@/function/formatting';


export function Blogs({ blogs, authors, slugPrefix = '/blog', pageSlugPrefix = '/blog' }) {
  let searchParams = useSearchParams();
  const match = searchParams.toString().match(/page=(\d+)/)
  const page = match ? (match[1] - 1) : 0
  const totalItemPerPage = 4

  const startIndex = (totalItemPerPage * page);
  const itemCount = totalItemPerPage;

  const pageBlogs = blogs.slice(startIndex, startIndex + itemCount);
  const totalPagination = Math.ceil(blogs.length / totalItemPerPage)

  if (pageBlogs.length === 0) {
    notFound()
  }

  return (
    <div className="mt-16 space-y-20 lg:mt-20 lg:space-y-20">
      {pageBlogs.map((post) => {
        const removeChar = post.name.replace(/[^a-zA-Z0-9 ]/g, ' ')
        const slug = `${slugPrefix}/${formatRouteName(removeChar.replace(/  +/g, ' '))}`

        return (
          <article key={post.name} className="relative flex flex-col gap-8 lg:flex-row">
            <Link href={slug} className="group aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-96 lg:shrink-0">
              <ImageHolder
                image={_.get(post, 'fields.image')} 
                className={{
                  figure: "relative h-full rounded-xl overflow-hidden",
                  image: "absolute inset-0 h-full w-full bg-gray-50 object-cover shadow-xl group-hover:scale-110 transition ease-in-out duration-300"
                }}
              />
            </Link>
            
            <div className="py-4">
              {
                _.get(post, 'fields.date') && (
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={_.get(post, 'fields.date')} className="text-gray-500">
                      {moment(_.get(post, 'fields.date')).format('LL')}
                    </time>
                  </div>
                )
              }
              
              <div className="group relative">
                <Link href={slug}>
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 hover:text-gray-600 hover:underline">
                    {_.get(post, 'name')}
                  </h3>
                </Link>
                
                {
                  _.get(post, 'fields.shortDescription') ?
                    <p className="mt-5 max-w-2xl text-sm leading-6 text-gray-600 line-clamp-6" dangerouslySetInnerHTML={{__html: _.get(post, 'fields.shortDescription')}}/>
                  :
                  <p className="mt-5 max-w-2xl text-sm leading-6 text-gray-600 line-clamp-6" dangerouslySetInnerHTML={{__html: _.get(post, 'fields.body')}}/>
                }
                

                <Link href={slug} className="mt-4 button button-xs inline-flex border-white bg-secondary-600 text-gray-900 hover:bg-secondary-700">Read More</Link>
              </div>
              {
                (_.get(post, 'fields.authors') && _.get(post, 'fields.authors').length > 0) && (
                  _.get(post, 'fields.authors')?.map(item => {
                    const author = _.find(authors, data => data.id === item)

                    return (
                      <div className="mt-6 flex border-t border-gray-900/5 pt-2" key={author.name}>
                        <div className="relative flex items-center gap-x-4">
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
            </div>
          </article>
        )
      })}

      {
        totalPagination > 1 && (
          <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
            <div className="-mt-px flex w-0 flex-1">
              {
                (page === 0) ?
                (
                  <div
                    className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-primary-200"
                  >
                    <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-primary-200" aria-hidden="true" />
                    Previous
                  </div>
                )
                :
                (
                  <Link
                    href={`${pageSlugPrefix}?page=${page}`}
                    className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-primary-500 hover:border-primary-700 hover:text-primary-700"
                  >
                    <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-primary-700" aria-hidden="true" />
                    Previous
                  </Link>
                )
              }
              
            </div>
            <div className="hidden md:-mt-px md:flex">
              {
                [...Array(totalPagination)]?.map((_, index) => {
                  const pageClass = index === page ? "border-secondary-700 text-secondary-700" : "border-transparent text-primary-500 hover:border-primary-700 hover:text-primary-700"
                  const pageSlug = index === page ? "#" : `${pageSlugPrefix}?page=${index + 1}`

                  return (
                    <Link
                      key={index}
                      href={pageSlug}
                      className={`inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium ${pageClass}`}
                    >
                      {index + 1}
                    </Link>
                  )
                })
              }
            </div>
            <div className="-mt-px flex w-0 flex-1 justify-end">
              {
                ((page + 1) === totalPagination) ? 
                (
                  <div
                    className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-primary-200"
                  >
                    Next
                    <ArrowLongRightIcon className="ml-3 h-5 w-5 text-primary-200" aria-hidden="true" />
                  </div>
                )
                :
                (
                  <Link
                    href={`${pageSlugPrefix}?page=${page + 2}`}
                    className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-primary-500 hover:border-primary-700 hover:text-primary-700"
                  >
                    Next
                    <ArrowLongRightIcon className="ml-3 h-5 w-5 text-primary-700" aria-hidden="true" />
                  </Link>
                )
              }
            </div>
          </nav>
        )
      }
    </div>
  )
}


