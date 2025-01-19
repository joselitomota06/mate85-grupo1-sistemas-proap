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
  Box,
  Stack,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  StyledTextField,
  StyledDataInput,
} from '../SolicitationFormContainer.style';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { CurrencyCustomFormikField } from '../../currency-input/CurrencyInputContainer';
import { Info } from '@mui/icons-material';

export default function eventDetailFormContainer() {
  const { values, errors, touched, setFieldValue } =
    useFormikContext<SolicitationFormValues>();

  console.log('Values:', values);
  console.log('Errors:', errors);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: 2,
        gap: 2,
      }}
    >
      <Field
        as={StyledTextField}
        label="Nome do Evento (ou Solicitação)"
        name="linkHomePageEvento"
        error={Boolean(touched.linkHomePageEvento && errors.linkHomePageEvento)}
        helperText={touched.linkHomePageEvento && errors.linkHomePageEvento}
        required
      />
      <FormControl
        error={Boolean(
          touched.eventoInternacional && errors.eventoInternacional,
        )}
      >
        <FormLabel required>Natureza da Solicitação</FormLabel>
        <Field name="eventoInternacional">
          {({ field }: { field: any }) => (
            <RadioGroup
              {...field}
              row
              value={field.value}
              onChange={(event) => {
                setFieldValue(field.name, event.target.value === 'true');
              }}
              aria-labelledby="demo-row-radio-buttons-group-label"
            >
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Nacional"
              />
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Internacional"
              />
            </RadioGroup>
          )}
        </Field>
        {touched.eventoInternacional && errors.eventoInternacional && (
          <FormHelperText>{errors.eventoInternacional}</FormHelperText>
        )}
      </FormControl>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4}>
        <Field
          sx={{ width: 200 }}
          as={TextField}
          label="Data de início"
          name="dataInicio"
          error={Boolean(touched.dataInicio && errors.dataInicio)}
          helperText={touched.dataInicio && errors.dataInicio}
          type="date"
          required
        />
        <Stack sx={{ flexDirection: 'row' }}>
          <Field
            sx={{ margin: 0, width: 200 }}
            as={TextField}
            label="Data de término"
            name="dataFim"
            error={Boolean(touched.dataFim && errors.dataFim)}
            helperText={touched.dataFim && errors.dataFim}
            type="date"
            required
          />
          <Tooltip
            sx={{ position: 'relative', top: 10 }}
            title="Se o evento for de um único dia, preencha a mesma data nos dois campos"
          >
            <IconButton>
              <Info />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <Box>
        <FormLabel required>
          Será necessário afastamento para participação do Evento?
        </FormLabel>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{
            alignItems: { xs: 'start', sm: 'center' },
            justifyContent: 'space-between',
            maxWidth: '800px',
          }}
        >
          <FormControl
            error={Boolean(
              touched.afastamentoParaParticipacao &&
                errors.afastamentoParaParticipacao,
            )}
          >
            <Field name="afastamentoParaParticipacao">
              {({ field }: { field: any }) => (
                <RadioGroup
                  {...field}
                  row
                  value={String(field.value)}
                  onChange={(event) => {
                    setFieldValue(field.name, event.target.value === 'true');
                    setFieldValue('diasAfastamento', undefined);
                  }}
                  aria-labelledby="demo-row-radio-buttons-group-label"
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Sim"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Não"
                  />
                </RadioGroup>
              )}
            </Field>
            {touched.afastamentoParaParticipacao &&
              errors.afastamentoParaParticipacao && (
                <FormHelperText>
                  {errors.afastamentoParaParticipacao}
                </FormHelperText>
              )}
          </FormControl>
          {values.afastamentoParaParticipacao && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'start', sm: 'center' },
                gap: { xs: 0, sm: 2 },
              }}
            >
              <FormLabel required htmlFor="text-field">
                Quantos dias de afastamento?
              </FormLabel>
              <Field
                as={StyledTextField}
                id="text-field"
                sx={{ maxWidth: '250px !important', margin: 0 }}
                name="diasAfastamento"
                type="number"
                InputProps={{ inputProps: { min: 1, step: 1 } }}
                error={touched.diasAfastamento && !!errors.diasAfastamento}
                helperText={touched.diasAfastamento && errors.diasAfastamento}
              />
            </Box>
          )}
        </Stack>
      </Box>
      <Field
        as={StyledTextField}
        label="Homepage do Evento (ou Solicitação)"
        name="linkHomePageEvento"
        error={Boolean(touched.linkHomePageEvento && errors.linkHomePageEvento)}
        helperText={touched.linkHomePageEvento && errors.linkHomePageEvento}
      />
    </Box>
  );
}
