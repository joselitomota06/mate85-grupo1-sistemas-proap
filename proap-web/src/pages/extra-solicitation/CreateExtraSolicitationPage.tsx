import { FormikValues } from 'formik';
import React from 'react';

import ExtraSolicitationFormContainer from '../../containers/extra-solicitation/ExtraSolicitationFormContainer';
import { EXTRA_SOLICITATION_INITIAL_VALUES } from '../../containers/extra-solicitation/ExtraSolicitationFormSchema';
import { createExtraAssistanceRequest } from '../../services/extraAssistanceRequestService';
import Toast from '../../helpers/notification';
import { useNavigate } from 'react-router-dom';
import { ExtraRequest } from '../../types/requests-type/ExtraRequest';
import { useSysConfig } from '../../hooks/admin/useSysConfig';
import SolicitationsDisabled from '../../components/disabled-features/SolicitationsDisabled';

export default function ExtraSolicitationPage() {
  const navigate = useNavigate();
  const { config } = useSysConfig();

  const handleSubmit = (values: FormikValues) => {
    return createExtraAssistanceRequest(values as ExtraRequest).then(() => {
      Toast.success('Solicitação criada com sucesso');
      navigate('/');
    });
  };

  if (!config.enableSolicitation) {
    return <SolicitationsDisabled />;
  }

  return (
    <ExtraSolicitationFormContainer
      title="Criar solicitação extra"
      onSubmit={handleSubmit}
      initialValues={EXTRA_SOLICITATION_INITIAL_VALUES}
    />
  );
}
