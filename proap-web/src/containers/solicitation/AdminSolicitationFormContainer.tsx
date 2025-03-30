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
  ceapgDataFormSchema,
} from './SolicitationFormSchema';
import StepperForm, {
  FormStep,
} from '../../components/stepper-form/StepperForm';
import SolicitationReviewContainer from './review/SolicitationReviewContainer';
import ProapReviewContainer from './review/ceapg/ProapReviewContainer';
import CeapgDataFormContainer from './review/ceapg/CeapgDataFormContainer';

interface SolicitationFormContainerProps {
  onSubmit: (values: FormikValues) => void;
  initialValues?: SolicitationFormValues;
  isCeapg?: boolean;
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
  isCeapg: false,
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
  isCeapg = defaultProps.isCeapg,
}: SolicitationFormContainerProps) {
  const ceapgFormSteps: FormStep[] = useMemo(
    () => [
      {
        label: 'Resumo da Solicitação',
        component: SolicitationReviewContainer,
      },
      {
        label: 'Resumo da Avaliação da Comissão',
        component: ProapReviewContainer,
      },
      {
        label: 'Avaliação do CEAPG',
        component: CeapgDataFormContainer,
        schema: ceapgDataFormSchema,
      },
    ],
    [],
  );
  const proapComissionFormSteps: FormStep[] = useMemo(
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
        steps={isCeapg ? ceapgFormSteps : proapComissionFormSteps}
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
