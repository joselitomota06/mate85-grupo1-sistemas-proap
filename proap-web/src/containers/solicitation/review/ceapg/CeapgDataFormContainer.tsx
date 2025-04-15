import React from 'react';
import { Box, Typography, Stack, InputAdornment } from '@mui/material';
import { Field, useFormikContext } from 'formik';
import { SolicitationFormValues } from '../../SolicitationFormSchema';
import {
  StyledData,
  StyledFormLabel,
  StyledTextField,
} from '../../SolicitationFormContainer.style';
import { formatNumberToBRL } from '../../../../helpers/formatter';

export default function CeapgDataFormContainer() {
  const { values, errors, touched } =
    useFormikContext<SolicitationFormValues>();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Avaliação CEAPG
      </Typography>

      {/* Valores */}
      <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
        <Box sx={{ display: 'flex', gap: 4, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <StyledData>
              <StyledFormLabel>Valor aprovado</StyledFormLabel>
              <Typography
                variant="h5"
                color="primary"
                sx={{ fontWeight: 'bold' }}
              >
                {formatNumberToBRL(Number(values.valorAprovado || 0))}
              </Typography>
            </StyledData>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Field
              as={StyledTextField}
              required
              fullWidth
              label="Custo final CEAPG (R$)"
              name="custoFinalCeapg"
              type="number"
              InputProps={{
                inputProps: { min: 0, step: 0.01 },
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
              error={Boolean(touched.custoFinalCeapg && errors.custoFinalCeapg)}
              helperText={touched.custoFinalCeapg && errors.custoFinalCeapg}
            />
          </Box>
        </Box>
      </Box>

      {/* Observações */}
      <Box>
        <Field
          as={StyledTextField}
          fullWidth
          label="Observação do CEAPG"
          name="observacoesCeapg"
          error={Boolean(touched.observacoesCeapg && errors.observacoesCeapg)}
          helperText={touched.observacoesCeapg && errors.observacoesCeapg}
          multiline
          rows={4}
        />
      </Box>
    </Box>
  );
}
