import React, { useEffect, useState } from 'react';
import { RegisterFormValues } from './RegisterFormSchema';
import { Field, useFormikContext } from 'formik';
import {
  TextField,
  Box,
  InputAdornment,
  Typography,
  Grid,
} from '@mui/material';
import { PhoneInputMask } from '../input-masks/PhoneInputMask';
import { Email, Phone } from '@mui/icons-material';

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
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Preencha suas informações de contato para que possamos entrar em contato
        quando necessário
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field name="email">
            {({ field, meta }: any) => (
              <TextField
                {...field}
                fullWidth
                label="E-mail"
                placeholder="Digite seu e-mail institucional"
                variant="outlined"
                required
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </Field>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Telefone"
            name="phone"
            required
            placeholder="Ex: (71) 99999-9999"
            error={Boolean(touched.phone && errors.phone)}
            helperText={
              (touched.phone && errors.phone) ||
              'Digite seu número de telefone com DDD'
            }
            onChange={handleInputPhoneChange}
            value={phoneWithoutMask}
            InputProps={{
              inputComponent: PhoneInputMask as any,
              startAdornment: (
                <InputAdornment position="start">
                  <Phone color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
