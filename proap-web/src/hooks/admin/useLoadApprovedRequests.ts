import Toast from '../../helpers/notification';
import { useCallback, useState } from 'react';
import {
  AssistanceIdValueDTO,
  getTotalAssistanceRequestsValue,
} from '../../services/budgetService';
import { formatDateToAPI } from '../../helpers/conversion';

export default function useLoadApprovedRequests() {
  const [loading, setLoading] = useState(false);
  const [approvedRequests, setApprovedRequests] = useState<
    AssistanceIdValueDTO[]
  >([]);

  const getApprovedRequests = useCallback(
    async (startDate?: string, endDate?: string) => {
      try {
        setLoading(true);
        const start = startDate ? formatDateToAPI(startDate) : undefined;
        const end = endDate ? formatDateToAPI(endDate) : undefined;
        const data = await getTotalAssistanceRequestsValue(start, end);
        setApprovedRequests(data);
      } catch (error) {
        console.error('Error fetching approved requests:', error);
        Toast.error('Erro ao carregar solicitações aprovadas');
      } finally {
        setLoading(false);
      }
    },
    [],
  );
  return { approvedRequests, loading, getApprovedRequests };
}
