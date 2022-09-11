import { Grid, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useCallback } from 'react'
import { RegisterButton } from './RegisterFormContainer.style'
import {
  INITIAL_FORM_VALUES,
  registerFormSchema,
  RegisterFormValues,
} from './RegisterFormSchema'

export default function RegisterFormContainer() {
  const handleSubmit = useCallback((values: RegisterFormValues) => {
    console.log('onSubmit:', values)
  }, [])

  return (
    <Formik
      initialValues={INITIAL_FORM_VALUES}
      validationSchema={registerFormSchema}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ touched, errors }) => (
        <Form>
          <Grid container direction='column' paddingTop={2} paddingBottom={2}>
            <Field
              as={TextField}
              label='E-mail'
              name='email'
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <Field
              as={TextField}
              label='Telefone'
              name='phone'
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />
            <Field
              as={TextField}
              label='Senha'
              name='password'
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <Field
              as={TextField}
              label='Confirmar senha'
              name='confirmPassword'
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />
          </Grid>
          <RegisterButton variant='contained' type='submit'>
            Criar
          </RegisterButton>
        </Form>
      )}
    </Formik>
  )
}
