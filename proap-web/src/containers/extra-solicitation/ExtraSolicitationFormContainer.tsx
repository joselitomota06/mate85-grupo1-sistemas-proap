import React, { useMemo } from "react";
import StepperForm, {
  FormStep,
} from "../../components/stepper-form/StepperForm";
import { Typography } from "@mui/material";
import { FormikValues } from "formik";

import { detailsEventDataFormSchema } from "../solicitation/SolicitationFormSchema";

import DetailsDataFormContainer from "../solicitation/create/DetailsDataFormContainer";
import ExtraSolicitantDataContainer from "./steps/ExtraSolicitantDataContainer";
import {
  extraSolicitantDataSchema,
  ExtraSolicitation,
  extraSolicitationFinancingSchema,
} from "./schema";
import ExtraSolicitationFinancingContainer from "./steps/ExtraSolicitationFinancingContainer";

interface ExtraSolicitationFormContainerProps {
  initialValues: ExtraSolicitation;
  onSubmit: () => void;
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
        label: "Solicitante",
        component: ExtraSolicitantDataContainer,
        schema: extraSolicitantDataSchema,
      },
      {
        label: "Financiamento",
        component: ExtraSolicitationFinancingContainer,
        schema: extraSolicitationFinancingSchema,
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
