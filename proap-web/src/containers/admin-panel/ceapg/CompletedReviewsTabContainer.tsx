import { CheckCircle, AttachMoney, Person } from '@mui/icons-material';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Tooltip,
} from '@mui/material';
import { CeapgResponse } from '../../../types';

interface CompletedReviewsTabProps {
  completedReviews: CeapgResponse[];
  handleViewSolicitation: (id: number) => void;
  formatDate: (dateString: string | null) => string;
  formatNumberToBRL: (value: number) => string;
}

const CompletedReviewsTab: React.FC<CompletedReviewsTabProps> = ({
  completedReviews,
  handleViewSolicitation,
  formatDate,
  formatNumberToBRL,
}) => {
  return completedReviews.length === 0 ? (
    <Alert severity="info">Não há solicitações avaliadas pelo CEAPG.</Alert>
  ) : (
    <Box sx={{ maxHeight: '600px', overflowY: 'auto', pr: 1 }}>
      {completedReviews.map((request) => (
        <Card
          key={request.id}
          sx={{
            mb: 1.5,
            transition: 'all 0.2s ease',
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: 'none',
            '&:hover': {
              borderColor: 'primary.main',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              cursor: 'pointer',
            },
          }}
          onClick={() => handleViewSolicitation(request.id!)}
        >
          <CardContent sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  sx={{
                    color: 'primary.main',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Solicitação #{request.id}
                </Typography>
                <Chip
                  icon={<CheckCircle fontSize="small" />}
                  label="Avaliada CEAPG"
                  color="success"
                  size="small"
                  sx={{ fontWeight: 'medium', color: 'white' }}
                />
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flexBasis: { sm: '50%' },
                  }}
                >
                  <AttachMoney fontSize="small" color="success" />
                  <Tooltip title="Valor aprovado pela Comissão" arrow>
                    <Typography variant="body2" color="text.secondary">
                      Valor aprovado: {formatNumberToBRL(request.valorAprovado)}
                    </Typography>
                  </Tooltip>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flexBasis: { sm: '50%' },
                  }}
                >
                  <CheckCircle fontSize="small" color="success" />
                  <Typography variant="body2" color="text.secondary">
                    Avaliada em: {formatDate(request.dataAvaliacaoCeapg)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flexBasis: { sm: '50%' },
                  }}
                >
                  <Person fontSize="small" color="action" />
                  <Tooltip title="Avaliador CEAPG" arrow>
                    <Typography variant="body2" color="text.secondary">
                      Avaliada por: {request.avaliadorCeapg}
                    </Typography>
                  </Tooltip>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flexBasis: { sm: '50%' },
                  }}
                >
                  <AttachMoney fontSize="small" color="primary" />
                  <Tooltip title="Custo final CEAPG" arrow>
                    <Typography
                      variant="body2"
                      fontWeight="medium"
                      color="primary.dark"
                    >
                      Custo CEAPG: {formatNumberToBRL(request.custoFinalCeapg!)}
                    </Typography>
                  </Tooltip>
                </Box>
              </Box>

              {request.observacoesCeapg && (
                <Box
                  sx={{
                    p: 2,
                    bgcolor: 'grey.50',
                    borderRadius: 2,
                    mt: 1.5,
                    border: '1px solid',
                    borderColor: 'grey.200',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    sx={{ mb: 0.5, fontWeight: 600 }}
                  >
                    Observações CEAPG:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      pl: 1,
                      borderLeft: '2px solid',
                      borderColor: 'primary.light',
                    }}
                  >
                    {request.observacoesCeapg}
                  </Typography>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CompletedReviewsTab;
