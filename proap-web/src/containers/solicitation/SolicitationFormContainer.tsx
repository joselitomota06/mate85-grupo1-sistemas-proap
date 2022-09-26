import { useCallback, useMemo } from 'react'

import { submitSolicitation } from '../../services/solicitationService'
import SolicitantDataFormContainer from './SolicitantDataFormContainer'
import FinancingDataFormContainer from './FinancingDataFormContainer'
import DetailsDataFormContainer from './DetailsDataFormContainer'
import EventDataFormContainer from './EventDataFormContainer'

import { FormikValues } from 'formik'

import {
  detailsEventDataFormSchema,
  eventDataFormSchema,
  financingDataFormSchema,
  INITIAL_FORM_VALUES,
  solicitantDataFormSchema,
  SolicitationFormValues,
} from './SolicitationFormSchema'
import StepperForm, {
  FormStep,
} from '../../components/stepper-form/StepperForm'
import { Typography } from '@mui/material'

import { useAppDispatch } from '../../store'

export default function SolicitationFormContainer() {
  const dispatch = useAppDispatch()

  const handleSubmitSolicitation = useCallback(
    (values: FormikValues) => {
      return dispatch(
        submitSolicitation(values as SolicitationFormValues)
      ).catch(({ response: { status } }) => {
        console.log(status)
      })
    },
    [dispatch]
  )

  const registerFormSteps: FormStep[] = useMemo(
    () => [
      {
        label: 'Solicitante',
        component: SolicitantDataFormContainer,
        schema: solicitantDataFormSchema,
      },
      {
        label: 'Financiamento',
        component: FinancingDataFormContainer,
        schema: financingDataFormSchema,
      },
      {
        label: 'Evento',
        component: EventDataFormContainer,
        schema: eventDataFormSchema,
      },
      {
        label: 'Detalhes',
        component: DetailsDataFormContainer,
        schema: detailsEventDataFormSchema,
      },
    ],
    []
  )

  return (
    <>
      <Typography
        variant='h4'
        color='primary'
        fontWeight='bold'
        marginBottom={2}
      >
        Nova solicitação de auxílio
      </Typography>
      <StepperForm
        initialValues={INITIAL_FORM_VALUES}
        onSubmit={handleSubmitSolicitation}
        steps={registerFormSteps}
        validateOnChange={false}
        labels={{
          submit: 'Enviar solicitação',
        }}
      />
    </>
  )
}
