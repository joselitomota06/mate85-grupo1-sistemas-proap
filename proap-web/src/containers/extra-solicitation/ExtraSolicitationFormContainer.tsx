import React, { useMemo } from 'react';
import StepperForm, {
  FormStep,
} from '../../components/stepper-form/StepperForm';
import { Typography } from '@mui/material';
import { FormikValues } from 'formik';

import ExtraSolicitationDetailsFormContainer from './steps/ExtraSolicitationDetailsContainer';
import ExtraSolicitantDataContainer from './steps/ExtraSolicitantDataContainer';
import {
  extraSolicitantDataSchema,
} from './schema';
import { detailsEventDataFormSchema } from '../solicitation/SolicitationFormSchema';
import { ExtraRequest } from '../../store/slices/assistance-request-slice/assistanceRequestSlice';

interface ExtraSolicitationFormContainerProps {
  initialValues: ExtraRequest;
  onSubmit: (values: FormikValues) => Promise<any>;
  labels?: object;
  title: string;
}

export default function ExtraSolicitationFormContainer(
  props: ExtraSolicitationFormContainerProps
) {
  const { title, initialValues, labels, onSubmit } = props;

  const extraSolicitationFormSteps: FormStep[] = useMemo(
    () => [
      {
        label: 'Solicitante',
        component: ExtraSolicitantDataContainer,
        schema: extraSolicitantDataSchema,
      },
      {
        label: 'Detalhes',
        component: ExtraSolicitationDetailsFormContainer,
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
            submit: 'Criar solicitação',
          }
        }
      />
    </>
  );
}
