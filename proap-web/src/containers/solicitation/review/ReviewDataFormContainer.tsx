import React from 'react';

import { SolicitationFormValues } from '../SolicitationFormSchema';
import { Field, useFormikContext } from 'formik';
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  StyledData,
  StyledFormLabel,
  StyledTextField,
} from '../SolicitationFormContainer.style';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

export default function ReviewDataFormContainer() {
  const { values, errors, touched } =
    useFormikContext<SolicitationFormValues>();

  return (
    <Box display="flex" flexDirection="column" pt={2} pb={2}>
      <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
        Avaliação da solicitação
      </Typography>
      <Stack sx={{ mt: 2 }}>
        <FormControl error={Boolean(touched.situacao && errors.situacao)}>
          <StyledFormLabel>Situação</StyledFormLabel>
          <Field
            as={RadioGroup}
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="situacao"
            row
          >
            <FormControlLabel value="1" control={<Radio />} label="Aprovado" />
            <FormControlLabel value="2" control={<Radio />} label="Reprovado" />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="Aguardando informações"
            />
          </Field>
          {touched.situacao && errors.situacao && (
            <FormHelperText>{errors.situacao}</FormHelperText>
          )}
        </FormControl>

        <Field
          as={StyledTextField}
          style={{ maxWidth: '170px' }}
          required
          label="Data de aprovação da solicitação"
          name="dataAprovacao"
          type="date"
          error={Boolean(touched.dataAprovacao && errors.dataAprovacao)}
          helperText={touched.dataAprovacao && errors.dataAprovacao}
        />

        <Field
          as={StyledTextField}
          style={{ maxWidth: '170px' }}
          label="Número da ATA"
          required
          name="numeroAta"
          type="number"
          error={Boolean(touched.numeroAta && errors.numeroAta)}
          helperText={touched.numeroAta && errors.numeroAta}
        />

        <StyledData>
          <StyledFormLabel>Valor total da solicitação (R$) </StyledFormLabel>
          <Typography style={{ color: 'black' }} variant="subtitle1">
            R${values.valorTotal}
          </Typography>
        </StyledData>

        <Field
          as={StyledTextField}
          required
          style={{ maxWidth: '250px' }}
          label="Valor total aprovado (R$)"
          name="valorAprovado"
          type="number"
          InputProps={{
            inputProps: { min: 0, step: 0.01, max: values.valorTotal },
          }}
          error={Boolean(touched.valorAprovado && errors.valorAprovado)}
          helperText={touched.valorAprovado && errors.valorAprovado}
        />

        <FormControl
          error={Boolean(
            touched.numeroDiariasAprovadas && errors.numeroDiariasAprovadas,
          )}
        >
          <StyledData>
            <StyledFormLabel>Número de diárias solicitadas</StyledFormLabel>
            <Typography style={{ color: 'black' }} variant="subtitle1">
              {values.quantidadeDiariasSolicitadas}
            </Typography>
          </StyledData>
          <StyledFormLabel required>
            Número de diárias aprovadas
          </StyledFormLabel>

          <Stack>
            <Field
              as={Select}
              sx={{ maxWidth: 60 }}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              name="numeroDiariasAprovadas"
              defaultValue={0}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              {!values.solicitanteDocente && <MenuItem value={5}>5</MenuItem>}
            </Field>
            {touched.numeroDiariasAprovadas &&
              errors.numeroDiariasAprovadas && (
                <FormHelperText>{errors.numeroDiariasAprovadas}</FormHelperText>
              )}
          </Stack>
        </FormControl>

        <Field
          as={StyledTextField}
          label="Observação"
          name="observacao"
          error={Boolean(touched.observacao && errors.observacao)}
          helperText={touched.observacao && errors.observacao}
          multiline
          rows={4}
        />
      </Stack>
    </Box>
  );
}
