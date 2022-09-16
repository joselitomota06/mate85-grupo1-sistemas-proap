import { useCallback, useMemo } from 'react'

import { useNavigate } from 'react-router-dom'

import StepperForm, {
  FormStep,
} from '../../components/stepper-form/StepperForm'

import PersonalDataFormContainer from './PersonalDataFormContainer'
import ContactDataFormContainer from './ContactDataFormContainer'
import PasswordFormContainer from './PasswordFormContainer'

import { registerUser } from '../../services/authService'
import { useAppDispatch } from '../../store'

import {
  INITIAL_FORM_VALUES,
  RegisterFormValues,
  personalDataFormSchema,
  contactDataFormSchema,
  passwordFormSchema,
} from './RegisterFormSchema'

export default function RegisterFormContainer() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    async (values: RegisterFormValues) => {
      return dispatch(registerUser(values)).then(() => navigate('/'))
    },
    [dispatch]
  )

  const registerFormSteps: FormStep[] = useMemo(
    () => [
      {
        label: 'Dados pessoais',
        component: PersonalDataFormContainer,
        schema: personalDataFormSchema,
      },
      {
        label: 'Contato',
        component: ContactDataFormContainer,
        schema: contactDataFormSchema,
      },
      {
        label: 'Senha',
        component: PasswordFormContainer,
        schema: passwordFormSchema,
      },
    ],
    []
  )

  return (
    <StepperForm
      initialValues={INITIAL_FORM_VALUES}
      steps={registerFormSteps}
      onSubmit={handleSubmit}
      validateOnChange={false}
      labels={{
        submit: 'Cadastrar',
      }}
    />
  )
}
