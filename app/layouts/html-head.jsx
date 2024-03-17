/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-sync-scripts */
import React from 'react'
import _ from 'lodash'
// function
import { getGeneralInfo, getSettings } from '@/function/page'
import { getScriptUrl, getFbScript, rocketScript } from '@/function/embed-codes'
import { checkIfDisabled } from '@/function/disabled-script'

export async function HtmlHead() {
  const settings = _.first(await getSettings())
  const general = await getGeneralInfo()
  const trackingScript = getScriptUrl(_.get(settings, 'fields.headScripts'))
  const fbScript = getFbScript(_.get(settings, 'fields.headScripts'))
  const rocketLazyLoadScript = rocketScript(_.get(settings, 'fields.headScripts'))

  return (
    <head>
      <meta name="google-site-verification" content="8dKP2h4UHoDKuGEiZ9Y93sKwhp5huTiQb0eYK9i9gFs" />
      <meta property="og:locale" content="en_US"/>
      <meta property="og:type" content="website"/>
      <meta name="msapplication-TileColor" content="#ffffff"/>
      <meta name="theme-color" content="#ffffff"></meta>
      <meta name={fbScript.metaName} content={fbScript.metaContent} />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true"/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
      <link rel="manifest" href="/site.webmanifest"/>
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>

      <script type="text/javascript" src={trackingScript}/>
      <script type="text/javascript" src={`https://www.googletagmanager.com/gtag/js?id=${_.get(general, 'analyticsId')}`} async/>
      <script type="text/javascript" src={`https://www.googletagmanager.com/gtag/js?id=${_.get(settings, 'fields.googleAdwords')}`} async/>
      <script data-rocketlazyloadscript={rocketLazyLoadScript} async/>
      <script src="https://cdn.jsdelivr.net/gh/modiphy/disabled@latest/dist/index.js"></script>

      <script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${_.get(general, 'analyticsId')}', {
              page_path: window.location.pathname,
            });
            gtag('config', '${_.get(settings, 'fields.googleAdwords')}', {
              page_path: window.location.pathname,
            });
            gtag('config', '${_.get(settings, 'fields.analyticsId')}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `${_.get(settings, 'fields.headScripts')}`,
        }}
      />

      <noscript><img height="1" width="1" src={fbScript.fbImgSrc} alt="RJH Consulting"/></noscript>
    </head>
  )
}
