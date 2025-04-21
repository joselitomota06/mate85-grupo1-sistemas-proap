import { useState, useEffect } from 'react';
import { getBudgetSummary } from '../../services/budgetService';

interface UseBudgetPercentageProps {
  year?: string | number | null;
  value?: number | null;
}

export const useBudgetPercentage = ({
  year,
  value,
}: UseBudgetPercentageProps) => {
  const [totalBudget, setTotalBudget] = useState<number | null>(null);
  const [percentageOfBudget, setPercentageOfBudget] = useState<number | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!year || !value) return;

    const fetchBudget = async () => {
      setIsLoading(true);
      try {
        const currentYear =
          typeof year === 'string' ? year.split('/')[2] : year;
        const budgetSummary = await getBudgetSummary(Number(currentYear));
        setTotalBudget(budgetSummary.totalBudget);

        if (budgetSummary.totalBudget > 0 && value) {
          const percentage = (Number(value) / budgetSummary.totalBudget) * 100;
          setPercentageOfBudget(Number(percentage.toFixed(2)));
        }
      } catch (error) {
        console.error('Erro ao buscar orçamento:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBudget();
  }, [year, value]);

  return { totalBudget, percentageOfBudget, isLoading };
};
