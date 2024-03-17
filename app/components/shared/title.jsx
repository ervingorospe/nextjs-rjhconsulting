'use client'

import React from 'react'
import clsx from 'clsx'
// component
import * as TitleComponent from '@/components/shared/title-tags'
// function
import { formatComponentName } from '@/function/formatting'

const titleAlign = {
  'default': '',
  'text-left': 'text-left',
  'text-center': 'text-center',
  'text-right': 'text-right',
  'text-justify': 'text-justify'
}

const titleSizes = {
  'default': 'text-3xl md:text-4xl',
  'default-subtitle': 'text-lg md:text-2xl',
  'default-inverted': 'text-3xl md:text-6xl',
  'default-subtitle-inverted': 'text-xl md:text-2xl',
  'hero-title': 'text-4xl md:text-5xl xl:text-6xl',
  'hero-consultation': 'ext-4xl md:text-5xl',
  'hero-subtitle': 'text-xl md:text-2xl xl:text-4xl',
  'call-to-action': 'text-4xl md:text-6xl',
  'call-to-action-subtitle': 'text-xl md:text-2xl',
  'text-xs': 'text-xs',
  'text-sm': 'text-sm',
  'text-base': 'text-base md:text-lg',
  'text-lg': 'text-lg',
  'text-xl': 'text-xl',
  'text-2xl': 'text-2xl',
  'text-3xl': 'text-3xl',
  'text-4xl': 'text-4xl',
  'text-5xl': 'text-5xl',
  'text-6xl': 'text-6xl',
  'text-7xl': 'text-7xl',
  'text-8xl': 'text-8xl',
  'text-9xl': 'text-9xl',
  'feed-inverted': 'text-3xl md:text-4xl'
}

const titleStyle = {
  'default': 'font-heading font-bold text-gray-900',
  'default-subtitle': 'font-semibold uppercase tracking-wide text-primary-600',
  'default-inverted': 'font-heading font-bold text-gray-200',
  'default-subtitle-inverted': 'font-heading font-black text-gray-300',
  'hero-title': 'font-heading font-bold text-white',
  'hero-subtitle': 'font-semibold uppercase text-gray-400',
  'call-to-action-subtitle': 'font-normal uppercase tracking-wide text-primary-300',
  'call-to-action': 'capitalize max-w-5xl font-heading text-white',
  'seo-headline': 'font-heading font-bold text-white',
  'subtitle-seo-headline': 'leading-8 text-white',
  'hero-subtitle-custom': 'font-semibold uppercase text-gray-300'
}

export function Title({ title, tag = "default", align = "default", style = "default", size = "default", className }) {
  if (title) {
    const TitleType = TitleComponent[formatComponentName(tag)];

    return (
      <div>
        <TitleType title={title} styles={clsx(titleStyle[style], titleSizes[size], titleAlign[align], className)}/>
      </div>
    )
  }
}
