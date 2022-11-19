import React from "react";
import { Field, useFormikContext } from "formik";
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";

import { ExtraSolicitation } from "../schema";
import { StyledTextField } from "../../solicitation/SolicitationFormContainer.style";

export default function ExtraSolicitationFinancingContainer() {
  const { values, errors, touched } = useFormikContext<ExtraSolicitation>();

  return (
    <Grid
      container
      direction="column"
      spacing={1}
      paddingTop={2}
      paddingBottom={2}
    >
      <Grid item>
        <FormControl
          error={Boolean(touched.solicitacaoApoio && errors.solicitacaoApoio)}
        >
          <FormLabel required>
            Solicitou apoio em um outro programa de pós-graduação?
          </FormLabel>
          <Field
            as={RadioGroup}
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="solicitacaoApoio"
            row
          >
            <FormControlLabel value="false" control={<Radio />} label="Não" />
            <FormControlLabel value="true" control={<Radio />} label="Outro" />
          </Field>
          {touched.solicitacaoApoio && errors.solicitacaoApoio && (
            <FormHelperText>{errors.solicitacaoApoio}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      {values.solicitacaoApoio === "true" && (
        <Grid item>
          <Field
            as={StyledTextField}
            label="Valor solicitado"
            name="valorSolicitado"
            type="number"
            error={Boolean(touched.valorSolicitado && errors.valorSolicitado)}
            helperText={touched.valorSolicitado && errors.valorSolicitado}
            required
          />
        </Grid>
      )}
      <Grid item>
        <FormControl
          error={Boolean(
            touched.solicitacaoAuxilioOutrasFontes &&
              errors.solicitacaoAuxilioOutrasFontes
          )}
        >
          <FormLabel required>
            Solicitou apoio de outras formas de financiamento?
          </FormLabel>
          <Field as={RadioGroup} name="solicitacaoAuxilioOutrasFontes" row>
            <FormControlLabel value="false" control={<Radio />} label="Não" />
            <FormControlLabel value="true" control={<Radio />} label="Outro" />
          </Field>
          {touched.solicitacaoAuxilioOutrasFontes &&
            errors.solicitacaoAuxilioOutrasFontes && (
              <FormHelperText>
                {errors.solicitacaoAuxilioOutrasFontes}
              </FormHelperText>
            )}
        </FormControl>
        {values.solicitacaoAuxilioOutrasFontes === "true" && (
          <Grid item container spacing={2}>
            <Grid item>
              <Field
                as={StyledTextField}
                label="Nome da agência de fomento"
                name="nomeAgenciaFomento"
                error={Boolean(
                  touched.nomeAgenciaFomento && errors.nomeAgenciaFomento
                )}
                helperText={
                  touched.nomeAgenciaFomento && errors.nomeAgenciaFomento
                }
                required
              />
            </Grid>
            <Grid item>
              <Field
                as={TextField}
                label="Valor solicitado"
                name="valorSolicitadoAgenciaFomento"
                type="number"
                error={Boolean(
                  touched.valorSolicitadoAgenciaFomento &&
                    errors.valorSolicitadoAgenciaFomento
                )}
                helperText={
                  touched.valorSolicitadoAgenciaFomento &&
                  errors.valorSolicitadoAgenciaFomento
                }
                required
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
