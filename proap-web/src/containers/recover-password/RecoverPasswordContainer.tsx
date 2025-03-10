import { Box, TextField } from '@mui/material';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recoverPassword } from '../../services/recoverPasswordService';
import {
  RecoverPasswordButton,
  RecoverPasswordCircularProgress,
  RecoverPasswordLinkTypography,
} from './RecoverPasswordContainer.style';
import {
  INITIAL_FORM_VALUES,
  recoverPasswordFormSchema,
  RecoverPasswordFormValues,
} from './RecoverPasswordSchema';
import Toast from '../../helpers/notification';
import SentEmailRecoverPasswordContainer from './SentEmailRecoverPasswordContainer';

type EmailSentProps = {
  email: string;
  status: boolean;
};

export default function RecoverPasswordFormContainer() {
  const navigate = useNavigate();
  const [sentEmail, setSentEmail] = useState<EmailSentProps>({
    email: '',
    status: false,
  });
  const handleSubmit = useCallback(
    (
      values: RecoverPasswordFormValues,
      actions: FormikHelpers<RecoverPasswordFormValues>,
    ) => {
      return recoverPassword(values)
        .then(() => {
          setSentEmail({ email: values.email, status: true });
        })
        .catch((error) => {
          Toast.error(
            'Erro ao enviar e-mail de recuperação: ' + error.message ||
              'Erro ao enviar e-mail de recuperação',
          );
        })
        .finally(() => {
          actions.setSubmitting(false);
        });
    },
    [],
  );

  return sentEmail.status ? (
    <SentEmailRecoverPasswordContainer email={sentEmail.email} />
  ) : (
    <Formik
      initialValues={INITIAL_FORM_VALUES}
      validationSchema={recoverPasswordFormSchema}
      validateOnChange={true}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2, pb: 2 }}>
            <RecoverPasswordLinkTypography>
              Para recuperar seu acesso, informe o e-mail da sua conta.
            </RecoverPasswordLinkTypography>
            <Field
              as={TextField}
              label="E-mail"
              name="email"
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              required
            />
          </Box>
          <RecoverPasswordButton
            variant="contained"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <RecoverPasswordCircularProgress color="info" size={25} />
            )}
            Enviar e-mail de recuperação
          </RecoverPasswordButton>
        </Form>
      )}
    </Formik>
  );
}
