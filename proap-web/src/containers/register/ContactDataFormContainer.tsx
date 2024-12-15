import React, { useEffect, useState } from 'react';

import { RegisterFormValues } from './RegisterFormSchema';
import { Field, useFormikContext } from 'formik';
import { Grid, TextField } from '@mui/material';
import { PhoneInputMask } from '../input-masks/PhoneInputMask';

export default function ContactDataFormContainer() {
  const { errors, touched, setFieldValue, values } =
    useFormikContext<RegisterFormValues>();

  const [phoneWithoutMask, setPhoneWithoutMask] = useState(values.phone);

  const handleInputPhoneChange = (event: any) => {
    const phoneWithoutMask = event.target.value.replace(/[\-\(\)' ']/g, '');

    setPhoneWithoutMask(phoneWithoutMask);

    setFieldValue('phone', phoneWithoutMask);
  };

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
      <TextField
        label="Telefone"
        name="phone"
        required
        error={Boolean(touched.phone && errors.phone)}
        helperText={touched.phone && errors.phone}
        onChange={handleInputPhoneChange}
        value={phoneWithoutMask}
        InputProps={{
          inputComponent: PhoneInputMask as any,
        }}
        variant="standard"
      />
    </Grid>
  );
}
