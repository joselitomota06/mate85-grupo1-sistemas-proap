import React from 'react';
import { Box, Stack, Typography, Chip, Tooltip } from '@mui/material';
import { useFormikContext } from 'formik';
import { SolicitationFormValues } from '../../SolicitationFormSchema';
import { StyledData } from '../../SolicitationFormContainer.style';
import { AttachMoney, InfoOutlined } from '@mui/icons-material';
import { formatNumberToBRL } from '../../../../helpers/formatter';

export default function CeapgReviewContainer() {
  const { values } = useFormikContext<SolicitationFormValues>();

  const Section = ({
    title,
    icon,
    children,
  }: {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }) => (
    <Box
      sx={{
        flex: 1,
        minWidth: 300,
        p: 3,
        backgroundColor: 'background.paper',
        borderRadius: 2,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        height: 'fit-content',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1 }}>
        {icon}
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Box>
      <Stack spacing={2}>{children}</Stack>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Avaliação CEAPG
        </Typography>
      </Box>

      <Stack spacing={3}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {/* Valores */}
          <Section title="Valores" icon={<AttachMoney color="primary" />}>
            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Valor total da solicitação
              </Typography>
              <Typography
                variant="h5"
                color="primary"
                sx={{ fontWeight: 'bold' }}
              >
                {formatNumberToBRL(Number(values.valorTotal || 0))}
              </Typography>
            </StyledData>

            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Custo final CEAPG
              </Typography>
              <Typography
                variant="h5"
                color="primary"
                sx={{ fontWeight: 'bold' }}
              >
                {formatNumberToBRL(Number(values.custoFinalCeapg || 0))}
              </Typography>
            </StyledData>
          </Section>

          {/* Observações */}
          <Section title="Observações" icon={<InfoOutlined color="primary" />}>
            <StyledData>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {values.observacoesCeapg || 'Nenhuma observação registrada'}
              </Typography>
            </StyledData>
          </Section>
        </Box>
      </Stack>
    </Box>
  );
}
