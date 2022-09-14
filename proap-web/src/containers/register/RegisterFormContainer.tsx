import { Grid, TextField } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../services/authService'
import { useAppDispatch } from '../../store'
import {
  RegisterButton,
  RegisterCircularProgress,
} from './RegisterFormContainer.style'
import {
  INITIAL_FORM_VALUES,
  registerFormSchema,
  RegisterFormValues,
} from './RegisterFormSchema'

export default function RegisterFormContainer() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    (values: RegisterFormValues) => {
      values.login = values.email;
      return dispatch(registerUser(values)).then(() => navigate('/'))
    },
    [dispatch]
  )
  
  return (
    <Formik
      initialValues={INITIAL_FORM_VALUES}
      validationSchema={registerFormSchema}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ touched, errors, isSubmitting }) => (
        <Form>
          <Grid container direction='column' paddingTop={2} paddingBottom={2}>
            <Field
              as={TextField}
              label='Nome'
              name='name'
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
            <Field
              as={TextField}
              label='E-mail'
              name='email'
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <Field
              as={TextField}
              label='CPF'
              name='cpf'
              error={Boolean(touched.cpf && errors.cpf)}
              helperText={touched.cpf && errors.cpf}
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
              type='password'
              label='Senha'
              name='password'
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <Field
              as={TextField}
              type='password'
              label='Confirmar senha'
              name='confirmPassword'
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />
            <Field
              as={TextField}
              label='Matrícula'
              name='registration'
              error={Boolean(touched.registration && errors.registration)}
              helperText={touched.registration && errors.registration}
            />
          </Grid>
          <RegisterButton
            variant='contained'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <RegisterCircularProgress color='info' size={25} />
            )}
            Criar
          </RegisterButton>
        </Form>
      )}
    </Formik>
  )
}
