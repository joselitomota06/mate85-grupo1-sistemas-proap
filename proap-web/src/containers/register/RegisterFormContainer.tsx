import { useCallback, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

import StepperForm, {
  FormStep,
} from '../../components/stepper-form/StepperForm';
import { FormikValues } from 'formik';

import PersonalDataFormContainer from './PersonalDataFormContainer';
import ContactDataFormContainer from './ContactDataFormContainer';
import PasswordFormContainer from './PasswordFormContainer';

import { registerUser } from '../../services/authService';
import Toast from '../../helpers/notification';
import { useAppDispatch } from '../../store';

import {
  INITIAL_FORM_VALUES,
  RegisterFormValues,
  personalDataFormSchema,
  contactDataFormSchema,
  passwordFormSchema,
} from './RegisterFormSchema';

export default function RegisterFormContainer() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (values: FormikValues) => {
      values.login = values.email;
      return dispatch(registerUser(values as RegisterFormValues)).then(() => {
        Toast.success('Conta criada com sucesso!');
        navigate('/');
      });
    },
    [dispatch]
  );

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
  );

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
  );
}
