import React from 'react'

import { Field, useFormikContext } from 'formik'
import { Grid, TextField } from '@mui/material'

import { RegisterFormValues } from './RegisterFormSchema'

export default function PasswordFormContainer() {
  const { errors, touched } = useFormikContext<RegisterFormValues>()

  return (
    <Grid container direction='column' paddingTop={2} paddingBottom={2}>
      <Field
        as={TextField}
        label='Senha'
        name='password'
        type='password'
        error={Boolean(touched.password && errors.password)}
        helperText={touched.password && errors.password}
        required
      />
      <Field
        as={TextField}
        label='Confirmar senha'
        name='confirmPassword'
        type='password'
        error={Boolean(touched.confirmPassword && errors.confirmPassword)}
        helperText={touched.confirmPassword && errors.confirmPassword}
        required
      />
    </Grid>
  )
}
