import { useState, useEffect } from 'react';
import { INITIAL_REVIEW_FORM_VALUES } from '../../containers/solicitation/SolicitationFormSchema';
import { localDateToDate } from '../../helpers/conversion';
import { getAssistanceRequestById } from '../../services/assistanceRequestService';

export default function useSolicitation(id: string | undefined) {
  const [solicitation, setSolicitation] = useState(INITIAL_REVIEW_FORM_VALUES);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getAssistanceRequestById(id)
        .then(({ data }) => {
          const { dataInicio, dataFim } = data;
          const { dataAprovacao } = data;

          if (dataAprovacao !== null) {
            setSolicitation({
              ...data,
              dataInicio: localDateToDate(dataInicio),
              dataFim: localDateToDate(dataFim),
              dataAprovacao: localDateToDate(dataAprovacao),
            });
          } else {
            setSolicitation({
              ...data,
              dataInicio: localDateToDate(dataInicio),
              dataFim: localDateToDate(dataFim),
            });
          }
        })
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  console.log(solicitation);

  return { solicitation, isLoading, hasError };
}
