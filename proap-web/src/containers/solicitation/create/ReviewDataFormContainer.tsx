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
        style={{ maxWidth: "170px" }}
        label="Data de aprovação da solicitação"
        name="dataAprovacao"
        type="date"
        error={Boolean(touched.dataAprovacao && errors.dataAprovacao)}
        helperText={touched.dataAprovacao && errors.dataAprovacao}
      />

      <Field
        as={StyledTextField}
        style={{ maxWidth: "170px" }}
        label="Número da ATA"
        name="numeroAta"
        type="number"
        error={Boolean(touched.numeroAta && errors.numeroAta)}
        helperText={touched.numeroAta && errors.numeroAta}
      />
      <Field
        as={StyledTextField}
        style={{ maxWidth: "250px" }}
        label="Valor aprovado"
        name="numeroDiariasAprovadas"
        type="number"
        error={Boolean(touched.numeroDiariasAprovadas && errors.numeroDiariasAprovadas)}
        helperText={touched.numeroDiariasAprovadas && errors.numeroDiariasAprovadas}
      />

      <Field
        as={StyledTextField}
        label="Observação"
        name="observacao"
        error={Boolean(touched.observacao && errors.observacao)}
        helperText={touched.observacao && errors.observacao}
        multiline
        rows={4}
      />
    </Grid>
  );
}
