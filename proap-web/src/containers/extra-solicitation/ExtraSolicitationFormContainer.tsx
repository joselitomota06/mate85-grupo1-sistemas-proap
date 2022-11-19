import React, { useMemo } from 'react'
import StepperForm, { FormStep } from '../../components/stepper-form/StepperForm';
import { Typography } from '@mui/material';
import { FormikValues } from 'formik';

import {
  detailsEventDataFormSchema,
  financingDataFormSchema,
} from "../solicitation/SolicitationFormSchema";

import FinancingDataFormContainer from "../solicitation/create/FinancingDataFormContainer";
import DetailsDataFormContainer from "../solicitation/create/DetailsDataFormContainer";
import ExtraSolicitantDataContainer from './steps/ExtraSolicitantDataContainer';
import { extraSolicitantDataSchema, ExtraSolicitation } from './schema';

interface ExtraSolicitationFormContainerProps {
  initialValues: ExtraSolicitation
  onSubmit: () => void
  labels?: object
  title: string
}

export default function ExtraSolicitationFormContainer(props: ExtraSolicitationFormContainerProps) {
  const { title, initialValues, labels, onSubmit } = props

  const extraSolicitationFormSteps: FormStep[] = useMemo(
    () => [
      {
        label: "Solicitante",
        component: ExtraSolicitantDataContainer,
        schema: extraSolicitantDataSchema,
      },
      {
        label: "Financiamento",
        component: FinancingDataFormContainer,
        schema: financingDataFormSchema,
      },
      {
        label: "Detalhes",
        component: DetailsDataFormContainer,
        schema: detailsEventDataFormSchema,
      },
    ],
    []
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
        steps={extraSolicitationFormSteps}
        validateOnChange={false}
        labels={
          labels || {
            submit: "Criar solicitação",
          }
        }
      />
    </>
  );
}
