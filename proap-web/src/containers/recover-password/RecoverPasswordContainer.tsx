import {
  CircularProgress,
  TextField,
  InputAdornment,
  Box,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { recoverPassword } from '../../services/recoverPasswordService';
import {
  INITIAL_FORM_VALUES,
  recoverPasswordFormSchema,
  RecoverPasswordFormValues,
} from './RecoverPasswordSchema';
import Toast from '../../helpers/notification';
import SentEmailRecoverPasswordContainer from './SentEmailRecoverPasswordContainer';
import { Email, ArrowForward } from '@mui/icons-material';

type EmailSentProps = {
  email: string;
  status: boolean;
};

export default function RecoverPasswordFormContainer() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
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
        <Form noValidate style={{ width: '100%' }}>
          <Stack spacing={3} sx={{ width: '100%' }}>
            <Box sx={{ width: '100%' }}>
              <Field name="email">
                {({ field, meta }: any) => (
                  <TextField
                    {...field}
                    label="E-mail"
                    placeholder="Digite seu e-mail"
                    variant="outlined"
                    fullWidth
                    autoComplete="email"
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error ? meta.error : ''}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email
                            color="action"
                            fontSize={isSmall ? 'small' : 'medium'}
                          />
                        </InputAdornment>
                      ),
                    }}
                    size={isSmall ? 'small' : 'medium'}
                  />
                )}
              </Field>
            </Box>

            <Button
              variant="contained"
              type="submit"
              size={isSmall ? 'medium' : 'large'}
              disabled={isSubmitting}
              endIcon={isSubmitting ? undefined : <ArrowForward />}
              sx={{
                py: isSmall ? 1 : 1.5,
                position: 'relative',
                fontWeight: 'bold',
                width: '100%',
              }}
            >
              {isSubmitting ? (
                <CircularProgress
                  size={isSmall ? 20 : 24}
                  sx={{
                    color: 'white',
                    position: 'absolute',
                  }}
                />
              ) : (
                'Enviar e-mail de recuperação'
              )}
            </Button>

            <Button
              variant="text"
              color="primary"
              onClick={() => navigate('/login')}
              size={isSmall ? 'small' : 'medium'}
              sx={{ width: '100%', mt: 2 }}
            >
              Voltar para login
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
