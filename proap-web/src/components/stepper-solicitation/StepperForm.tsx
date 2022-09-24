import { Button, Grid, Step, StepLabel, Stepper } from "@mui/material";
import {
  Form,
  Formik,
  FormikConfig,
  FormikHelpers,
  FormikValues,
} from "formik";
import React, { useCallback, useMemo, useState } from "react";
import { AnySchema } from "yup";
import { StepperCircularProgress } from "./StepperForm.style";

export interface FormStep {
  component: React.FC;
  schema?: AnySchema;
  label: string;
}

interface StepperFormProps<T> extends FormikConfig<T> {
  steps: FormStep[];
  activeStep: number;
  labels: {
    previous?: string;
    submit?: string;
    next?: string;
  };
}

export default function StepperForm(props: StepperFormProps<FormikValues>) {
  const {
    activeStep: initialActiveStep,
    onSubmit,
    labels,
    steps,
    ...formikProps
  } = props;

  const [activeStep, setActiveStep] = useState(initialActiveStep);

  const currentValidationSchema = useMemo(() => {
    const { schema } = steps.at(activeStep) ?? {};
    return schema;
  }, [activeStep]);

  const isLastStep = useMemo(
    () => activeStep === steps.length - 1,
    [activeStep]
  );

  const componentLabels = useMemo(
    () => ({
      previous: "Anterior",
      submit: "Enviar",
      next: "Próximo",
      ...labels,
    }),
    []
  );

  const handleClickPreviousStep = useCallback(() => {
    setActiveStep(Math.max(activeStep - 1, 0));
  }, [activeStep]);

  // # HandleClick Protótipo
  const handleClickNextStep = useCallback(() => {
    setActiveStep(Math.max(activeStep + 1, 0));
  }, [activeStep]);

  // # HandleClick Próximo-Submit
  // const handleClickSubmit = useCallback(
  //   (values: FormikValues, helpers: FormikHelpers<FormikValues>) => {
  //     setActiveStep(Math.min(activeStep + 1, steps.length));
  //     helpers.setSubmitting(false);
  //     if (isLastStep) return onSubmit(values, helpers);
  //     else {
  //       setActiveStep(Math.min(activeStep + 1, steps.length));
  //       helpers.setSubmitting(false);
  //     }
  //   },
  //   [isLastStep, activeStep, onSubmit]
  // );

  return (
    <>
      {/* Head do stepper */}
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={`step-${index}`}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Body do stepper */}
      <Formik
        validationSchema={currentValidationSchema}
        // onSubmit={handleClickSubmit}
        {...formikProps}
      >
        {({ isSubmitting }) => (
          <Form id="stepper-form" noValidate>
            {steps.map(({ component: FormComponent }, index) => (
              <div key={`form-wrapper-${index}`} hidden={index !== activeStep}>
                <FormComponent />
              </div>
            ))}

            {/* Botões */}
            <Grid container justifyContent="space-between">
              {/* Botão Anterior */}
              <Button
                onClick={handleClickPreviousStep}
                disabled={isSubmitting || activeStep === 0}
                variant="outlined"
                type="button"
              >
                {componentLabels.previous}
              </Button>
              {/* Botão Próximo Protótipo */}
              <Button
                onClick={handleClickNextStep}
                variant="outlined"
                type="button"
              >
                {componentLabels.next}
              </Button>

              {/* Botão Próximo-Submit */}
              {/* <Button
                variant="contained"
                type="submit"
                form="stepper-form"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <StepperCircularProgress color="info" size={25} />
                )}
                {!isLastStep ? componentLabels.next : componentLabels.submit}
              </Button> */}
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}

StepperForm.defaultProps = {
  activeStep: 0,
};
