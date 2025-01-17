import { Button, Grid, Step, StepLabel, Stepper } from '@mui/material';
import {
  Form,
  Formik,
  FormikConfig,
  FormikHelpers,
  FormikValues,
} from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import { AnySchema } from 'yup';
import { StepperCircularProgress } from './StepperForm.style';

export interface FormStep {
  component: React.FC;
  schema?: AnySchema;
  label: string;
}

export interface StepperFormProps<T> extends FormikConfig<T> {
  steps: FormStep[];
  activeStep?: number;
  labels: {
    previous?: string;
    submit?: string;
    next?: string;
  };
}

export default function StepperForm({
  activeStep: initialActiveStep = 0,
  onSubmit,
  labels = {
    previous: 'Anterior',
    submit: 'Enviar',
    next: 'Próximo',
  },
  steps,
  ...formikProps
}: StepperFormProps<FormikValues>) {
  const [activeStep, setActiveStep] = useState(initialActiveStep);

  const currentValidationSchema = useMemo(() => {
    const { schema } = steps.at(activeStep) ?? {};
    return schema;
  }, [activeStep]);

  const isLastStep = useMemo(
    () => activeStep === steps.length - 1,
    [activeStep],
  );

  const componentLabels = useMemo(
    () => ({
      previous: 'Anterior',
      submit: 'Enviar',
      next: 'Próximo',
      ...labels,
    }),
    [],
  );

  const handleClickPreviousStep = useCallback(() => {
    setActiveStep(Math.max(activeStep - 1, 0));
  }, [activeStep]);

  const handleClickSubmit = useCallback(
    (values: FormikValues, helpers: FormikHelpers<FormikValues>) => {
      if (isLastStep) return onSubmit(values, helpers);
      else {
        setActiveStep(Math.min(activeStep + 1, steps.length));
        helpers.setSubmitting(false);
        helpers.setTouched({});
      }
    },
    [isLastStep, activeStep, onSubmit],
  );

  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step key={`step-${index}`}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Formik
        validationSchema={currentValidationSchema}
        onSubmit={handleClickSubmit}
        {...formikProps}
      >
        {({ isSubmitting }) => (
          <Form id="stepper-form" noValidate>
            {steps.map(
              ({ component: FormComponent }, index) =>
                index === activeStep && (
                  <FormComponent key={`form-wrapper-${index}`} />
                ),
            )}
            <Grid
              container
              justifyContent={activeStep === 0 ? 'end' : 'space-between'}
            >
              {activeStep > 0 && (
                <Button
                  onClick={handleClickPreviousStep}
                  disabled={isSubmitting || activeStep === 0}
                  variant="outlined"
                  type="button"
                >
                  {componentLabels.previous}
                </Button>
              )}
              <Button
                variant="contained"
                type="submit"
                form="stepper-form"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <StepperCircularProgress color="info" size={25} />
                )}
                {!isLastStep ? componentLabels.next : componentLabels.submit}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}
