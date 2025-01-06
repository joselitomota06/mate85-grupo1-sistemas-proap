import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { ChangePasswordSchema } from './ChangePasswordContainerSchema';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PasswordField from '../../components/custom/PasswordField';

type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

interface ChangePasswordFormProps {
  onSubmit: (values: ChangePasswordForm) => void;
}

export default function ChangePasswordContainer(
  props: ChangePasswordFormProps,
) {
  return (
    <Formik
      initialValues={{
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }}
      validationSchema={ChangePasswordSchema}
      onSubmit={props.onSubmit}
    >
      {({ errors, touched, values }) => {
        console.log('Errors:', errors);
        console.log('Touched:', touched);
        console.log('Values:', values);
        return (
          <Box component={Form} sx={{ width: '100%' }}>
            <Stack spacing={2}>
              <Field
                as={PasswordField}
                fullWidth
                name="currentPassword"
                label="Senha atual"
                error={touched.currentPassword && !!errors.currentPassword}
                helperText={touched.currentPassword && errors.currentPassword}
              />
              <Field
                as={PasswordField}
                fullWidth
                name="newPassword"
                label="Nova senha"
                error={touched.newPassword && !!errors.newPassword}
                helperText={touched.newPassword && errors.newPassword}
              />
              <Field
                as={PasswordField}
                fullWidth
                name="confirmNewPassword"
                label="Confirmar nova senha"
                error={
                  touched.confirmNewPassword && !!errors.confirmNewPassword
                }
                helperText={
                  touched.confirmNewPassword && errors.confirmNewPassword
                }
              />
              <Box>
                <Button type="submit" variant="contained" color="primary">
                  Confirmar
                </Button>
              </Box>
            </Stack>
          </Box>
        );
      }}
    </Formik>
  );
}
