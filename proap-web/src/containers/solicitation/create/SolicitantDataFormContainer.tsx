import React from "react";

import { SolicitationFormValues } from "../SolicitationFormSchema";
import { Field, useFormikContext } from "formik";
import {
  Grid,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { StyledTextField } from "../SolicitationFormContainer.style";

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
        style={{ padding: "none" }}
        multiline
      />
      <Field
        as={StyledTextField}
        label="Nome do solicitante"
        name="nomeCompleto"
        style={{ display: "inline-grid" }}
        error={Boolean(touched.nomeCompleto && errors.nomeCompleto)}
        helperText={touched.nomeCompleto && errors.nomeCompleto}
        required
        multiline
      />
      <Field
        as={StyledTextField}
        label="Título completo da publicação a ser apoiada"
        name="titulo"
        error={Boolean(touched.titulo && errors.titulo)}
        helperText={touched.titulo && errors.titulo}
        required
        multiline
      />
      <Field as={StyledTextField} label="DOI (se disponível)" name="doi" />
      <Field
        as={StyledTextField}
        label="Lista completa de co-autor(es) da publicação a ser apoiada (Nome e sobrenome)"
        name="autores"
        error={Boolean(touched.autores && errors.autores)}
        helperText={touched.autores && errors.autores}
        required
        multiline
      />

      <FormControl error={Boolean(touched.alunoPGCOMP && errors.alunoPGCOMP)}>
        <FormLabel required>
          Existe aluno PGCOMP como co-autor na publicação
        </FormLabel>
        <Field
          as={RadioGroup}
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="alunoPGCOMP"
          row
        >
          <FormControlLabel value="true" control={<Radio />} label="Sim" />
          <FormControlLabel value="false" control={<Radio />} label="Não" />
        </Field>
        {touched.alunoPGCOMP && errors.alunoPGCOMP && (
          <FormHelperText>{errors.alunoPGCOMP}</FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
}
