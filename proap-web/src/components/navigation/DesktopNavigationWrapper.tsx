import {
  AppBar,
  Avatar,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

import { PropsWithChildren, useCallback } from 'react'
import { NavLink } from 'react-router-dom'

import {
  DesktopNavigationChildrenInner,
  DesktopNavigationChildrenWrapper,
  DesktopNavigationContainer,
  DesktopNavigationListWrapper,
} from './DesktopNavigationWrapper.style'

import { NavigationItem } from './NavigationWrapper'
import { useAppDispatch } from '../../store'
import { logout } from '../../store/slices/auth-slice/authSlice'

const DRAWER_WIDTH = 240

interface DesktopNavigationWrapperProps extends PropsWithChildren {
  items: NavigationItem[]
}

export default function DesktopNavigationWrapper({
  items,
  children,
}: DesktopNavigationWrapperProps) {
  const dispatch = useAppDispatch()

  const handleClickExit = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  return (
    <DesktopNavigationContainer>
      <DesktopNavigationListWrapper width={DRAWER_WIDTH}>
        <Typography
          color='primary'
          variant='h4'
          fontWeight='bold'
          padding={1}
          paddingTop={2}
          paddingLeft={2}
        >
          Proap
        </Typography>
        <List>
          {items.map(({ label, icon, link }) => (
            <ListItem key={label}>
              <ListItemButton component={NavLink} to={link}>
                {icon}
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DesktopNavigationListWrapper>
      <DesktopNavigationChildrenWrapper navigationWidth={DRAWER_WIDTH}>
        <Grid container justifyContent='end'>
          <IconButton
            size='large'
            edge='start'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={handleClickExit}
          >
            <LogoutIcon />
          </IconButton>
        </Grid>
        <Divider />
        <DesktopNavigationChildrenInner>
          {children}
        </DesktopNavigationChildrenInner>
      </DesktopNavigationChildrenWrapper>
    </DesktopNavigationContainer>
  )
}
