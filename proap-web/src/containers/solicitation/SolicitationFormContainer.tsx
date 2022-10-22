import { useMemo } from "react";

import { Typography } from "@mui/material";
import { FormikValues } from "formik";

import SolicitantDataFormContainer from "./create/SolicitantDataFormContainer";
import FinancingDataFormContainer from "./create/FinancingDataFormContainer";
import DetailsDataFormContainer from "./create/DetailsDataFormContainer";
import EventDataFormContainer from "./create/EventDataFormContainer";

import {
  detailsEventDataFormSchema,
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
}

export default function SolicitationFormContainer(
  props: SolicitationFormContainerProps
) {
  const { title, initialValues, onSubmit } = props;

  const registerFormSteps: FormStep[] = useMemo(
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
        steps={registerFormSteps}
        validateOnChange={false}
        labels={{
          submit: "Enviar solicitação",
        }}
      />
    </>
  );
}

SolicitationFormContainer.defaultProps = {
  title: "Nova solicitação de auxílio",
  initialValues: INITIAL_FORM_VALUES,
};
