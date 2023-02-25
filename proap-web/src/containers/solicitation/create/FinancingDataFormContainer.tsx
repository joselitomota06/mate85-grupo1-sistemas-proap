import React from 'react';

import { SolicitationFormValues } from '../SolicitationFormSchema';
import { Field, useFormikContext } from 'formik';
import {
  Grid,
  TextField,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import {
  StyledTextField,
  StyledDataInput,
} from '../SolicitationFormContainer.style';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function ContactDataFormContainer() {
  const { values, errors, touched } =
    useFormikContext<SolicitationFormValues>();

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
            Solicitou apoio para esse artigo em um outro programa <br /> de
            pós-graduação?
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
      {values.solicitacaoApoio === 'true' && (
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
            Solicitou apoio para esse artigo de outras formas
            <br /> de financiamento?
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
        {values.solicitacaoAuxilioOutrasFontes === 'true' && (
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
