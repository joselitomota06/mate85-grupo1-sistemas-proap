import { CircularProgress, Grid, TextField } from '@mui/material'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { useCallback } from 'react'
import { Link } from 'react-router-dom'

import { recoverPassword } from '../../services/RecoverPassworService'
import { useAppDispatch } from '../../store'
import {
  RecoverPasswordSendButton,
  LoginCircularProgress,
} from './RecoverPasswordFormContainer.style'
import {
  INITIAL_FORM_VALUES,
  RecoverPasswordFormSchema,
  RecoverPasswordFormValues,
} from './RecoverPasswordFormSchema'

export default function RecoverPasswordFormContainer() {
  const dispatch = useAppDispatch()

  const handleSubmit = useCallback(
    (values: RecoverPasswordFormValues, actions: FormikHelpers<RecoverPasswordFormValues>) => {
      return dispatch(recoverPassword(values)).catch(({ response: { status } }) => {
        if (status == 401) actions.setFieldError('email', 'E-mail inexistente')
      })
    },
    [dispatch]
  )

  return (
    <Formik
      initialValues={INITIAL_FORM_VALUES}
      validationSchema={RecoverPasswordFormSchema}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form noValidate>
          <Grid container direction='column' paddingTop={2} paddingBottom={2}>
            <Field
              as={TextField}
              label='E-mail'
              name='email'
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              required
            />
          </Grid>
          <RecoverPasswordSendButton
            variant='contained'
            type='submit'
            disabled={isSubmitting}
          >
            {isSubmitting && <LoginCircularProgress color='info' size={25} />}
            Enviar
          </RecoverPasswordSendButton>
        </Form>
      )}
    </Formik>
  )
}
