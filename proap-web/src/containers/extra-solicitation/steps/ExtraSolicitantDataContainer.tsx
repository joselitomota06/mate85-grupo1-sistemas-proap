import React from 'react';
import { Field, useFormikContext } from 'formik';
import { Grid } from '@mui/material';

import { StyledTextField } from '../../solicitation/SolicitationFormContainer.style';
import { ExtraRequest } from '../../../store/slices/assistance-request-slice/assistanceRequestSlice';

export default function ExtraSolicitantDataContainer() {
  const { errors, touched } = useFormikContext<ExtraRequest>();

  return (
    <Grid container direction="column" paddingTop={2} paddingBottom={2}>
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
        label="Nome"
        name="nomeSolicitante"
        error={Boolean(touched.nomeSolicitante && errors.nomeSolicitante)}
        helperText={touched.nomeSolicitante && errors.nomeSolicitante}
        required
        style={{ padding: 'none' }}
      />
      <Field
        as={StyledTextField}
        label="E-mail"
        name="emailSolicitacao"
        error={Boolean(touched.emailSolicitacao && errors.emailSolicitacao)}
        helperText={touched.emailSolicitacao && errors.emailSolicitacao}
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
