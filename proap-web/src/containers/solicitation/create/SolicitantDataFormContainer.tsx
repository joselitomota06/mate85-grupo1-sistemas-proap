import React from 'react';

import { SolicitationFormValues } from '../SolicitationFormSchema';
import { Field, useFormikContext } from 'formik';
import {
  Grid,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { StyledTextField } from '../SolicitationFormContainer.style';
import { useAuth } from '../../../hooks';

export default function ContactDataFormContainer() {
  const { errors, touched, values } = useFormikContext<SolicitationFormValues>();

  const { name, email } = useAuth();
  
  return (
    <Grid container direction="column" paddingTop={2} paddingBottom={2}>
      <StyledTextField 
        label="Solicitante" 
        value={values.user.name != '' ? values.user.name : name} 
        disabled 
      />
      <StyledTextField
        label="E-mail"
        value={values.user.email != '' ? values.user.email : email}
        disabled
      />
      <Field
        as={StyledTextField}
        label="Título completo da publicação a ser apoiada"
        name="nomeCompleto"
        error={Boolean(touched.nomeCompleto && errors.nomeCompleto)}
        helperText={touched.nomeCompleto && errors.nomeCompleto}
        required
        multiline
      />
      <Field as={StyledTextField} label="DOI (se disponível)" name="doi" />
      <Field
        as={StyledTextField}
        label="Lista completa de co-autor(es) da publicação a ser apoiada (Nome e sobrenome)"
        name="autores"
        error={Boolean(touched.autores && errors.autores)}
        helperText={touched.autores && errors.autores}
        required
        multiline
      />

      <FormControl
        error={Boolean(
          touched.autoresPresentePGCOMP && errors.autoresPresentePGCOMP
        )}
      >
        <FormLabel required>
          Existe aluno PGCOMP como co-autor na publicação
        </FormLabel>
        <Field
          as={RadioGroup}
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="autoresPresentePGCOMP"
          row
        >
          <FormControlLabel value="true" control={<Radio />} label="Sim" />
          <FormControlLabel value="false" control={<Radio />} label="Não" />
        </Field>
        {touched.autoresPresentePGCOMP && errors.autoresPresentePGCOMP && (
          <FormHelperText>{errors.autoresPresentePGCOMP}</FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
}
