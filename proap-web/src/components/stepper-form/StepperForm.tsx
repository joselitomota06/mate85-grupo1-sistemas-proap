import { Button, Grid, Step, StepLabel, Stepper } from '@mui/material'
import { Form, Formik, FormikConfig, FormikHelpers } from 'formik'
import React, { useCallback, useMemo, useState } from 'react'
import { AnySchema } from 'yup'

export interface FormStep {
  component: React.FC
  schema?: AnySchema
  label: string
}

interface StepperFormProps<T> extends FormikConfig<T> {
  steps: FormStep[]
  activeStep: number
}

export default function StepperForm<FormValuesType>(
  props: StepperFormProps<FormValuesType>
) {
  const {
    activeStep: initialActiveStep,
    onSubmit,
    steps,
    ...formikProps
  } = props

  const [activeStep, setActiveStep] = useState(initialActiveStep)

  const currentValidationSchema = useMemo(() => {
    const { schema } = steps.at(activeStep) ?? {}
    return schema
  }, [activeStep])

  const isLastStep = useMemo(
    () => activeStep === steps.length - 1,
    [activeStep]
  )

  const handleClickPreviousStep = useCallback(() => {
    setActiveStep(Math.max(activeStep - 1, 0))
  }, [activeStep])

  const handleClickSubmit = useCallback(
    (values: FormValuesType, helpers: FormikHelpers<FormValuesType>) => {
      if (isLastStep) return onSubmit(values, helpers)
      else {
        setActiveStep(Math.min(activeStep + 1, steps.length))
        helpers.setSubmitting(false)
      }
    },
    [isLastStep, activeStep, onSubmit]
  )

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
          <Form id='stepper-form' noValidate>
            {steps.map(({ component: FormComponent }, index) => (
              <div key={`form-wrapper-${index}`} hidden={index !== activeStep}>
                <FormComponent />
              </div>
            ))}
            <Grid container justifyContent='space-between'>
              <Button
                onClick={handleClickPreviousStep}
                disabled={isSubmitting || activeStep === 0}
                variant='outlined'
                type='button'
              >
                Anterior
              </Button>
              <Button
                variant='contained'
                type='submit'
                form='stepper-form'
                disabled={isSubmitting}
              >
                {isLastStep ? 'Enviar' : 'Próximo'}
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  )
}

StepperForm.defaultProps = {
  activeStep: 0,
}
