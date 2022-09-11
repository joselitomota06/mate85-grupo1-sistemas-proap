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
} from './LoginFormContainer.style'
import {
  INITIAL_FORM_VALUES,
  loginFormSchema,
  LoginFormValues,
} from './LoginFormSchema'

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
            <Field
              as={TextField}
              label='Nome de usuário'
              name='username'
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
            />
            <Field
              as={TextField}
              label='Senha'
              name='password'
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <PasswordRecoveryTypography>
              <Link to='recover-password'>Recuperar senha</Link>
            </PasswordRecoveryTypography>
          </Grid>
          <LoginButton
            variant='contained'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting && <LoginCircularProgress color='info' size={25} />}
            Entrar
          </LoginButton>
          <RegisterLinkTypography>
            Se ainda não tem uma conta, <Link to='register'>cadastre-se</Link>
          </RegisterLinkTypography>
        </Form>
      )}
    </Formik>
  )
}
