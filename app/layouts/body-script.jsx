import React from 'react'
import _ from 'lodash'
import Script from 'next/script'
// function
import { getSettings } from '@/function/page'

export async function BodyScript() {
  const settings = _.first(await getSettings())

  if (_.get(settings, 'fields.bodyScripts')) {
    const scriptEmbedCode = _.get(settings, 'fields.bodyScripts')
    const srcRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
    const matches  = [...scriptEmbedCode.matchAll(srcRegex)];
    let bodyScript;

    matches.forEach((match, index) => {
      const scriptContent = match[1].trim();
      bodyScript = scriptContent
    });

    return (
      <Script
        id="body-script"
        dangerouslySetInnerHTML={{
          __html: `${bodyScript}`,
        }}
      />
    )
  }
}
