import {
  Drawer,
  Divider,
  useTheme,
  useMediaQuery,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Icon,
  ListItem,
  Toolbar,
  IconButton,
  AppBar,
} from '@mui/material'
import { Box } from '@mui/system'

import { Link } from 'react-router-dom'
import { PropsWithChildren, useState } from 'react'

interface NavigationItem {
  label: string
  link: string
}

export const NavigationWrapper = ({ children }: PropsWithChildren) => {
  const theme = useTheme()
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))

  const [isDrawerOpen, setDrawerOpen] = useState(false)

  const handleDrawerOpen = () => setDrawerOpen(true)
  const handleDrawerClose = () => setDrawerOpen(false)

  const navigationItems: NavigationItem[] = [
    {
      label: 'test',
      link: 'test',
    },
  ]

  return (
    <>
      {/* <AppBar position='fixed' open={open}> */}
      {/* <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          ></IconButton>
        </Toolbar> */}
      {/* <Drawer
          open={isDrawerOpen}
          variant={isSmall ? 'temporary' : 'permanent'}
          onClose={handleDrawerClose}
        >
          <Box
            width={theme.spacing(28)}
            height='100%'
            display='flex'
            flexDirection='column'
          >
            <Box
              width='60%'
              height={theme.spacing(12)}
              display='flex'
              alignItems='center'
              justifyContent='center'
            >
              <Typography color='primary' variant='h4' fontWeight='bold'>
                Proap
              </Typography>
            </Box>

            <Divider />

            <Box flex={1}>
              <List component='nav'>
                {navigationItems.map(({ label, link }) => (
                  <Link to={link}>
                    <ListItemButton>
                      <ListItemText primary={label} />
                    </ListItemButton>
                  </Link>
                ))}
              </List>
            </Box>
          </Box>
        </Drawer> */}
      {/* </AppBar> */}
      {children}
    </>
  )
}

export default NavigationWrapper
