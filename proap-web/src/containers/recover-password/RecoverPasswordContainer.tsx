import { CircularProgress, Grid, TextField } from '@mui/material'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'

import { signIn } from '../../services/authService'
import { useAppDispatch } from '../../store'
import {
  LoginButton,
  LoginCircularProgress,
  PasswordRecoveryTypography,
  RegisterLinkTypography,
} from './RecoverPasswordContainer.style'
import {
  INITIAL_FORM_VALUES,
  loginFormSchema,
  LoginFormValues,
} from './RecoverPasswordSchema'

export default function LoginFormContainer() {
  const dispatch = useAppDispatch()

  const handleSubmit = useCallback(
    (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
      console.log(actions)
      return dispatch(signIn(values)).catch(({ response: { status } }) => {
        if (status == 401) actions.setFieldError('password', 'Senha incorreta')
      })
    },
    [dispatch]
  )

  return (
    <Formik
      initialValues={INITIAL_FORM_VALUES}
      validationSchema={loginFormSchema}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Grid container direction='column' paddingTop={2} paddingBottom={2}>
          <RegisterLinkTypography>
            Para recuperar seu acesso, preencha o campo com o seu e-mail de cadastro.
          </RegisterLinkTypography>
          <Field
              as={TextField}
              label='E-mail'
              name='email'
              // error={Boolean(touched.email && errors.email)}
              // helperText={touched.email && errors.email}
            />
           
          </Grid>
          <LoginButton
            variant='contained'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting && <LoginCircularProgress color='info' size={25} />}
            Enviar
          </LoginButton>
          
        </Form>
      )}
    </Formik>
  )
}
