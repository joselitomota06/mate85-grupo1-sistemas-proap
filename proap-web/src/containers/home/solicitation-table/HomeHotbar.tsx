import React from 'react'

import { Button, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { Box } from '@mui/system'

import AddIcon from '@mui/icons-material/Add'

import { HomeHotbarLink, HomeHotbarPaper } from './HomeHotbar.style'

export default function HomeHotbar() {
  return (
    <Box sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
      <Typography variant='h4' color='primary' fontWeight='bold'>
        Acesso rápido
      </Typography>
      <Grid container>
        <Grid item xs={12} lg={3} paddingTop={1} paddingBottom={2}>
          <HomeHotbarLink to='solicitation/create'>
            <Button variant='outlined' size='large' startIcon={<AddIcon />}>
              Criar solicitação
            </Button>
          </HomeHotbarLink>
        </Grid>
      </Grid>
    </Box>
  )
}
