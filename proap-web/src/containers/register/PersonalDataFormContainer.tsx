import React, { useEffect, useState } from 'react';

import { RegisterFormValues } from './RegisterFormSchema';
import { Field, useFormikContext } from 'formik';
import { Grid, TextField } from '@mui/material';

export default function PersonalDataFormContainer() {
  const { errors, touched, values, setFieldValue } =
    useFormikContext<RegisterFormValues>();

  const [cpfWithMask, setCpfWithMask] = useState('');

  useEffect(() => {
    console.log(values.cpf);
  }, [values]);

  return (
    <Grid container direction="column" paddingTop={2} paddingBottom={2}>
      <Field
        as={TextField}
        label="Nome"
        name="name"
        error={Boolean(touched.name && errors.name)}
        helperText={touched.name && errors.name}
        required
      />
      <TextField
        label="CPF"
        name="cpf"
        required
        error={Boolean(touched.cpf && errors.cpf)}
        helperText={touched.cpf && errors.cpf}
        value={cpfWithMask}
        inputProps={{ maxLength: 11 }}
        onChange={(e: any) => {
          const cpfWihoutMask = e.target.value.replace(/[\-\.]/g, '');
          const cpfWithMask = cpfWihoutMask.replace(
            /(\d{3})(\d{3})(\d{3})(\d{2})/,
            '$1.$2.$3-$4'
          );

          setCpfWithMask(cpfWithMask);

          setFieldValue('cpf', cpfWihoutMask);
        }}
      />
      <Field
        as={TextField}
        label="Matrícula"
        name="registration"
        error={Boolean(touched.registration && errors.registration)}
        helperText={touched.registration && errors.registration}
        required
      />
    </Grid>
  );
}
