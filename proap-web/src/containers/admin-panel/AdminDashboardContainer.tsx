import { useEffect, useState, useCallback, SyntheticEvent } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  BarChart,
  AttachMoney,
  ListAlt,
  Settings,
  Dashboard,
  FactCheck,
  Groups,
  AdminPanelSettings,
} from '@mui/icons-material';
import { BudgetFormValues } from './BudgetFormSchema';
import {
  SolicitationAdmin,
  AssistanceIdValueDTO,
  getBudgetByYear,
  getRemainingBudget,
  getTotalAssistanceRequestsValue,
  setBudget,
} from '../../services/budgetService';
import Toast from '../../helpers/notification';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import ApprovedRequests from './ApprovedRequestsContainer';

import SectionHeader from '../../components/custom/SectionHeader';

// Add import for CEAPG service
import { getAllCeapgReviews } from '../../services/ceapgService';
import { CeapgResponse } from '../../types';
import BudgetOverview from './BudgetOverviewContainer';
import CeapgReviewRequests from './CeapgReviewRequests';
import useHasPermission from '../../hooks/auth/useHasPermission';
import SettingContainer from './settings/SettingsContainer';

// Interface for tab panel props
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
      id={`budget-tabpanel-${index}`}
      aria-labelledby={`budget-tab-${index}`}
      {...other}
      style={{ width: '100%' }}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

// Component for accessibility props
const a11yProps = (index: number) => {
  return {
    id: `budget-tab-${index}`,
    'aria-controls': `budget-tabpanel-${index}`,
  };
};

