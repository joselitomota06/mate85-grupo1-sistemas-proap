import {
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  TextField,
} from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { signIn } from '../../services/authService'
import { useAppDispatch } from '../../store'
import {
  LoginButton,
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
    (values: LoginFormValues) => {
      dispatch(signIn(values)).then(() => {
        console.log('ASDUUASHD')
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
      {({ errors, touched }) => (
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
              <Link to='test'>Recuperar senha</Link>
            </PasswordRecoveryTypography>
          </Grid>
          <LoginButton variant='contained' type='submit'>
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
