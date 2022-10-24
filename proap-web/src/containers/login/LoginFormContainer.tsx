import { CircularProgress, Grid, TextField } from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useCallback } from "react";
import { Link } from "react-router-dom";

import { signIn } from "../../services/authService";
import { useAppDispatch } from "../../store";
import {
  LoginButton,
  LoginCircularProgress,
  PasswordRecoveryTypography,
  RegisterLinkTypography,
} from "./LoginFormContainer.style";
import {
  INITIAL_FORM_VALUES,
  loginFormSchema,
  LoginFormValues,
} from "./LoginFormSchema";

import Toast from "../../helpers/notification";

export default function LoginFormContainer() {
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
      return dispatch(signIn(values))
        .then(() => Toast.success("Login realizado com sucesso!"))
        .catch(({ response: { status } }) => {
          if (status == 401)
            actions.setFieldError("password", "Senha incorreta");
          else
            Toast.error("Serviço indisponível.")
        });
    },
    [dispatch]
  );

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
              as={TextField}
              label="Senha"
              name="password"
              type="password"
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              required
            />
            <PasswordRecoveryTypography>
              <Link to="recover-password">Recuperar senha</Link>
            </PasswordRecoveryTypography>
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
        </Form>
      )}
    </Formik>
  );
}
