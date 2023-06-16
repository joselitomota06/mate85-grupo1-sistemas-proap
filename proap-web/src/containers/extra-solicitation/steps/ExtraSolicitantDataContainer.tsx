import React from 'react';
import { Field, useFormikContext } from 'formik';
import { Grid } from '@mui/material';

import { StyledTextField } from '../../solicitation/SolicitationFormContainer.style';
import { ExtraRequest } from '../../../store/slices/assistance-request-slice/assistanceRequestSlice';
import { useAuth } from '../../../hooks';

export default function ExtraSolicitantDataContainer() {
  const { errors, touched } = useFormikContext<ExtraRequest>();

  const { name, email } = useAuth();

  return (
    <Grid container direction="column" paddingTop={2} paddingBottom={2}>
      <StyledTextField 
        label="Solicitante" 
        value={name} 
        disabled 
      />
      <StyledTextField
        label="E-mail"
        value={email}
        disabled
      />
      <Field
        as={StyledTextField}
        label="Solicitação"
        name="titulo"
        error={Boolean(touched.titulo && errors.titulo)}
        helperText={touched.titulo && errors.titulo}
        required
        style={{ padding: 'none' }}
      />
      <Field
        as={StyledTextField}
        label="Justificativa"
        name="justificativa"
        error={Boolean(touched.justificativa && errors.justificativa)}
        helperText={touched.justificativa && errors.justificativa}
        required
        style={{ padding: 'none' }}
        rows={5}
        multiline
      />
    </Grid>
  );
}
