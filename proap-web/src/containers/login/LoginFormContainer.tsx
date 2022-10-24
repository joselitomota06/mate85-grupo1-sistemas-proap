import { CircularProgress, Grid, TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { Field, Form, Formik, FormikHelpers } from "formik";
import { useCallback, useState } from "react";
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
import { StyledTextField } from "./LoginFormContainer.style";

export default function LoginFormContainer() {
  const dispatch = useAppDispatch();

  const handleSubmit = useCallback(
    (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
      return dispatch(signIn(values)).catch(({ response: { status } }) => {
        if (status == 401) actions.setFieldError("password", "Senha incorreta");
      });
    },
    [dispatch]
  );

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
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
              type={values.showPassword ? "text" : "password"}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              required
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    style={{ position: "absolute", right: "0" }}
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
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
            Se ainda não tem uma conta, <Link to="register">cadastre-se</Link>
          </RegisterLinkTypography>
        </Form>
      )}
    </Formik>
  );
}
