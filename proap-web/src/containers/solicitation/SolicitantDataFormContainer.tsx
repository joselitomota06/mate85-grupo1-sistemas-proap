import React from "react";

import { SolicitationFormValues } from "./SolicitationFormSchema";
import { Field, useFormikContext } from "formik";
import { Grid, TextField } from "@mui/material";
import { StyledTextField } from "./SolicitationFormContainer.style";

export default function ContactDataFormContainer() {
  const { errors, touched } = useFormikContext<SolicitationFormValues>();

  return (
    <Grid container direction="column" paddingTop={2} paddingBottom={2}>
      <Field
        as={StyledTextField}
        label="E-mail"
        name="email"
        error={Boolean(touched.email && errors.email)}
        helperText={touched.email && errors.email}
        required
      />
      <Field
        as={StyledTextField}
        label="Nome do solicitante"
        name="nome"
        error={Boolean(touched.name && errors.name)}
        helperText={touched.name && errors.name}
        required
      />
      <Field
        as={StyledTextField}
        label="Título completo da publicação a ser apoiada"
        name="titulo"
        error={Boolean(touched.title && errors.title)}
        helperText={touched.title && errors.title}
        required
      />
      <Field as={StyledTextField} label="DOI (se disponível)" name="doi" />
      <Field
        style={{ maxWidth: "350px" }}
        as={StyledTextField}
        label="Lista completa de co-autor(es) da publicação a ser apoiada"
        name="coautores"
        error={Boolean(touched.coautor && errors.coautor)}
        helperText={touched.coautor && errors.coautor}
        required
      />
    </Grid>
  );
}
