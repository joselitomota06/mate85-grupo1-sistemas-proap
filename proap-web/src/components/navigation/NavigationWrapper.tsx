import { PropsWithChildren } from 'react'

import { useMediaQuery, useTheme } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

import MobileNavigationWrapper from './MobileNavigationWrapper'

export interface NavigationItem {
  label: string
  link: string
  icon?: React.ReactElement
}

export const NavigationWrapper = ({ children }: PropsWithChildren) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const navigationItems: NavigationItem[] = [
    {
      label: 'Página Inicial',
      icon: <HomeIcon />,
      link: '/',
    },
  ]

  return (
    <MobileNavigationWrapper items={navigationItems}>
      {children}
    </MobileNavigationWrapper>
  )
}

export default NavigationWrapper
