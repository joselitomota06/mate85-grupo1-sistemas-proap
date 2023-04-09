import React, { useEffect, useState } from 'react';

import { RegisterFormValues } from './RegisterFormSchema';
import { Field, useFormikContext } from 'formik';
import { Grid, TextField } from '@mui/material';
import { CpfInputMask } from '../input-masks/CpfInputMask';

export default function PersonalDataFormContainer() {
  const { errors, touched, setFieldValue, values } =
    useFormikContext<RegisterFormValues>();

  const [cpfWihoutMask, setCpfWihoutMask] = useState(values.cpf);

  // useEffect(() => {
  //   console.log(values.cpf);
  // }, [values]);

  const handleInputCpfChange = (event: any) => {
    const cpfWihoutMask = event.target.value.replace(/[\-\.\_]/g, '');

    setCpfWihoutMask(cpfWihoutMask);

    setFieldValue('cpf', cpfWihoutMask);
  };

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
        onChange={handleInputCpfChange}
        value={cpfWihoutMask}
        InputProps={{
          inputComponent: CpfInputMask as any,
        }}
        variant="standard"
      />
      <Field
        as={TextField}
        label="Matrícula"
        name="registration"
        error={Boolean(touched.registration && errors.registration)}
        helperText={touched.registration && errors.registration}
        type="number"
        required
      />
    </Grid>
  );
}
