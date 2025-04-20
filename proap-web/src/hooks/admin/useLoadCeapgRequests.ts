import { useState, useCallback } from 'react';

import Toast from '../../helpers/notification';
import { formatDateToAPI } from '../../helpers/conversion';
import { getAllCeapgReviews } from '../../services/ceapgService';
import { CeapgResponse } from '../../types';

export default function useCeapgRequests() {
  const [loading, setLoading] = useState(false);
  const [ceapgRequests, setCeapgRequests] = useState<CeapgResponse[]>([]);

  const getCeapg = useCallback(async (startDate?: string, endDate?: string) => {
    try {
      setLoading(true);

      const start = startDate ? formatDateToAPI(startDate) : undefined;
      const end = endDate ? formatDateToAPI(endDate) : undefined;
      const data = await getAllCeapgReviews(start, end);
      setCeapgRequests(data);
    } catch (err) {
      console.error('Erro ao carregar solicitações CEAPG:', err);
      Toast.error('Erro ao carregar solicitações CEAPG');
    } finally {
      setLoading(false);
    }
  }, []);
  return { ceapgRequests, loading, getCeapg };
}
