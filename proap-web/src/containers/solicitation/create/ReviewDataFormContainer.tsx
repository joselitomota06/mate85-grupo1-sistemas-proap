import React from "react";

import { SolicitationFormValues } from "../SolicitationFormSchema";
import { Field, useFormikContext } from "formik";
import { Grid, TextField } from "@mui/material";
import { StyledTextField } from "../SolicitationFormContainer.style";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

export default function ReviewDataFormContainer() {
  const { errors, touched } = useFormikContext<SolicitationFormValues>();

  return (
    <Grid container direction="column" paddingTop={2} paddingBottom={2}>
      <Field
        as={RadioGroup}
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="situacao"
        row
      >
        <FormControlLabel value="false" control={<Radio />} label="Reprovado" />
        <FormControlLabel value="true" control={<Radio />} label="Aprovado" />
      </Field>

      <Field
        as={StyledTextField}
        label="Data de aprovação da solicitação"
        name="dataaprovacao"
        type="date"
        error={Boolean(touched.dataAprovacao && errors.dataAprovacao)}
        helperText={touched.dataAprovacao && errors.dataAprovacao}
      />

      <Field
        as={StyledTextField}
        label="Número da ATA"
        name="numeroATA"
        type="number"
        error={Boolean(touched.numeroAta && errors.numeroAta)}
        helperText={touched.numeroAta && errors.numeroAta}
      />
      <Field
        as={StyledTextField}
        label="Número de diárias aprovadas"
        name="numerodiarias"
        type="number"
        error={Boolean(touched.numeroAta && errors.numeroAta)}
        helperText={touched.numeroAta && errors.numeroAta}
      />

      <Field
        as={StyledTextField}
        label="Observação"
        name="obs"
        error={Boolean(touched.titulo && errors.titulo)}
        helperText={touched.titulo && errors.titulo}
      />
    </Grid>
  );
}
