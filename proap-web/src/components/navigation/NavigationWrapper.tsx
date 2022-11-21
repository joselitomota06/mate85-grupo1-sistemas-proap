import { PropsWithChildren } from 'react'

import { useMediaQuery, useTheme } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'

import MobileNavigationWrapper from './MobileNavigationWrapper'
import { AddRounded } from '@mui/icons-material'
import { useAuth } from '../../hooks'

export interface NavigationItem {
  label: string
  link: string
  visible: boolean
  icon?: React.ReactElement
}

export const NavigationWrapper = ({ children }: PropsWithChildren) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { isAdmin } = useAuth()

  const navigationItems: NavigationItem[] = [
    {
      label: 'Página Inicial',
      icon: <HomeIcon />,
      link: '/',
      visible: true
    },
    {
      label: 'Usuários cadastrados',
      icon: <AddRounded />,
      link: '/users',
      visible: isAdmin
    },
  ]

  return (
    <MobileNavigationWrapper items={navigationItems}>
      {children}
    </MobileNavigationWrapper>
  )
}

export default NavigationWrapper
