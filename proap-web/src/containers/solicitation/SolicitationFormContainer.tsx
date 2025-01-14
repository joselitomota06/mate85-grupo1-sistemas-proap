import { useMemo } from 'react';

import { Typography } from '@mui/material';
import { FormikValues } from 'formik';

import SolicitationDataFormContainer from './create/SolicitationDataFormContainer';
import FinancingDataFormContainer from './create/FinancingDataFormContainer';
import DetailsDataFormContainer from './create/DetailsDataFormContainer';
import EventDataFormContainer from './create/EventDataFormContainer';

import {
  acceptanceDataFormSchema,
  financialDetailFormSchema,
  eventDetailFormSchema,
  INITIAL_FORM_VALUES,
  solicitantionDataFormSchema,
  SolicitationFormValues,
  solicitantDetailFormSchema,
} from './SolicitationFormSchema';
import StepperForm, {
  FormStep,
} from '../../components/stepper-form/StepperForm';
import SolicitantDetailFormContainer from './create/SolicitantDetailFormContainer';

interface SolicitationFormContainerProps {
  onSubmit: (values: FormikValues) => void;
  initialValues?: SolicitationFormValues;
  title?: string;
  labels?: {
    previous?: string;
    submit?: string;
    next?: string;
  };
}

export default function SolicitationFormContainer(
  props: SolicitationFormContainerProps,
) {
  const { title, initialValues, labels, onSubmit } = props;

  const registerFormSteps: FormStep[] = useMemo(
    () => [
      {
        label: 'Dados da Solicitação',
        component: SolicitationDataFormContainer,
        schema: solicitantionDataFormSchema,
      },
      // {
      //   label: 'Detalhes do Solicitante',
      //   component: SolicitantDetailFormContainer,
      //   schema: solicitantDetailFormSchema,
      // },
      {
        label: 'Detalhamento do Evento',
        component: FinancingDataFormContainer,
        schema: eventDetailFormSchema,
      },
      {
        label: 'Detalhamento Financeiro',
        component: EventDataFormContainer,
        schema: financialDetailFormSchema,
      },
      {
        label: 'Aceite e Justificativa',
        component: DetailsDataFormContainer,
        schema: acceptanceDataFormSchema,
      },
    ],
    [],
  );

  return (
    <>
      <Typography
        variant="h4"
        color="primary"
        fontWeight="bold"
        marginBottom={2}
      >
        {title}
      </Typography>
      <StepperForm
        initialValues={initialValues as FormikValues}
        onSubmit={onSubmit}
        steps={registerFormSteps}
        validateOnChange={false}
        labels={
          labels || {
            submit: 'Enviar solicitação',
          }
        }
      />
    </>
  );
}

SolicitationFormContainer.defaultProps = {
  title: 'Nova solicitação de auxílio',
  initialValues: INITIAL_FORM_VALUES,
  labels: {
    submit: 'Enviar solicitação',
  },
};
