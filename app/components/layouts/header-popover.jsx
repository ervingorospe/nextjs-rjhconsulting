'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation';

import _ from 'lodash'
// tailwind
import { Popover } from '@headlessui/react'
// components
import { DesktopHeader, MobileHeader } from '@/components/layouts'

const theme = {
  darkTheme : {
    theme: 'dark-theme',
    logo: 'https://fluxconsole.com/files/item/1366/174739/logo-white.svg',
    style: 'fixed'
  },
  lightTheme: {
    theme: 'light-theme',
    logo: 'https://fluxconsole.com/files/item/1366/174738/logo.svg',
    style: 'sticky top-0'
  }
}

export function HeaderPopover({ navigation, general, actionButtons }) {
  return (
    <Header 
      theme={theme.darkTheme}
      navigation={navigation}
      general={general}
      actionButtons={actionButtons}
    />
  )
}

const Header = ({ theme, navigation, general, actionButtons }) => {
  const [headerTheme, setHeaderTheme] = useState(theme)

  useEffect(() => {
    setHeaderTheme(theme)

    window.onscroll = async () => {
      if(window.pageYOffset === 0) {
        setHeaderTheme(theme)
      }

      if(window.pageYOffset > 0) {
        setHeaderTheme({
          theme: 'light-theme',
          logo: 'https://fluxconsole.com/files/item/1366/174738/logo.svg'
        })
      }
    }
  }, [theme])

  return (
    <header className={`fixed w-full z-1000 bg-header-color ${headerTheme.theme} ${headerTheme.style}`}>
      <Popover>
        {({ open }) => (
          <>
            <DesktopHeader navigation={navigation} general={general} actionButtons={actionButtons} headerTheme={headerTheme}/>
            <MobileHeader navigation={navigation} general={general} actionButtons={actionButtons} headerTheme={headerTheme}/>
          </>
        )}
      </Popover>
    </header>
  )
}