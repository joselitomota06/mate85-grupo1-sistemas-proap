import { useCallback, useEffect, useState } from 'react';
import {
  BudgetSummaryDTO,
  getAvailableYears,
  getBudgetSummary,
} from '../../services/budgetService';

export default function useLoadHistoricalBudget() {
  const [yearsLoading, setYearsLoading] = useState(false);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [historicalBudget, setHistoricalBudget] = useState<BudgetSummaryDTO[]>(
    [],
  );

  const generateDefaultYearsArray = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 2020; year <= currentYear + 2; year++) {
      years.push(year);
    }
    return years;
  };

  const fetchAvailableYears = useCallback(async () => {
    setYearsLoading(true);
    try {
      const years = await getAvailableYears();
      setAvailableYears(years);
    } catch (error) {
      console.error('Error fetching available years:', error);
      setAvailableYears(generateDefaultYearsArray());
    } finally {
      setYearsLoading(false);
    }
  }, [generateDefaultYearsArray]);

  const fetchHistoricalBudget = useCallback(async () => {
    setYearsLoading(true);
    const currentYear = new Date().getFullYear();
    try {
      const yearsToLoad = [
        currentYear + 1,
        currentYear,
        currentYear - 1,
        currentYear - 2,
        currentYear - 3,
      ];
      const historicalBudget: BudgetSummaryDTO[] = await Promise.all(
        yearsToLoad.map(async (year) => {
          const budgetSummary = await getBudgetSummary(year);
          return {
            year: budgetSummary.year,
            totalBudget: budgetSummary.totalBudget,
            usedBudget: budgetSummary.usedBudget,
            remainingBudget: budgetSummary.remainingBudget,
          };
        }),
      );
      setHistoricalBudget(
        historicalBudget
          .filter((budget) => budget.totalBudget > 0)
          .sort((a, b) => a.year - b.year),
      );
    } catch (error) {
      console.error('Error fetching historical budget:', error);
    } finally {
      setYearsLoading(false);
    }
  }, []);
  return {
    yearsLoading,
    availableYears,
    historicalBudget,
    fetchAvailableYears,
    fetchHistoricalBudget,
  };
}
