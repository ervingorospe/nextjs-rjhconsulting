'use client'

import React, { useState, useEffect } from 'react'
import Script from 'next/script'
// functions
import { splitWuffooForm } from '@/function/embed-codes'


export function IframeEmbed({ data }) {
  const { fields } = data
  const [iframContent, setIframContent] = useState({})

  useEffect(() => {
    if (fields.embed)
      setIframContent(splitWuffooForm(fields.embed))
  }, [fields.embed])

  return (
    <div>
      {
        fields.embed && (
          <div>
            <div dangerouslySetInnerHTML={{__html: iframContent.divElement}}/>
              
            <Script
              id="form-script"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: eval(`${iframContent.scriptCode}`),
              }}
            />
          </div>
        )
      }
    </div>
  )
}
