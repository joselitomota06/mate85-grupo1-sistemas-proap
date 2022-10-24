import React from "react";

import { RegisterFormValues } from "./RegisterFormSchema";
import { Field, useFormikContext } from "formik";
import { Grid, TextField } from "@mui/material";

export default function PersonalDataFormContainer() {
  const { errors, touched } = useFormikContext<RegisterFormValues>();

  return (
    <Grid container direction="column" paddingTop={2} paddingBottom={2}>
      <Field
        as={TextField}
        label="Nome"
        name="name"
        error={Boolean(touched.name && errors.name)}
        helperText={touched.name && errors.name}
        required
      />
      <Field
        as={TextField}
        label="CPF"
        name="cpf"
        error={Boolean(touched.cpf && errors.cpf)}
        helperText={touched.cpf && errors.cpf}
        required
      />
      <Field
        as={TextField}
        label="Matrícula"
        name="registration"
        error={Boolean(touched.registration && errors.registration)}
        helperText={touched.registration && errors.registration}
        required
      />
    </Grid>
  );
}
