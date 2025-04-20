import Toast from '../../helpers/notification';
import { useCallback, useState } from 'react';
import {
  BudgetSummaryDTO,
  getBudgetByYear,
  getBudgetSummary,
  getRemainingBudget,
  SolicitationAdmin,
} from '../../services/budgetService';

type Budget = BudgetSummaryDTO & {
  usedPercentage: number;
};
export default function useLoadBudget() {
  const [loading, setLoading] = useState(false);
  const [budget, setBudget] = useState<Budget>();

  const getBudget = useCallback(async (year: number) => {
    try {
      setLoading(true);
      const summary = await getBudgetSummary(year);

      const usedPercentage =
        summary.totalBudget > 0
          ? Math.floor((summary.usedBudget / summary.totalBudget) * 100)
          : 0;

      setBudget({
        ...summary,
        usedPercentage,
      });
    } catch (error) {
      console.error('Error fetching budget:', error);
      Toast.error('Erro ao carregar orçamento');
    } finally {
      setLoading(false);
    }
  }, []);
  return { budget, loading, getBudget };
}
