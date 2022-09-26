import { useCallback, useMemo } from 'react'

import SolicitantDataFormContainer from './SolicitantDataFormContainer'
import FinancingDataFormContainer from './FinancingDataFormContainer'
import EventDataFormContainer from './EventDataFormContainer'
import DetailsDataFormContainer from './DetailsDataFormContainer'

import { submitSolicitation } from '../../services/solicitationService'
import { FormikValues } from 'formik'

import { INITIAL_FORM_VALUES, SolicitationFormValues } from './SolicitationFormSchema'
import StepperForm, {
  FormStep,
} from '../../components/stepper-form/StepperForm'
import { Typography } from '@mui/material'

import { useAppDispatch } from '../../store'


export default function SolicitationFormContainer() {

  const dispatch = useAppDispatch()
  
  const handleSubmitSolicitation = useCallback(
    (values: FormikValues) => {
      return dispatch(submitSolicitation(values as SolicitationFormValues)).catch(({ response: { status } }) => {
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
      },
      {
        label: 'Financiamento',
        component: FinancingDataFormContainer,
      },
      {
        label: 'Evento',
        component: EventDataFormContainer,
      },
      {
        label: 'Detalhes',
        component: DetailsDataFormContainer,
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
        steps={registerFormSteps}
        onSubmit={handleSubmitSolicitation}
        validateOnChange={false}
        labels={{
          submit: 'Enviar solicitação',
        }}
      />
    </>
  )
}
