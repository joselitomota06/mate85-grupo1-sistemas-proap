import React from 'react';
import {
  Box,
  Stack,
  Typography,
  Divider,
  Chip,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import { useFormikContext } from 'formik';
import { SolicitationFormValues } from '../../SolicitationFormSchema';
import { StyledData } from '../../SolicitationFormContainer.style';
import { dateToLocalDate } from '../../../../helpers/conversion';
import {
  CheckCircle,
  Cancel,
  PendingOutlined,
  Event,
  AttachMoney,
  School,
  InfoOutlined,
} from '@mui/icons-material';
import { formatNumberToBRL } from '../../../../helpers/formatter';
import { useBudgetPercentage } from '../../../../hooks/budget/useBudgetPercentage';

export default function ProapReviewContainer() {
  const { values } = useFormikContext<SolicitationFormValues>();

  const { totalBudget, percentageOfBudget, isLoading } = useBudgetPercentage({
    year: values.createdAt,
    value: values.valorTotal,
  });

  const getSituacaoText = (situacao: number | string | undefined) => {
    if (situacao === undefined) return 'Não avaliado';
    const situacaoNum =
      typeof situacao === 'string' ? parseInt(situacao) : situacao;
    return situacaoNum === 1
      ? 'Aprovado'
      : situacaoNum === 2
        ? 'Reprovado'
        : 'Não avaliado';
  };

  const getSituacaoIcon = (situacao: number | string | undefined) => {
    if (situacao === undefined) return <PendingOutlined color="warning" />;
    const situacaoNum =
      typeof situacao === 'string' ? parseInt(situacao) : situacao;
    return situacaoNum === 1 ? (
      <CheckCircle color="success" />
    ) : situacaoNum === 2 ? (
      <Cancel color="error" />
    ) : (
      <PendingOutlined color="warning" />
    );
  };

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
          Avaliação da solicitação
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2, gap: 1 }}>
          {getSituacaoIcon(values.situacao)}
          <Chip
            label={getSituacaoText(values.situacao)}
            color={
              values.situacao === 1
                ? 'success'
                : values.situacao === 2
                  ? 'error'
                  : 'warning'
            }
            size="small"
          />
        </Box>
      </Box>

      <Stack spacing={3}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {/* Status e Datas */}
          <Section title="Status da Avaliação" icon={<Event color="primary" />}>
            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Data da avaliação
              </Typography>
              <Typography variant="subtitle2" color="primary">
                {values.dataAvaliacaoProap
                  ? dateToLocalDate(values.dataAvaliacaoProap)
                  : 'Não definida'}
              </Typography>
            </StyledData>

            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Número da ATA
              </Typography>
              <Typography variant="subtitle2" color="primary">
                {values.numeroAta || 'Não definido'}
              </Typography>
            </StyledData>
          </Section>

          {/* Valores */}
          <Section title="Valores" icon={<AttachMoney color="primary" />}>
            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Valor total da solicitação
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="h5"
                  color="primary"
                  sx={{ fontWeight: 'bold' }}
                >
                  {formatNumberToBRL(Number(values.valorTotal || 0))}
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

            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Valor total aprovado
              </Typography>
              <Typography
                variant="h5"
                color="primary"
                sx={{ fontWeight: 'bold' }}
              >
                {formatNumberToBRL(Number(values.valorAprovado || 0))}
              </Typography>
            </StyledData>
          </Section>

          {/* Diárias */}
          <Section title="Diárias" icon={<School color="primary" />}>
            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Diárias solicitadas
              </Typography>
              <Typography variant="subtitle2" color="primary">
                {values.quantidadeDiariasSolicitadas || '0'}
              </Typography>
            </StyledData>

            <StyledData>
              <Typography variant="subtitle2" color="text.secondary">
                Diárias aprovadas
              </Typography>
              <Typography variant="subtitle2" color="primary">
                {values.numeroDiariasAprovadas || '0'}
              </Typography>
            </StyledData>
          </Section>

          {/* Observações */}
          <Section title="Observações" icon={<Event color="primary" />}>
            <StyledData>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {values.observacao || 'Nenhuma observação registrada'}
              </Typography>
            </StyledData>
          </Section>
        </Box>
      </Stack>
    </Box>
  );
}
