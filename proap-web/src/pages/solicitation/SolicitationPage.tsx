import { useCallback } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormikValues } from 'formik';

import SolicitationFormContainer from '../../containers/solicitation/SolicitationFormContainer';
import { InitialSolicitationFormValues } from '../../containers/solicitation/SolicitationFormSchema';
import { submitSolicitation } from '../../services/solicitationService';
import { dateToLocalDate } from '../../helpers/conversion';
import Toast from '../../helpers/notification';
import useHasPermission from '../../hooks/auth/useHasPermission';
import { UnauthorizedPage } from '../unauthorized/UnauthorizedPage';
import { useSysConfig } from '../../hooks/admin/useSysConfig';
import SolicitationsDisabled from '../../components/disabled-features/SolicitationsDisabled';

export default function SolicitationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCanCreateRequest = useHasPermission('CREATE_REQUEST');
  const { config } = useSysConfig();

  const handleSubmitSolicitation = useCallback(
    (values: FormikValues) => {
      const valuesWithCorrectDates: InitialSolicitationFormValues = {
        ...(values as InitialSolicitationFormValues),
        dataInicio: dateToLocalDate(values.dataInicio),
        dataFim: dateToLocalDate(values.dataFim),
      };
      return submitSolicitation(valuesWithCorrectDates).then(() => {
        Toast.success('Solicitação criada com sucesso!');
        navigate('/');
      });
    },
    [dispatch],
  );

  if (!userCanCreateRequest) {
    return <UnauthorizedPage />;
  }

  if (!config.enableSolicitation) {
    return <SolicitationsDisabled />;
  }

  return <SolicitationFormContainer onSubmit={handleSubmitSolicitation} />;
}
