import { useEffect, useState } from 'react';
import { EXTRA_SOLICITATION_INITIAL_VALUES } from '../../containers/extra-solicitation/schema';
import { getExtraAssistanceRequestById } from '../../services/extraAssistanceRequestService';

export default function useExtraSolicitation(id: string | undefined) {
  const [solicitation, setSolicitation] = useState(
    EXTRA_SOLICITATION_INITIAL_VALUES,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getExtraAssistanceRequestById(Number(id))
      .then(({ data }) =>
        setSolicitation({ ...EXTRA_SOLICITATION_INITIAL_VALUES, ...data }),
      )
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  return { solicitation, isLoading, hasError };
}
