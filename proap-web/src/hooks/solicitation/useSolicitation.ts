import React, { useState, useEffect } from "react";
import { INITIAL_FORM_VALUES } from "../../containers/solicitation/SolicitationFormSchema";
import { localDateToDate } from "../../helpers/conversion";
import { getAssistanceRequestById } from "../../services/assistanceRequestService";

export default function useSolicitation(id: string | undefined) {
  const [solicitation, setSolicitation] = useState(INITIAL_FORM_VALUES);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      getAssistanceRequestById(id)
        .then(({ data }) => {
          const { dataInicio, dataFim } = data;

          setSolicitation({
            ...data,
            dataInicio: localDateToDate(dataInicio),
            dataFim: localDateToDate(dataFim),
          });
        })
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  console.log(solicitation);
  

  return { solicitation, isLoading, hasError };
}
