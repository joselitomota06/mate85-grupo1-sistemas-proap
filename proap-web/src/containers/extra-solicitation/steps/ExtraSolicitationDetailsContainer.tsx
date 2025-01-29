import React from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Typography,
} from '@mui/material';
import { Field, useFormikContext } from 'formik';

import ExtraSolicitationDetailsContainer from '../ExtraSolicitationDetailsContainer';
import { ExtraSolicitationFormValues } from '../schema';

export default function ExtraSolicitationDetailsFormContainer() {
  const { values, touched, errors } =
    useFormikContext<ExtraSolicitationFormValues>();

  return (
    <Grid container>
      <ExtraSolicitationDetailsContainer solicitation={values} />
      <Grid item md={12} xs={12}>
        <Typography variant="subtitle1" style={{ color: 'gray' }}>
          Confirmo envio do formulário e que as informações enviadas serão
          analisadas pelo colegiado do PGCOMP com base nas regras de
          financiamento definidas por esse colegiado e na disponiblidade de
          recursos financeiros
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
