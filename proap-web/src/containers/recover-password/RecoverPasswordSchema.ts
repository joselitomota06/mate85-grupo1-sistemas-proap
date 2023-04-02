import * as Yup from 'yup';
import { cpf } from 'cpf-cnpj-validator';

export interface RecoverPasswordFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  cpf: string;
}

export const INITIAL_FORM_VALUES: RecoverPasswordFormValues = {
  email: '',
  password: '',
  confirmPassword: '',
  cpf: '',
};

export const recoverPasswordFormSchema = Yup.object({
  email: Yup.string().required('Campo obrigatório'),
  cpf: Yup.string()
    .required('Campo obrigatório')
    .test(
      'validation-cpf',
      'CPF inválido',
      function (cpfValue: string | undefined) {
        if (cpfValue) return cpf.isValid(cpfValue);
        else return false;
      }
    ),
  password: Yup.string().required('Campo obrigatório'),
  confirmPassword: Yup.string()
    .required('Campo obrigatório')
    .test('same-password', 'As senhas não coincidem', function (value) {
      return this.parent.password == value;
    }),
});
