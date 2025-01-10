import * as Yup from 'yup';
import { cpf } from 'cpf-cnpj-validator';

export const personalDataFormSchema = Yup.object({
  name: Yup.string().required('Campo obrigatório'),
  cpf: Yup.string()
    .required('Campo obrigatório')
    .test(
      'validation-cpf',
      'Insira um CPF válido',
      function (cpfValue?: string) {
        return cpfValue != undefined && cpf.isValid(cpfValue);
      },
    ),
  registration: Yup.number().required('Campo obrigatório'),
});

export const contactDataFormSchema = Yup.object({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('Campo obrigatório'),
  phone: Yup.string()
    .required('Campo obrigatório')
    .length(11, 'Número de telefone inválido'),
});

export const passwordFormSchema = Yup.object({
  password: Yup.string().required('Campo obrigatório'),
  confirmPassword: Yup.string()
    .required('Campo obrigatório')
    .test('same-password', 'As senhas não coincidem', function (value) {
      return this.parent.password == value;
    }),
});

export interface RegisterFormValues {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  confirmPassword: string;
  registration: string;
  alternativePhone: string;
  login: string;
  type: 'Comum' | 'Administrador';
}

export const INITIAL_FORM_VALUES: RegisterFormValues = {
  name: '',
  email: '',
  cpf: '',
  phone: '',
  password: '',
  confirmPassword: '',
  registration: '',
  alternativePhone: '',
  login: '',
  type: 'Comum',
};
