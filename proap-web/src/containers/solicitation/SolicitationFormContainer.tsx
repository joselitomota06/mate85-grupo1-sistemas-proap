import { useCallback, useMemo } from 'react'

import { useNavigate } from 'react-router-dom'

import SolicitantDataFormContainer from './SolicitantDataFormContainer'
import FinancingDataFormContainer from './FinancingDataFormContainer'
import EventDataFormContainer from './EventDataFormContainer'
import DetailsDataFormContainer from './DetailsDataFormContainer'

import { INITIAL_FORM_VALUES } from './SolicitationFormSchema'
import StepperForm, {
  FormStep,
} from '../../components/stepper-form/StepperForm'

export default function SolicitationFormContainer() {
  const handleSubmitSolicitation = useCallback(() => {
    console.log('handleSubmit')
  }, [])

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
    <StepperForm
      initialValues={INITIAL_FORM_VALUES}
      steps={registerFormSteps}
      onSubmit={handleSubmitSolicitation}
      validateOnChange={false}
      labels={{
        submit: 'Enviar solicitação',
      }}
    />
  )
}
