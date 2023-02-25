import React from 'react';

import { SolicitationFormValues } from '../SolicitationFormSchema';
import { Field, useFormikContext } from 'formik';
import { Grid, TextField } from '@mui/material';
import { StyledTextField } from '../SolicitationFormContainer.style';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

export default function ReviewDataFormContainer() {
  const { errors, touched } = useFormikContext<SolicitationFormValues>();

  return (
    <Grid container direction="column" paddingTop={2} paddingBottom={2}>
      <Field
        as={RadioGroup}
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="situacao"
        row
      >
        <FormControlLabel value="2" control={<Radio />} label="Reprovado" />
        <FormControlLabel value="1" control={<Radio />} label="Aprovado" />
      </Field>

      <Field
        as={StyledTextField}
        style={{ maxWidth: '170px' }}
        label="Data de aprovação da solicitação"
        name="dataAprovacao"
        type="date"
        error={Boolean(touched.dataAprovacao && errors.dataAprovacao)}
        helperText={touched.dataAprovacao && errors.dataAprovacao}
      />

      <Field
        as={StyledTextField}
        style={{ maxWidth: '170px' }}
        label="Número da ATA"
        name="numeroAta"
        type="number"
        error={Boolean(touched.numeroAta && errors.numeroAta)}
        helperText={touched.numeroAta && errors.numeroAta}
      />
      <Field
        as={StyledTextField}
        style={{ maxWidth: '250px' }}
        label="Valor aprovado"
        name="valorAprovado"
        type="number"
        error={Boolean(touched.numeroAta && errors.numeroAta)}
        helperText={touched.numeroAta && errors.numeroAta}
      />

      <Field
        as={StyledTextField}
        style={{ maxWidth: '250px' }}
        label="Número de diárias aprovadas"
        name="numeroDiariasAprovadas"
        type="number"
        error={Boolean(touched.numeroAta && errors.numeroAta)}
        helperText={touched.numeroAta && errors.numeroAta}
      />

      <Field
        as={StyledTextField}
        label="Observação"
        name="observacao"
        error={Boolean(touched.observacao && errors.observacao)}
        helperText={touched.observacao && errors.observacao}
        multiline
      />
    </Grid>
  );
}
