import React, { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Chip,
  Tooltip,
  Tab,
  Tabs,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CeapgResponse } from '../../types';
import { formatNumberToBRL } from '../../helpers/formatter';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  CalendarToday,
  AttachMoney,
  CheckCircle,
  PendingOutlined,
  AccessTime,
  Person,
} from '@mui/icons-material';
import DateRangeFilter from '../../components/custom/DateRangeFilter';

interface CeapgReviewRequestsProps {
  loading: boolean;
  requests: CeapgResponse[];
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onFilter: (startDate: string, endDate: string) => void;
}

// Tab component props
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// Tab Panel component
const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`ceapg-tabpanel-${index}`}
      aria-labelledby={`ceapg-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

// Helper function for tab a11y props
const a11yProps = (index: number) => {
  return {
    id: `ceapg-tab-${index}`,
    'aria-controls': `ceapg-tabpanel-${index}`,
  };
};

interface PendingReviewsTabProps {
  pendingReviews: CeapgResponse[];
  handleReviewSolicitation: (id: number) => void;
  formatDate: (dateString: string | null) => string;
  formatNumberToBRL: (value: number) => string;
}

const PendingReviewsTab: React.FC<PendingReviewsTabProps> = ({
  pendingReviews,
  handleReviewSolicitation,
  formatDate,
  formatNumberToBRL,
}) => {
  return pendingReviews.length === 0 ? (
    <Alert severity="info">
      Não há solicitações pendentes de avaliação pelo CEAPG.
    </Alert>
  ) : (
    <Box sx={{ maxHeight: '600px', overflowY: 'auto', pr: 1 }}>
      {pendingReviews.map((request) => (
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
          onClick={() => handleReviewSolicitation(request.id!)}
        >
          <CardContent sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
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
                  icon={<PendingOutlined fontSize="small" />}
                  label="Pendente CEAPG"
                  color="warning"
                  size="small"
                  sx={{ fontWeight: 'medium' }}
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
                {/* Approved  by */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flexBasis: { sm: '50%' },
                  }}
                >
                  <Person fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    Aprovada por: {request.avaliadorProap}
                  </Typography>
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
                  <Typography variant="body2" color="text.secondary">
                    Aprovada em: {formatDate(request.dataAvaliacaoProap)}
                  </Typography>
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
                <Typography variant="body1" fontWeight="bold" color="primary">
                  Valor Aprovado: {formatNumberToBRL(request.valorAprovado)}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

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
                  label="Avaliada CEAPG"
                  color="success"
                  size="small"
                  sx={{ fontWeight: 'medium', color: 'white' }}
                />
              </Box>

              {/* Value information container */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 2,
                }}
              >
                {/* Approved value */}
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

                {/* Approved by CEAPG */}
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
                {/* CEAPG final cost */}
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

              {/* Observation summary if available */}
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

const CeapgReviewRequests: React.FC<CeapgReviewRequestsProps> = ({
  loading,
  requests,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onFilter,
}) => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);

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
    onStartDateChange(date);
  };

  const handleLocalEndDateChange = (date: string) => {
    setLocalEndDate(date);
    onEndDateChange(date);
  };

  // Handler for filter button click - only now we update parent state
  const handleFilterClick = () => {
    onFilter(localStartDate, localEndDate);
  };

  // Handler to navigate to solicitation review page
  const handleReviewSolicitation = (id: number) => {
    navigate(`/solicitation/review/${id}`);
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

  // Filter requests based on CEAPG review status
  const pendingReviews = requests.filter(
    (request) =>
      request.avaliadorCeapg === null && request.custoFinalCeapg === null,
  );

  const completedReviews = requests.filter(
    (request) =>
      request.avaliadorCeapg !== null && request.custoFinalCeapg !== null,
  );

  // Tab change handler
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
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
      ) : requests.length === 0 ? (
        <Alert severity="info">
          Nenhuma solicitação encontrada no período selecionado.
        </Alert>
      ) : (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="ceapg review tabs"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab
                label={`Pendentes (${pendingReviews.length})`}
                icon={<AccessTime />}
                iconPosition="start"
                {...a11yProps(0)}
              />
              <Tab
                label={`Avaliadas (${completedReviews.length})`}
                icon={<CheckCircle />}
                iconPosition="start"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>

          {/* Pending Reviews Tab */}
          <TabPanel value={tabValue} index={0}>
            <PendingReviewsTab
              pendingReviews={pendingReviews}
              handleReviewSolicitation={handleReviewSolicitation}
              formatDate={formatDate}
              formatNumberToBRL={formatNumberToBRL}
            />
          </TabPanel>

          {/* Completed Reviews Tab */}
          <TabPanel value={tabValue} index={1}>
            <CompletedReviewsTab
              completedReviews={completedReviews}
              handleViewSolicitation={handleViewSolicitation}
              formatDate={formatDate}
              formatNumberToBRL={formatNumberToBRL}
            />
          </TabPanel>
        </Box>
      )}
    </>
  );
};

export default CeapgReviewRequests;
