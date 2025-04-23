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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CeapgResponse } from '../../../types';
import { formatNumberToBRL } from '../../../helpers/formatter';

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
import DateRangeFilter from '../../../components/custom/DateRangeFilter';
import PendingReviewsTab from './PendingReviewsTabContainer';
import CompletedReviewsTab from './CompletedReviewsTabContainer';

interface CeapgReviewRequestsProps {
  loading: boolean;
  requests: CeapgResponse[];
  startDate?: string;
  endDate?: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onFilter: (startDate?: string, endDate?: string) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

const a11yProps = (index: number) => {
  return {
    id: `ceapg-tab-${index}`,
    'aria-controls': `ceapg-tabpanel-${index}`,
  };
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

  const [localStartDate, setLocalStartDate] = useState(startDate);
  const [localEndDate, setLocalEndDate] = useState(endDate);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setLocalStartDate(startDate);
    setLocalEndDate(endDate);
  }, [startDate, endDate]);

  const handleLocalStartDateChange = (date: string) => {
    setLocalStartDate(date);
    onStartDateChange(date);
  };

  const handleLocalEndDateChange = (date: string) => {
    setLocalEndDate(date);
    onEndDateChange(date);
  };

  const handleFilterClick = () => {
    onFilter(localStartDate, localEndDate);
  };

  const handleReviewSolicitation = (id: number) => {
    navigate(`/solicitation/review/${id}`);
  };

  const handleViewSolicitation = (id: number) => {
    navigate(`/solicitation/view/${id}`);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Não disponível';
    try {
      return format(parseISO(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch (e) {
      console.error('Error formatting date:', e);
      return 'Data inválida';
    }
  };

  const pendingReviews = requests.filter(
    (request) =>
      request.avaliadorCeapg === null && request.custoFinalCeapg === null,
  );

  const completedReviews = requests.filter(
    (request) =>
      request.avaliadorCeapg !== null && request.custoFinalCeapg !== null,
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <>
      <DateRangeFilter
        filterByLabel="data de aprovação"
        startDate={localStartDate || ''}
        endDate={localEndDate || ''}
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
              variant={isMobile ? 'scrollable' : 'standard'}
              scrollButtons="auto"
              allowScrollButtonsMobile
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

          <TabPanel value={tabValue} index={0}>
            <PendingReviewsTab
              pendingReviews={pendingReviews}
              handleReviewSolicitation={handleReviewSolicitation}
              formatDate={formatDate}
              formatNumberToBRL={formatNumberToBRL}
            />
          </TabPanel>

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
