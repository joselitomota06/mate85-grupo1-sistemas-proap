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
        label="Nome"
        name="nomeSolicitante"
        error={Boolean(touched.nomeSolicitante && errors.nomeSolicitante)}
        helperText={touched.nomeSolicitante && errors.nomeSolicitante}
        required
        style={{ padding: "none" }}
        multiline
      />
      <Field
        as={StyledTextField}
        label="E-mail"
        name="emailSolicitacao"
        error={Boolean(touched.emailSolicitacao && errors.emailSolicitacao)}
        helperText={touched.emailSolicitacao && errors.emailSolicitacao}
        required
        style={{ padding: "none" }}
        multiline
      />
      <Field
        as={StyledTextField}
        label="Título completo da publicação a ser apoiada"
        name="nomeCompleto"
        error={Boolean(touched.nomeCompleto && errors.nomeCompleto)}
        helperText={touched.nomeCompleto && errors.nomeCompleto}
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

      <FormControl error={Boolean(touched.autoresPresentePGCOMP && errors.autoresPresentePGCOMP)}>
        <FormLabel required>
          Existe aluno PGCOMP como co-autor na publicação
        </FormLabel>
        <Field
          as={RadioGroup}
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="autoresPresentePGCOMP"
          row
        >
          <FormControlLabel value="true" control={<Radio />} label="Sim" />
          <FormControlLabel value="false" control={<Radio />} label="Não" />
        </Field>
        {touched.autoresPresentePGCOMP && errors.autoresPresentePGCOMP && (
          <FormHelperText>{errors.autoresPresentePGCOMP}</FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
}
