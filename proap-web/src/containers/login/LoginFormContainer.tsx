import {
  CircularProgress,
  Grid,
  Input,
  TextField,
  IconButton,
  InputAdornment,
  InputProps,
} from '@mui/material';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import { signIn } from '../../services/authService';
import { useAppDispatch } from '../../store';
import {
  LoginButton,
  LoginCircularProgress,
  RegisterLinkTypography,
} from './LoginFormContainer.style';
import {
  INITIAL_FORM_VALUES,
  loginFormSchema,
  LoginFormValues,
} from './LoginFormSchema';

import Toast from '../../helpers/notification';
import { StyledTextField } from './LoginFormContainer.style';

import Visibility from '@mui/icons-material/Visibility';
import { Label } from '@mui/icons-material';

export default function LoginFormContainer() {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = React.useState(false);
  const [rightIcon, setRightIcon] = React.useState('eye');

  const handleSubmit = useCallback(
    async (
      values: LoginFormValues,
      actions: FormikHelpers<LoginFormValues>,
    ) => {
      const transformedValues = {
        ...values,
        username: values.username.toLowerCase(),
      };
      return dispatch(signIn(transformedValues)).catch(
        ({ response: { status } }) => {
          if (status == 401)
            actions.setFieldError('password', 'Senha incorreta');
        },
      );
    },
    [dispatch],
  );

  function onMouseDown() {
    setShowPassword(true);
    setRightIcon('eye');
  }

  function onMouseUp() {
    setShowPassword(false);
    setRightIcon('eye-off');
  }

  return (
    <Formik
      initialValues={INITIAL_FORM_VALUES}
      validationSchema={loginFormSchema}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form noValidate>
          <Grid container direction="column" paddingTop={2} paddingBottom={2}>
            <Field
              as={TextField}
              label="E-mail"
              name="username"
              error={Boolean(touched.username && errors.username)}
              helperText={touched.username && errors.username}
              required
            />
            <Field
              as={StyledTextField}
              label="Senha"
              name="password"
              type={showPassword ? 'text' : 'password'}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      aria-label="toggle password visibility"
                      onMouseDown={onMouseDown}
                      onMouseUp={onMouseUp}
                    >
                      {' '}
                      <Visibility />{' '}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <LoginButton
            variant="contained"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && <LoginCircularProgress color="info" size={25} />}
            Entrar
          </LoginButton>
          <RegisterLinkTypography>
            Não tem uma conta? <Link to="register">Cadastre-se</Link>
          </RegisterLinkTypography>

          <RegisterLinkTypography>
            Problemas ao entrar na conta?{' '}
            <Link to="recover-password">Recuperar senha</Link>
          </RegisterLinkTypography>
        </Form>
      )}
    </Formik>
  );
}
