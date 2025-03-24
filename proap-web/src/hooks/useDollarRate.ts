import { useEffect, useState, useCallback } from 'react';
import getCurrency from '../services/currencyService';

interface DollarRate {
  rate: string;
  updatedAt: string;
}

function useDollarRate() {
  const [dollarRate, setDollarRate] = useState<DollarRate>();
  const [errorDollarRate, setErrorDollarRate] = useState('');
  const [loadingDollarRate, setLoadingDollarRate] = useState(false);

  const fetchDollarRate = useCallback(async () => {
    setLoadingDollarRate(true);
    setErrorDollarRate('');

    try {
      const response = await getCurrency();
      const exchangeKey = Object.keys(response)[0];
      const rate = response[exchangeKey].bid;
      const updatedAt = Date.now().toString();

      setDollarRate({
        rate,
        updatedAt,
      });

      localStorage.setItem('dollarRate', rate);
      localStorage.setItem('dolarRateUpdatedAt', updatedAt);

      return { success: true };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao obter cotação';
      setErrorDollarRate(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoadingDollarRate(false);
    }
  }, []);

  const reloadDollarRate = useCallback(() => {
    return fetchDollarRate();
  }, [fetchDollarRate]);

  useEffect(() => {
    const lastUpdate = localStorage.getItem('dolarRateUpdatedAt');
    const lastRate = localStorage.getItem('dollarRate');
    const oneHourAgo = Date.now() - 1000 * 60 * 60;

    if (lastUpdate && lastRate && Number(lastUpdate) > oneHourAgo) {
      setDollarRate({
        rate: lastRate,
        updatedAt: lastUpdate,
      });
      return;
    }

    fetchDollarRate();
  }, [fetchDollarRate]);

  return { dollarRate, errorDollarRate, loadingDollarRate, reloadDollarRate };
}

export default useDollarRate;