// Componente principal
const AdminDashboardContainer = () => {
  const isCeapg = useHasPermission('CEAPG_ROLE');
  const isAdmin = useHasPermission('ADMIN_ROLE');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentBudget, setCurrentBudget] = useState<SolicitationAdmin | null>(
    null,
  );
  const [remainingBudget, setRemainingBudget] = useState<number | null>(null);
  const [totalRequests, setTotalRequests] = useState<AssistanceIdValueDTO[]>(
    [],
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear(),
  );
  // These states will only be updated when the filter button is clicked
  const [filterDates, setFilterDates] = useState({
    startDate: '',
    endDate: '',
  });
  const [usedPercentage, setUsedPercentage] = useState<number>(0);
  const [totalRequestsValue, setTotalRequestsValue] = useState<number>(0);

  // Add state for CEAPG requests
  const [ceapgRequests, setCeapgRequests] = useState<CeapgResponse[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const handleTabChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);

    // Load CEAPG data when switching to CEAPG tab
    if (newValue === 3) {
      loadCeapgRequestsData();
    }
  };

  const formatDateToAPI = (dateStr: string): string | undefined => {
    if (!dateStr) return undefined;
    try {
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
        const date = parse(dateStr, 'yyyy-MM-dd', new Date());
        return format(date, 'dd-MM-yyyy');
      } else {
        const date = parse(dateStr, 'dd/MM/yyyy', new Date());
        return format(date, 'dd-MM-yyyy');
      }
    } catch (e) {
      console.error('Error formatting date:', e);
      return undefined;
    }
  };

  const loadCeapgRequestsData = useCallback(async () => {
    try {
      setLoading(true);
      const formatStartDate = formatDateToAPI(filterDates.startDate);
      const formatEndDate = formatDateToAPI(filterDates.endDate);

      const ceapgData = await getAllCeapgReviews(
        formatStartDate,
        formatEndDate,
      );
      setCeapgRequests(ceapgData);
    } catch (error) {
      console.error('Erro ao carregar solicitações CEAPG:', error);
      Toast.error('Erro ao carregar solicitações CEAPG');
    } finally {
      setLoading(false);
    }
  }, [filterDates]);

  const loadBudgetData = useCallback(
    async (year: number) => {
      setLoading(true);
      try {
        const budget = await getBudgetByYear(year);
        setCurrentBudget(budget);

        const remaining = await getRemainingBudget(year);
        setRemainingBudget(remaining);

        const startDateFormatted = formatDateToAPI(filterDates.startDate);
        const endDateFormatted = formatDateToAPI(filterDates.endDate);

        const requests = await getTotalAssistanceRequestsValue(
          startDateFormatted,
          endDateFormatted,
        );
        setTotalRequests(requests);

        const totalValue = requests.reduce((sum, item) => sum + item.value, 0);
        setTotalRequestsValue(totalValue);

        if (budget && budget.budget > 0) {
          const used = budget.budget - remaining;
          setUsedPercentage(
            Math.min(Math.floor((used / budget.budget) * 100), 100),
          );
        } else {
          setUsedPercentage(0);
        }

        // Load CEAPG data if tab is active or first load
        if (tabValue === 3 || isFirstLoad) {
          loadCeapgRequestsData();
        }

        // Once data is loaded for the first time, update flag
        setIsFirstLoad(false);
      } catch (error) {
        console.error('Erro ao carregar dados do orçamento:', error);
        Toast.error('Erro ao carregar dados do orçamento');
      } finally {
        setLoading(false);
      }
    },
    [tabValue, loadCeapgRequestsData, isFirstLoad],
  );

  useEffect(() => {
    loadBudgetData(selectedYear);
  }, [selectedYear, loadBudgetData]);

  const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedYear(event.target.value as number);
  };

  const handleFilterApply = (startDate: string, endDate: string) => {
    setFilterDates({
      startDate,
      endDate,
    });

    loadBudgetData(selectedYear);
  };

  // Add handler for CEAPG filter
  const handleCeapgFilterApply = useCallback(
    (startDate: string, endDate: string) => {
      setFilterDates({
        startDate,
        endDate,
      });
      loadCeapgRequestsData();
    },
    [loadCeapgRequestsData],
  );

  const handleBudgetSubmit = async (values: BudgetFormValues) => {
    setLoading(true);
    try {
      await setBudget(values.budget, values.year);
      Toast.success(`Orçamento de ${values.year} definido com sucesso!`);
      if (values.year === selectedYear) {
        await loadBudgetData(selectedYear);
        setTabValue(0);
      }
    } catch (error) {
      console.error('Erro ao definir orçamento:', error);
      Toast.error('Erro ao definir o orçamento anual: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ pb: 4 }}>
      <Box
        sx={{
          mb: 3,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <AdminPanelSettings color="primary" fontSize="large" />
        <Typography variant="h5" fontWeight="bold" color="primary">
          Painel Administrativo
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant={isMobile ? 'fullWidth' : 'standard'}
            scrollButtons={isMobile ? 'auto' : false}
            aria-label="budget dashboard tabs"
            indicatorColor="primary"
            textColor="primary"
            sx={{ px: 2 }}
          >
            <Tab
              icon={<Dashboard />}
              label={isMobile ? '' : 'Visão Geral'}
              iconPosition={isMobile ? 'top' : 'start'}
              {...a11yProps(0)}
            />
            <Tab
              icon={<FactCheck />}
              label={isMobile ? '' : 'Solicitações Aprovadas'}
              iconPosition={isMobile ? 'top' : 'start'}
              {...a11yProps(1)}
            />
            {!isCeapg && (
              <Tab
                icon={<Groups />}
                label={isMobile ? '' : 'Avaliações CEAPG'}
                iconPosition={isMobile ? 'top' : 'start'}
                {...a11yProps(2)}
              />
            )}
            {isAdmin && (
              <Tab
                icon={<Settings />}
                label={isMobile ? '' : 'Configurações'}
                iconPosition={isMobile ? 'top' : 'start'}
                {...a11yProps(3)}
              />
            )}
          </Tabs>
        </Box>

        <Box sx={{ p: 3 }}>
          <TabPanel value={tabValue} index={0}>
            <SectionHeader
              icon={<Dashboard color="primary" />}
              title="Visão Geral do Orçamento"
            />
            <BudgetOverview
              loading={loading}
              currentBudget={currentBudget}
              remainingBudget={remainingBudget}
              usedPercentage={usedPercentage}
              selectedYear={selectedYear}
              onYearChange={handleYearChange}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <SectionHeader
              icon={<ListAlt color="primary" />}
              title="Solicitações Aprovadas"
            />
            <ApprovedRequests
              loading={loading}
              totalRequests={totalRequests}
              totalRequestsValue={totalRequestsValue}
              startDate={filterDates.startDate}
              endDate={filterDates.endDate}
              onStartDateChange={() => {}}
              onEndDateChange={() => {}}
              onFilter={handleFilterApply}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <SectionHeader
              icon={<Groups color="primary" />}
              title="Avaliações CEAPG"
            />
            <CeapgReviewRequests
              loading={loading}
              requests={ceapgRequests}
              startDate={filterDates.startDate}
              endDate={filterDates.endDate}
              onStartDateChange={() => {}}
              onEndDateChange={() => {}}
              onFilter={handleCeapgFilterApply}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <SettingContainer
              handleBudgetSubmit={handleBudgetSubmit}
              loading={loading}
            />
          </TabPanel>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminDashboardContainer;
