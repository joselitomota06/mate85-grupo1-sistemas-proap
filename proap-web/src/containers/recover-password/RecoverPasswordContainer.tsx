import { CircularProgress, Grid, TextField } from '@mui/material'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { recoverPassword } from '../../services/recoverPasswordService'
import { useAppDispatch } from '../../store'
import {
  RecoverPasswordButton,
  RecoverPasswordCircularProgress,
  PasswordRecoveryTypography,
  RecoverPasswordLinkTypography,
} from './RecoverPasswordContainer.style'
import {
  INITIAL_FORM_VALUES,
  recoverPasswordFormSchema,
  RecoverPasswordFormValues,
} from './RecoverPasswordSchema'

export default function RecoverPasswordFormContainer() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    (
      values: RecoverPasswordFormValues,
      actions: FormikHelpers<RecoverPasswordFormValues>
    ) => {
      return dispatch(recoverPassword(values)).then(() =>
        navigate('/')
      )
    },
    [dispatch]
  )

  return (
    <Formik
      initialValues={INITIAL_FORM_VALUES}
      validationSchema={recoverPasswordFormSchema}
      validateOnChange={true}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Grid container direction='column' paddingTop={2} paddingBottom={2}>
            <RecoverPasswordLinkTypography>
              Para recuperar seu acesso, preencha o e-mail e o CPF informados no cadastrados.
            </RecoverPasswordLinkTypography>
            <Field
              as={TextField}
              label='E-mail'
              name='email'
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              required
            />
            <Field
              as={TextField}
              label='CPF'
              name='cpf'
              error={Boolean(touched.cpf && errors.cpf)}
              helperText={touched.cpf && errors.cpf}
              required
            />
            <Field
              as={TextField}
              label='Nova senha'
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
          <RecoverPasswordButton
            variant='contained'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <RecoverPasswordCircularProgress color='info' size={25} />
            )}
            Enviar
          </RecoverPasswordButton>
        </Form>
      )}
    </Formik>
  )
}
