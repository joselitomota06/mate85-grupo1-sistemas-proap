import React from 'react';

import { SolicitationFormValues } from '../SolicitationFormSchema';
import { Field, useFormikContext } from 'formik';
import {
  Box,
  FormControl,
  FormHelperText,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Typography,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  StyledData,
  StyledFormLabel,
  StyledTextField,
} from '../SolicitationFormContainer.style';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import { useBudgetPercentage } from '../../../hooks/budget/useBudgetPercentage';

export default function ReviewDataFormContainer() {
  const { values, errors, touched } =
    useFormikContext<SolicitationFormValues>();

  const maxDiarias = values.quantidadeDiariasSolicitadas || 0;
  const diariasOptions = Array.from({ length: maxDiarias + 1 }, (_, i) => i);

  const { totalBudget, percentageOfBudget, isLoading } = useBudgetPercentage({
    year: values.createdAt,
    value: values.valorTotal,
  });

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Avaliação da solicitação
      </Typography>

      {/* Situação */}
      <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
        <FormControl
          error={Boolean(touched.situacao && errors.situacao)}
          fullWidth
        >
          <StyledFormLabel>Situação</StyledFormLabel>
          <Field as={RadioGroup} name="situacao" row sx={{ mb: 1 }}>
            <FormControlLabel value="1" control={<Radio />} label="Aprovado" />
            <FormControlLabel value="2" control={<Radio />} label="Reprovado" />
          </Field>
          {touched.situacao && errors.situacao && (
            <FormHelperText>{errors.situacao}</FormHelperText>
          )}
        </FormControl>
      </Box>

      {/* Data e Número ATA */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Field
            as={StyledTextField}
            fullWidth
            required
            label="Data da avaliação da solicitação"
            name="dataAprovacao"
            type="date"
            InputLabelProps={{ shrink: true }}
            error={Boolean(touched.dataAprovacao && errors.dataAprovacao)}
            helperText={touched.dataAprovacao && errors.dataAprovacao}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Field
            as={StyledTextField}
            fullWidth
            label="Número da ATA"
            required
            name="numeroAta"
            type="number"
            error={Boolean(touched.numeroAta && errors.numeroAta)}
            helperText={touched.numeroAta && errors.numeroAta}
          />
        </Box>
      </Box>

      {/* Valores */}
      <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <StyledData>
              <StyledFormLabel>Valor total da solicitação</StyledFormLabel>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}
              >
                <Typography variant="h6" color="primary">
                  R${' '}
                  {values.valorTotal?.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}
                </Typography>
                {isLoading ? (
                  <CircularProgress size={16} />
                ) : percentageOfBudget !== null ? (
                  <Tooltip
                    title={`Esta solicitação representa ${percentageOfBudget}% do orçamento anual total (R$ ${totalBudget?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })})`}
                    arrow
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'primary.main',
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="primary"
                        fontWeight="medium"
                        sx={{ mr: 0.5 }}
                      >
                        ({percentageOfBudget}% do orçamento)
                      </Typography>
                      <InfoOutlined fontSize="small" color="primary" />
                    </Box>
                  </Tooltip>
                ) : null}
              </Box>
            </StyledData>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Field
              as={StyledTextField}
              required
              fullWidth
              label="Valor total aprovado (R$)"
              name="valorAprovado"
              type="number"
              InputProps={{
                inputProps: { min: 0, step: 0.01, max: values.valorTotal },
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
              error={Boolean(touched.valorAprovado && errors.valorAprovado)}
              helperText={touched.valorAprovado && errors.valorAprovado}
            />
          </Box>
        </Box>
      </Box>

      {/* Diárias */}
      <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            <StyledData>
              <StyledFormLabel>Diárias solicitadas</StyledFormLabel>
              <Typography variant="h6" color="primary">
                {values.quantidadeDiariasSolicitadas}
              </Typography>
            </StyledData>
          </Box>
          <Box sx={{ flex: 1 }}>
            <FormControl
              fullWidth
              error={Boolean(
                touched.numeroDiariasAprovadas && errors.numeroDiariasAprovadas,
              )}
            >
              <StyledFormLabel required>Diárias aprovadas</StyledFormLabel>
              <Field
                as={Select}
                displayEmpty
                name="numeroDiariasAprovadas"
                defaultValue={0}
                sx={{ maxWidth: '100px' }}
              >
                {diariasOptions.map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Field>
              {touched.numeroDiariasAprovadas &&
                errors.numeroDiariasAprovadas && (
                  <FormHelperText>
                    {errors.numeroDiariasAprovadas}
                  </FormHelperText>
                )}
            </FormControl>
          </Box>
        </Box>
      </Box>

      {/* Observação */}
      <Box>
        <Field
          as={StyledTextField}
          fullWidth
          label="Observação"
          name="observacao"
          error={Boolean(touched.observacao && errors.observacao)}
          helperText={touched.observacao && errors.observacao}
          multiline
          rows={4}
        />
      </Box>
    </Box>
  );
}
