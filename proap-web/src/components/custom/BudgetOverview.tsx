import React, { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
  Tooltip,
  useTheme,
  Paper,
} from '@mui/material';
import { AttachMoney, BarChart, InfoOutlined } from '@mui/icons-material';
import {
  BarChart as RechartBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { formatNumberToBRL } from '../../helpers/formatter';
import StatCard from './StatCard';
import {
  SolicitationAdmin,
  BudgetSummaryDTO,
  getBudgetSummary,
  getAvailableYears,
} from '../../services/budgetService';

interface BudgetOverviewProps {
  loading: boolean;
  currentBudget: SolicitationAdmin | null;
  remainingBudget: number | null;
  usedPercentage: number;
  selectedYear: number;
  onYearChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const StyledFormLabel = ({ children, ...props }: any) => (
  <Typography
    variant="subtitle1"
    fontWeight="medium"
    color="text.primary"
    sx={{ mb: 1 }}
    {...props}
  >
    {children}
    {props.required && (
      <Box component="span" sx={{ color: 'error.main', ml: 0.5 }}>
        *
      </Box>
    )}
  </Typography>
);

interface YearBudgetData {
  year: number;
  total: number;
  used: number;
  remaining: number;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({
  loading: externalLoading,
  currentBudget,
  selectedYear,
  onYearChange,
}) => {
  const theme = useTheme();
  const [loading, setLoading] = useState(externalLoading);
  const [budgetSummary, setBudgetSummary] = useState<BudgetSummaryDTO | null>(
    null,
  );
  const [historicalData, setHistoricalData] = useState<YearBudgetData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [yearsLoading, setYearsLoading] = useState(true);

  useEffect(() => {
    const fetchAvailableYears = async () => {
      setYearsLoading(true);
      try {
        const years = await getAvailableYears();
        setAvailableYears(years);
      } catch (err) {
        console.error('Erro ao carregar anos disponíveis:', err);
        setAvailableYears(generateDefaultYearsArray());
      } finally {
        setYearsLoading(false);
      }
    };

    fetchAvailableYears();
  }, []);

  const generateDefaultYearsArray = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2020; year <= currentYear + 2; year++) {
      years.push(year);
    }
    return years;
  };

  const loadBudgetSummary = async (year: number) => {
    setLoading(true);
    setError(null);
    try {
      const summary = await getBudgetSummary(year);
      setBudgetSummary(summary);

      setHistoricalData((prev) => {
        const exists = prev.some((item) => item.year === year);
        if (exists) {
          return prev.map((item) =>
            item.year === year
              ? {
                  year,
                  total: Number(summary.totalBudget),
                  used: Number(summary.usedBudget),
                  remaining: Number(summary.remainingBudget),
                }
              : item,
          );
        } else {
          return [
            ...prev,
            {
              year,
              total: Number(summary.totalBudget),
              used: Number(summary.usedBudget),
              remaining: Number(summary.remainingBudget),
            },
          ].sort((a, b) => a.year - b.year);
        }
      });
    } catch (err) {
      console.error('Erro ao carregar resumo do orçamento:', err);
      setError('Não foi possível carregar o resumo do orçamento');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBudgetSummary(selectedYear);
  }, [selectedYear]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const loadPreviousYears = async () => {
      const yearsToLoad = [currentYear - 1, currentYear - 2, currentYear - 3];
      for (const year of yearsToLoad) {
        try {
          const summary = await getBudgetSummary(year);
          if (Number(summary.totalBudget) > 0) {
            setHistoricalData((prev) => {
              const exists = prev.some((item) => item.year === year);
              if (!exists) {
                return [
                  ...prev,
                  {
                    year,
                    total: Number(summary.totalBudget),
                    used: Number(summary.usedBudget),
                    remaining: Number(summary.remainingBudget),
                  },
                ].sort((a, b) => a.year - b.year);
              }
              return prev;
            });
          }
        } catch (err) {
          console.log(`Sem orçamento para o ano ${year}`);
        }
      }
    };

    if (
      historicalData.length === 0 ||
      (historicalData.length === 1 && historicalData[0].year === selectedYear)
    ) {
      loadPreviousYears();
    }
  }, []);

  const usedPercentage =
    budgetSummary && budgetSummary.totalBudget > 0
      ? Math.min(
          Math.floor(
            (Number(budgetSummary.usedBudget) /
              Number(budgetSummary.totalBudget)) *
              100,
          ),
          100,
        )
      : 0;

  const chartData = historicalData.map((item) => ({
    year: item.year.toString(),
    'Orçamento Total': item.total,
    Utilizado: item.used,
    Restante: item.remaining,
  }));

  // Dados para o gráfico circular
  const pieChartData = budgetSummary
    ? [
        {
          name: 'Utilizado',
          value: Number(budgetSummary.usedBudget),
          color: theme.palette.warning.main,
        },
        {
          name: 'Restante',
          value: Number(budgetSummary.remainingBudget),
          color: theme.palette.success.main,
        },
      ]
    : [];

  // Formatador para o tooltip do gráfico de pizza
  const pieTooltipFormatter = (value: number) => {
    return formatNumberToBRL(value);
  };

  return (
    <>
      <FormControl fullWidth sx={{ mb: 3 }}>
        <StyledFormLabel htmlFor="year-select" required>
          Selecione o Ano
        </StyledFormLabel>
        {yearsLoading ? (
          <Box sx={{ display: 'flex', py: 1 }}>
            <CircularProgress size={20} />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              Carregando anos...
            </Typography>
          </Box>
        ) : (
          <Select
            id="year-select"
            value={selectedYear}
            onChange={onYearChange as any}
            size="small"
            displayEmpty
            sx={{ borderRadius: 1 }}
          >
            {availableYears.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        )}
      </FormControl>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : !budgetSummary || Number(budgetSummary.totalBudget) === 0 ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          Nenhum orçamento definido para o ano {selectedYear}.
        </Alert>
      ) : (
        <Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
              mb: 4,
              alignItems: 'stretch',
            }}
          >
            {/* Cards de estatísticas à esquerda */}
            <Box
              sx={{ flex: '7 1 0%', display: 'flex', flexDirection: 'column' }}
            >
              <Stack spacing={2}>
                <StatCard
                  title="Orçamento Total"
                  value={formatNumberToBRL(Number(budgetSummary.totalBudget))}
                  icon={<AttachMoney />}
                  color="primary.main"
                />

                <StatCard
                  title="Utilizado"
                  value={formatNumberToBRL(Number(budgetSummary.usedBudget))}
                  secondaryText={`${usedPercentage}% do orçamento total`}
                  icon={<AttachMoney />}
                  color="warning.main"
                />

                <StatCard
                  title="Restante"
                  value={formatNumberToBRL(
                    Number(budgetSummary.remainingBudget),
                  )}
                  secondaryText={`${
                    100 - usedPercentage
                  }% do orçamento total restante`}
                  icon={<AttachMoney />}
                  color="success.main"
                />
              </Stack>
            </Box>

            {/* Gráfico circular à direita */}
            <Box sx={{ flex: '5 1 0%', display: 'flex' }}>
              <Paper
                elevation={0}
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 3,
                  borderRadius: 2,
                  border: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    maxHeight: '210px',
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={75}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                        nameKey="name"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartTooltip
                        formatter={(value: number) => [
                          pieTooltipFormatter(value),
                          'Valor',
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Valor no centro do gráfico */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      Total
                    </Typography>
                    <Typography
                      variant="h6"
                      color="text.primary"
                      fontWeight="bold"
                      sx={{ wordBreak: 'break-word', textAlign: 'center' }}
                    >
                      {formatNumberToBRL(Number(budgetSummary.totalBudget))}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>

          {/* Gráfico de barras mostrando dados históricos */}
          {chartData.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  Histórico de Orçamento
                </Typography>
                <Tooltip title="Histórico de orçamentos por ano">
                  <InfoOutlined fontSize="small" color="action" />
                </Tooltip>
              </Box>

              <Box sx={{ height: 300, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartBarChart
                    data={chartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis
                      tickFormatter={(value) =>
                        new Intl.NumberFormat('pt-BR', {
                          notation: 'compact',
                          compactDisplay: 'short',
                        }).format(value)
                      }
                    />
                    <RechartTooltip
                      formatter={(value: number) => formatNumberToBRL(value)}
                    />
                    <Legend />
                    <Bar
                      dataKey="Orçamento Total"
                      fill={theme.palette.primary.main}
                    />
                    <Bar
                      dataKey="Utilizado"
                      fill={theme.palette.warning.main}
                    />
                    <Bar dataKey="Restante" fill={theme.palette.success.main} />
                  </RechartBarChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default BudgetOverview;
