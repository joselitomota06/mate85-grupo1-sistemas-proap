import { useMemo } from 'react';

import { Typography } from '@mui/material';
import { FormikValues } from 'formik';

import SolicitationDataFormContainer from './create/SolicitationDataFormContainer';

import {
  financialDetailFormSchema,
  eventDetailFormSchema,
  INITIAL_FORM_VALUES,
  solicitantionDataFormSchema,
  SolicitationFormValues,
  solicitantDetailFormSchema,
  InitialSolicitationFormValues,
  confirmationDataFormSchema,
} from './SolicitationFormSchema';
import StepperForm, {
  FormStep,
} from '../../components/stepper-form/StepperForm';
import SolicitantDetailFormContainer from './create/SolicitantDetailFormContainer';
import ConfirmationFormContainer from './create/ConfirmationFormContainer';
import FinancialDetailFormContainer from './create/FinancialDetailFormContainer';
import EventDetailFormContainer from './create/EventDetailFormContainer';

interface SolicitationFormContainerProps {
  onSubmit: (values: FormikValues) => void;
  initialValues?: InitialSolicitationFormValues;
  title?: string;
  labels?: {
    previous?: string;
    submit?: string;
    next?: string;
  };
}

const defaultProps: SolicitationFormContainerProps = {
  title: 'Nova solicitação de auxílio',
  initialValues: INITIAL_FORM_VALUES,
  labels: {
    submit: 'Enviar solicitação',
  },
  onSubmit: () => {},
};

export default function SolicitationFormContainer({
  title = defaultProps.title,
  initialValues = defaultProps.initialValues,
  labels = defaultProps.labels,
  onSubmit = defaultProps.onSubmit,
}: SolicitationFormContainerProps) {
  const registerFormSteps: FormStep[] = useMemo(
    () => [
      {
        label: 'Detalhes do Solicitante',
        component: SolicitantDetailFormContainer,
        schema: solicitantDetailFormSchema,
      },
      {
        label: 'Dados da Solicitação',
        component: SolicitationDataFormContainer,
        schema: solicitantionDataFormSchema,
      },
      {
        label: 'Detalhamento do Evento',
        component: EventDetailFormContainer,
        schema: eventDetailFormSchema,
      },
      {
        label: 'Detalhamento Financeiro',
        component: FinancialDetailFormContainer,
        schema: financialDetailFormSchema,
      },
      {
        label: 'Confirmação e Revisão',
        component: ConfirmationFormContainer,
        schema: confirmationDataFormSchema,
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
