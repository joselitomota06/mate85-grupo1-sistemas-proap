import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormikValues } from 'formik';

import SolicitationFormContainer from '../../containers/solicitation/SolicitationFormContainer';
import { SolicitationFormValues } from '../../containers/solicitation/SolicitationFormSchema';
import { submitSolicitation } from '../../services/solicitationService';
import { SolicitationGrid } from './SolicitationPage.style';
import { dateToLocalDate } from '../../helpers/conversion';
import Toast from '../../helpers/notification';

export default function SolicitationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitSolicitation = useCallback(
    (values: FormikValues) => {
      const valuesWithCorrectDates: SolicitationFormValues = {
        ...(values as SolicitationFormValues),
        dataInicio: dateToLocalDate(new Date(values.dataInicio)),
        dataFim: dateToLocalDate(new Date(values.dataFim)),
      };
      return submitSolicitation(valuesWithCorrectDates).then(() => {
        Toast.success('Solicitação criada com sucesso!');
        navigate('/');
      });
    },
    [dispatch]
  );

  return <SolicitationFormContainer onSubmit={handleSubmitSolicitation} />;
}
