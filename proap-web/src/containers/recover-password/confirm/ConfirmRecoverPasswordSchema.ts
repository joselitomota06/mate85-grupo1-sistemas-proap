import * as Yup from 'yup';

export interface ConfirmRecoverPasswordFormValues {
  password: string;
  confirmPassword: string;
}

export const INITIAL_FORM_VALUES: ConfirmRecoverPasswordFormValues = {
  password: '',
  confirmPassword: '',
};

export const confirmRecoverPasswordFormSchema = Yup.object({
  password: Yup.string().required('Campo obrigatório'),
  confirmPassword: Yup.string()
    .required('Campo obrigatório')
    .test('same-password', 'As senhas não coincidem', function (value) {
      return this.parent.password === value;
    }),
});
