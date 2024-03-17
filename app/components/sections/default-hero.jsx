import React from 'react'
// layouts
import { Section, Container } from "@/app/layouts"

export async function DefaultHero({ data }) {
  return (
    <Section className="relative w-full overflow-hidden" bg="primary-500">
      <div className="hero-pattern absolute inset-0"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700"></div>
      
      <div className="md:h-22 h-20 lg:h-24 xl:h-28"></div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden"></div>
      <div className="relative"></div>

      <Container className="relative" width="max-w-screen-2xl" margin="hero">
        <div className="text-center pb-14">
          <h1 className="font-heading text-4xl font-semibold text-white md:text-5xl xl:text-6xl">{data.name}</h1>
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
