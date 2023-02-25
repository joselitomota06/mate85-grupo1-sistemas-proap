import { Grid, Typography } from '@mui/material';
import React from 'react';
import RegisterFormContainer from '../../containers/register/RegisterFormContainer';
import { RegisterGrid, RegisterPaperContainer } from './RegisterPage.style';

export default function RegisterPage() {
  return (
    <RegisterGrid container justifyContent="center" alignItems="center">
      <Grid item xs={10} md={4}>
        <RegisterPaperContainer elevation={2}>
          <Typography
            color="primary"
            component="h1"
            variant="h4"
            fontWeight="bold"
            marginBottom="1rem"
          >
            Cadastre-se
          </Typography>
          <RegisterFormContainer />
        </RegisterPaperContainer>
      </Grid>
    </RegisterGrid>
  );
}
