import React from 'react';
import styled from '@emotion/styled';

import {
  Grid,
  Typography,
  FormControlLabel,
  FormHelperText,
  FormControl,
  Checkbox,
  Box,
} from '@mui/material';
import { Field, useFormikContext } from 'formik';

import { InitialSolicitationFormValues } from '../SolicitationFormSchema';
import SolicitationDetailsContainer from '../SolicitationDetailsContainer';

export default function DetailsDataFormContainer() {
  const { values, errors, touched } =
    useFormikContext<InitialSolicitationFormValues>();

  return (
    <Grid
      container
      direction="row"
      paddingTop={2}
      paddingBottom={2}
      justifyContent="space-between"
    >
      <SolicitationDetailsContainer solicitation={values} />
      <Grid item md={12} xs={12}>
        <Typography variant="subtitle1" style={{ color: 'gray' }}>
          Confirmo que a solicitação é para um artigo aceito (artigos em revisão
          não serão analisados) e que as informações enviadas serão analisadas
          pelo colegiado do PGCOMP com base nas regras de financiamento
          definidas por esse colegiado e na disponiblidade de recursos
          financeiros
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'start' }}>
          <FormControl
            error={Boolean(touched.aceiteFinal && errors.aceiteFinal)}
            sx={{ display: 'flex', alignItems: 'start' }}
          >
            <Field
              as={FormControlLabel}
              control={<Checkbox />}
              label="Estou de acordo"
              name="aceiteFinal"
            />
            {touched.aceiteFinal && errors.aceiteFinal && (
              <FormHelperText>{errors.aceiteFinal}</FormHelperText>
            )}
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
}
