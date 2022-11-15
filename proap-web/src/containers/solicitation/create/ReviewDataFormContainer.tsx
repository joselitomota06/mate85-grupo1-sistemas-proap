import React from "react";

import { AdminSolicitationFormValues } from "../SolicitationFormSchema";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Field, useFormikContext } from "formik";
import { Grid } from "@mui/material";

import { StyledTextField } from "../SolicitationFormContainer.style";

export default function ReviewDataFormContainer() {
  const { errors, touched } = useFormikContext<AdminSolicitationFormValues>();

  return (
    <Grid container direction="column" paddingTop={2} paddingBottom={2}>
      <Field
        as={RadioGroup}
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="review.situacao"
        row
      >
        <FormControlLabel value="false" control={<Radio />} label="Reprovado" />
        <FormControlLabel value="true" control={<Radio />} label="Aprovado" />
      </Field>

      <Field
        as={StyledTextField}
        style={{ maxWidth: "170px" }}
        label="Data de aprovação da solicitação"
        name="review.dataAprovacao"
        type="date"
        error={Boolean(touched.review?.dataAprovacao && errors.review?.dataAprovacao)}
        helperText={touched.review?.dataAprovacao && errors.review?.dataAprovacao}
      />

      <Field
        as={StyledTextField}
        style={{ maxWidth: "170px" }}
        label="Número da ATA"
        name="review.numeroAta"
        type="number"
        error={Boolean(touched.review?.numeroAta && errors.review?.numeroAta)}
        helperText={touched.review?.numeroAta && errors.review?.numeroAta}
      />
      <Field
        as={StyledTextField}
        style={{ maxWidth: "250px" }}
        label="Número de diárias aprovadas"
        name="review.numeroDiariasAprovadas"
        type="number"
        error={Boolean(touched.review?.numeroDiariasAprovadas && errors.review?.numeroDiariasAprovadas)}
        helperText={touched.review?.numeroDiariasAprovadas && errors.review?.numeroDiariasAprovadas}
      />

      <Field
        as={StyledTextField}
        label="Observação"
        name="review.observacao"
        error={Boolean(touched.review?.observacao && errors.review?.observacao)}
        helperText={touched.review?.observacao && errors.review?.observacao}
        multiline
        rows={4}
      />
    </Grid>
  );
}
