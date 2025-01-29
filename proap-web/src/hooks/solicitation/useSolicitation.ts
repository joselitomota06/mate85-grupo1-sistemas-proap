import { useState, useEffect } from 'react';
import { INITIAL_REVIEW_FORM_VALUES } from '../../containers/solicitation/SolicitationFormSchema';
import { localDateToDate } from '../../helpers/conversion';
import { getAssistanceRequestById } from '../../services/assistanceRequestService';

export default function useSolicitation(id: string | undefined) {
  const [solicitation, setSolicitation] = useState(INITIAL_REVIEW_FORM_VALUES);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (id) {
      getAssistanceRequestById(id)
        .then(({ data }) => {
          const { dataInicio, dataFim, dataAprovacao, coautores } = data;

          if (coautores.length == 1 && coautores[0] == '') coautores.pop();

          if (dataAprovacao !== null) {
            setSolicitation({
              ...data,
              dataInicio: localDateToDate(dataInicio),
              dataFim: localDateToDate(dataFim),
              dataAprovacao: localDateToDate(dataAprovacao),
              coautores: coautores,
            });
          } else {
            setSolicitation({
              ...data,
              dataInicio: localDateToDate(dataInicio),
              dataFim: localDateToDate(dataFim),
              coautores: coautores,
            });
          }
        })
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  return { solicitation, isLoading, hasError };
}
