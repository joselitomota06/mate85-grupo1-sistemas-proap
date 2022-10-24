import { useMemo } from "react";

import { Typography } from "@mui/material";
import { FormikValues } from "formik";

import SolicitantDataFormContainer from "./create/SolicitantDataFormContainer";
import FinancingDataFormContainer from "./create/FinancingDataFormContainer";
import EventDataFormContainer from "./create/EventDataFormContainer";

import {
  eventDataFormSchema,
  financingDataFormSchema,
  INITIAL_FORM_VALUES,
  solicitantDataFormSchema,
  SolicitationFormValues,
} from "./SolicitationFormSchema";
import StepperForm, {
  FormStep,
} from "../../components/stepper-form/StepperForm";

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

export default function AdminSolicitationFormContainer(
  props: SolicitationFormContainerProps
) {
  const { title, initialValues, labels, onSubmit } = props;

  const evaluateFormSteps: FormStep[] = useMemo(
    () => [
      {
        label: "Solicitante",
        component: SolicitantDataFormContainer,
        schema: solicitantDataFormSchema,
      },
      {
        label: "Financiamento",
        component: FinancingDataFormContainer,
        schema: financingDataFormSchema,
      },
      {
        label: "Evento",
        component: EventDataFormContainer,
        schema: eventDataFormSchema,
      },
      {
        label: "Conclusão",
        component: () => <span>To be defined</span>,
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
        steps={evaluateFormSteps}
        validateOnChange={false}
        labels={
          labels || {
            submit: "Editar solicitação",
          }
        }
      />
    </>
  );
}

AdminSolicitationFormContainer.defaultProps = {
  title: "Editar solicitação de auxílio",
  initialValues: INITIAL_FORM_VALUES,
  labels: {
    submit: "Editar solicitação",
  },
};
