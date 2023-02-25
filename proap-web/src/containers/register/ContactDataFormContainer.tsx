import React from 'react';

import { RegisterFormValues } from './RegisterFormSchema';
import { Field, useFormikContext } from 'formik';
import { Grid, TextField } from '@mui/material';

export default function ContactDataFormContainer() {
  const { errors, touched } = useFormikContext<RegisterFormValues>();

  return (
    <Grid container direction="column" paddingTop={2} paddingBottom={2}>
      <Field
        as={TextField}
        label="E-mail"
        name="email"
        error={Boolean(touched.email && errors.email)}
        helperText={touched.email && errors.email}
        required
      />
      <Field
        as={TextField}
        label="Telefone"
        name="phone"
        error={Boolean(touched.phone && errors.phone)}
        helperText={touched.phone && errors.phone}
        required
      />
    </Grid>
  );
}
