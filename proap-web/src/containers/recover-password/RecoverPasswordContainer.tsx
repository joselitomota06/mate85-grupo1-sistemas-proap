import { CircularProgress, Grid, TextField } from '@mui/material'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'

import { signIn } from '../../services/authService'
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

  const handleSubmit = useCallback(
    (values: RecoverPasswordFormValues, actions: FormikHelpers<RecoverPasswordFormValues>) => {
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
      validationSchema={recoverPasswordFormSchema}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Grid container direction='column' paddingTop={2} paddingBottom={2}>
          <RecoverPasswordLinkTypography>
            Para recuperar seu acesso, preencha o campo com o seu e-mail de cadastro.
          </RecoverPasswordLinkTypography>
          <Field
              as={TextField}
              label='E-mail'
              name='email'
          />
           
          </Grid>
          <RecoverPasswordButton
            variant='contained'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting && <RecoverPasswordCircularProgress color='info' size={25} />}
            Enviar
          </RecoverPasswordButton>
          
        </Form>
      )}
    </Formik>
  )
}
