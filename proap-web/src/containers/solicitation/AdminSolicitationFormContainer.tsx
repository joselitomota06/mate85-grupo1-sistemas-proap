import { useMemo } from 'react';

import { Typography } from '@mui/material';
import { FormikValues } from 'formik';

import SolicitantDataFormContainer from './create/SolicitationDataFormContainer';
import FinancingDataFormContainer from './create/EventDetailFormContainer';
import EventDataFormContainer from './create/FinancialDetailFormContainer';
import ReviewDataFormContainer from './review/ReviewDataFormContainer';

import {
  financialDetailFormSchema,
  eventDetailFormSchema,
  INITIAL_FORM_VALUES,
  solicitantionDataFormSchema,
  reviewDataFormSchema,
  SolicitationFormValues,
  INITIAL_REVIEW_FORM_VALUES,
} from './SolicitationFormSchema';
import StepperForm, {
  FormStep,
} from '../../components/stepper-form/StepperForm';
import SolicitationReviewContainer from './review/SolicitationReviewContainer';

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

const defaultProps: SolicitationFormContainerProps = {
  title: 'Editar solicitação de auxílio',
  initialValues: INITIAL_REVIEW_FORM_VALUES,
  labels: {
    submit: 'Editar solicitação',
  },
  onSubmit: () => {},
};

export default function AdminSolicitationFormContainer({
  title = defaultProps.title,
  initialValues = defaultProps.initialValues,
  labels = defaultProps.labels,
  onSubmit = defaultProps.onSubmit,
}: SolicitationFormContainerProps) {
  const evaluateFormSteps: FormStep[] = useMemo(
    () => [
      {
        label: 'Resumo da Solicitação',
        component: SolicitationReviewContainer,
      },
      {
        label: 'Avaliação',
        component: ReviewDataFormContainer,
        schema: reviewDataFormSchema,
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
        steps={evaluateFormSteps}
        validateOnChange={false}
        labels={
          labels || {
            submit: 'Editar solicitação',
          }
        }
      />
    </>
  );
}
