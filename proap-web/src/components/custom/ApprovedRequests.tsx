import React, { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Link,
  Chip,
  Tooltip,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AssistanceIdValueDTO } from '../../services/budgetService';
import { formatNumberToBRL } from '../../helpers/formatter';
import DateRangeFilter from './DateRangeFilter';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CalendarToday, AttachMoney, CheckCircle } from '@mui/icons-material';

interface ApprovedRequestsProps {
  loading: boolean;
  totalRequests: AssistanceIdValueDTO[];
  totalRequestsValue: number;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onFilter: (startDate: string, endDate: string) => void;
}

const ApprovedRequests: React.FC<ApprovedRequestsProps> = ({
  loading,
  totalRequests,
  totalRequestsValue,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onFilter,
}) => {
  const navigate = useNavigate();

  // Local state for date values to prevent parent re-renders until filter button is clicked
  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);

  // Update local state when props change (e.g., when component mounts)
  useEffect(() => {
    setLocalStartDate(startDate);
    setLocalEndDate(endDate);
  }, [startDate, endDate]);

  // Local handlers for date changes
  const handleLocalStartDateChange = (date: string) => {
    setLocalStartDate(date);
  };

  const handleLocalEndDateChange = (date: string) => {
    setLocalEndDate(date);
  };

  // Handler for filter button click - only now we update parent state
  const handleFilterClick = () => {
    // Instead of updating parent state individually and then calling filter
    // We directly pass both dates to the filter function
    onFilter(localStartDate, localEndDate);
  };

  // Handler to navigate to solicitation view page
  const handleViewSolicitation = (id: number) => {
    navigate(`/solicitation/view/${id}`);
  };

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Não disponível';
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch (e) {
      console.error('Error formatting date:', e);
      return 'Data inválida';
    }
  };

  return (
    <>
      <DateRangeFilter
        startDate={localStartDate}
        endDate={localEndDate}
        onStartDateChange={handleLocalStartDateChange}
        onEndDateChange={handleLocalEndDateChange}
        onFilter={handleFilterClick}
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : totalRequests.length === 0 ? (
        <Alert severity="info">
          Nenhuma solicitação encontrada no período selecionado.
        </Alert>
      ) : (
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', sm: 'center' },
              mb: 3,
              gap: 2,
              p: 2,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
            }}
          >
            <Typography variant="subtitle1" fontWeight="medium">
              Total de solicitações:{' '}
              <Box component="span" fontWeight="bold">
                {totalRequests.length}
              </Box>
            </Typography>
            <Typography variant="subtitle1" fontWeight="medium">
              Valor total:{' '}
              <Box component="span" fontWeight="bold">
                {formatNumberToBRL(totalRequestsValue)}
              </Box>
            </Typography>
          </Box>

          <Box sx={{ maxHeight: '600px', overflowY: 'auto', pr: 1 }}>
            {totalRequests.map((request) => (
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
                onClick={() => handleViewSolicitation(request.id)}
              >
                <CardContent sx={{ p: 2 }}>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                  >
                    {/* Header with title and status chip */}
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
                        label="Aprovada"
                        color="success"
                        size="small"
                        sx={{ fontWeight: 'medium', color: 'white' }}
                      />
                    </Box>

                    {/* Date information container */}
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2,
                      }}
                    >
                      {/* Creation date */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          flexBasis: { sm: '50%' },
                        }}
                      >
                        <CalendarToday fontSize="small" color="action" />
                        <Tooltip title="Data de criação" arrow>
                          <Typography variant="body2" color="text.secondary">
                            Criada em: {formatDate(request.createdAt)}
                          </Typography>
                        </Tooltip>
                      </Box>

                      {/* Approval date */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          flexBasis: { sm: '50%' },
                        }}
                      >
                        <CheckCircle fontSize="small" color="success" />
                        <Tooltip title="Data de aprovação" arrow>
                          <Typography variant="body2" color="text.secondary">
                            Aprovada em: {formatDate(request.dataAprovacao)}
                          </Typography>
                        </Tooltip>
                      </Box>
                    </Box>

                    {/* Value */}
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mt: 0.5,
                      }}
                    >
                      <AttachMoney fontSize="small" color="primary" />
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="primary"
                      >
                        {formatNumberToBRL(request.value)}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default ApprovedRequests;
