import { useCallback, useMemo } from "react";

import { useNavigate } from "react-router-dom";

import StepperForm, {
  FormStep,
} from "../../components/stepper-solicitation/StepperForm";

import SolicitantDataFormContainer from "./SolicitantDataFormContainer";
import FinancingDataFormContainer from "./FinancingDataFormContainer";
import EventDataFormContainer from "./EventDataFormContainer";
import DetailsDataFormContainer from "./DetailsDataFormContainer";

import { registerUser } from "../../services/authService";
import { useAppDispatch } from "../../store";

import {
  INITIAL_FORM_VALUES,
  SolicitationFormValues,
  SolicitantDataFormSchema,
  FinancingDataFormSchema,
  EventDataFormSchema,
  DetailsEventDataFormSchema,
} from "./SolicitationFormSchema";
import { FormikValues } from "formik";

export default function SolicitationFormContainer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(() => {
    return dispatch().then(() => navigate("/"));
  }, [dispatch]);

  const registerFormSteps: FormStep[] = useMemo(
    () => [
      {
        label: "Solicitante",
        component: SolicitantDataFormContainer,
        schema: SolicitantDataFormSchema,
      },
      {
        label: "Financiamento",
        component: FinancingDataFormContainer,
        schema: FinancingDataFormSchema,
      },
      {
        label: "Evento",
        component: EventDataFormContainer,
        schema: EventDataFormSchema,
      },
      {
        label: "Detalhes",
        component: DetailsDataFormContainer,
        schema: DetailsEventDataFormSchema,
      },
    ],
    []
  );

  return (
    <StepperForm
      initialValues={INITIAL_FORM_VALUES}
      steps={registerFormSteps}
      onSubmit={handleSubmit}
      validateOnChange={false}
      labels={{
        submit: "Avançar",
      }}
    />
  );
}
