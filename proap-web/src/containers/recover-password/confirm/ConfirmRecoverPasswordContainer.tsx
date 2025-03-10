import { CircularProgress, Box, TextField } from '@mui/material';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  confirmRecoverPassword,
  recoverPassword,
} from '../../../services/recoverPasswordService';
import { useAppDispatch } from '../../../store';
import {
  RecoverPasswordButton,
  RecoverPasswordCircularProgress,
  PasswordRecoveryTypography,
  RecoverPasswordLinkTypography,
} from './ConfirmRecoverPasswordContainer.style';
import {
  INITIAL_FORM_VALUES,
  confirmRecoverPasswordFormSchema,
  ConfirmRecoverPasswordFormValues,
} from './ConfirmRecoverPasswordSchema';
import PasswordField from '../../../components/custom/PasswordField';
import Toast from '../../../helpers/notification';

export default function ConfirmRecoverPasswordFormContainer(props: {
  token: string | null;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (
      values: ConfirmRecoverPasswordFormValues,
      actions: FormikHelpers<ConfirmRecoverPasswordFormValues>,
    ) => {
      return confirmRecoverPassword(values, props.token!)
        .then(() => {
          Toast.success('Senha recuperada com sucesso!');
          navigate('/');
        })
        .catch((error) => {
          Toast.error('Erro ao recuperar senha: ' + error.message);
          actions.setSubmitting(false);
        });
    },
    [dispatch],
  );

  return (
    <Formik
      initialValues={INITIAL_FORM_VALUES}
      validationSchema={confirmRecoverPasswordFormSchema}
      validateOnChange={true}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', pt: 2, pb: 2 }}>
            <RecoverPasswordLinkTypography>
              Insira a nova senha para a sua conta.
            </RecoverPasswordLinkTypography>
            <Field
              as={PasswordField}
              fullWidth
              name="password"
              label="Nova senha"
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
            />
            <Field
              as={PasswordField}
              fullWidth
              name="confirmPassword"
              label="Confirmar senha"
              error={touched.confirmPassword && !!errors.confirmPassword}
              helperText={touched.confirmPassword && errors.confirmPassword}
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
            Recuperar senha
          </RecoverPasswordButton>
        </Form>
      )}
    </Formik>
  );
}
