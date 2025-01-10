import React from 'react';

import { Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';

import AddIcon from '@mui/icons-material/Add';

import { HomeHotbarLink } from './HomeHotbar.style';
import { useAuth } from '../../../hooks';
import useHasPermission from '../../../hooks/auth/useHasPermission';

export default function HomeHotbar() {
  const userCanViewAllRequests = useHasPermission('VIEW_ALL_REQUESTS');

  return (
    <Box sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
      <Grid container justifyContent="end" alignItems="center" spacing={2}>
        <Grid item xs={4}>
          <Typography
            variant="h4"
            color="primary"
            fontWeight="bold"
            paddingBottom={2}
          >
            {userCanViewAllRequests
              ? 'Solicitações PROAP'
              : 'Minhas solicitações PROAP'}
          </Typography>
        </Grid>
        <Grid container spacing={1} item xs={8} justifyContent="end">
          <Grid item lg={6} xl={4} paddingTop={2} paddingBottom={3}>
            <HomeHotbarLink to="solicitation/create">
              <Button
                variant="outlined"
                size="large"
                startIcon={<AddIcon />}
                fullWidth
                style={{ padding: '1rem 1rem', border: '3px solid' }}
              >
                Apoio a publicação científica
              </Button>
            </HomeHotbarLink>
          </Grid>
          <Grid item lg={6} xl={4} paddingTop={2} paddingBottom={3}>
            <HomeHotbarLink to="extra-solicitation/create">
              <Button
                variant="outlined"
                size="large"
                startIcon={<AddIcon />}
                fullWidth
                style={{ padding: '1rem 1rem', border: '3px solid' }}
              >
                Demanda Extra
              </Button>
            </HomeHotbarLink>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
