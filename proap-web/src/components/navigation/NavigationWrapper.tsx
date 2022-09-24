import {
  useTheme,
  Toolbar,
  IconButton,
  styled,
  Typography,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material'

import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'

import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import HomeIcon from '@mui/icons-material/Home'
import MenuIcon from '@mui/icons-material/Menu'

import { PropsWithChildren, useState } from 'react'
import { Link } from 'react-router-dom'

interface NavigationItem {
  label: string
  link: string
  icon?: React.ReactElement
}

export const NavigationWrapper = ({ children }: PropsWithChildren) => {
  const theme = useTheme()

  const drawerWidth = 240

  const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open',
  })<{
    open?: boolean
  }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    }),
  }))

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }))

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }))

  const [isDrawerOpen, setDrawerOpen] = useState(false)

  const handleDrawerOpen = () => setDrawerOpen(true)
  const handleDrawerClose = () => setDrawerOpen(false)

  const navigationItems: NavigationItem[] = [
    {
      label: 'Página Inicial',
      icon: <HomeIcon />,
      link: '/',
    },
  ]

  return (
    <>
      <AppBar position='fixed' open={isDrawerOpen}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(isDrawerOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            PROAP
          </Typography>
        </Toolbar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant='persistent'
          anchor='left'
          open={isDrawerOpen}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {navigationItems.map(({ label, icon, link }) => (
              <ListItem key={label} disablePadding>
                <ListItemButton component={Link} to={link}>
                  {icon}
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </AppBar>
      <Main open={isDrawerOpen}>
        <DrawerHeader />
        {children}
      </Main>
    </>
  )
}

export default NavigationWrapper
