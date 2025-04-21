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
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginFormContainer() {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = React.useState(false);

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

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

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
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
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
