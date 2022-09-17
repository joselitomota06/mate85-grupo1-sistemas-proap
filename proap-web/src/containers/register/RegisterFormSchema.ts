import * as Yup from 'yup'
import { validateCPF } from '../../helpers/validation'

export const registerFormSchema = Yup.object({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('Campo obrigatório'),
  phone: Yup.string().required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
  confirmPassword: Yup.string()
    .required('Campo obrigatório')
    .test('same-password', 'A senhas não coincidem', function (value) {
      return this.parent.password == value
    }),
  cpf: Yup.string()
    .required('Campo obrigatório')
    .test('validation-cpf', 'CPF inválido', function (cpf) {
      return validateCPF(cpf)
    }),
  name: Yup.string().required('Campo obrigatório'),
  registration: Yup.string().required('Campo obrigatório'),
})

export interface RegisterFormValues {
  name: string
  email: string
  cpf: string
  phone: string
  password: string
  confirmPassword: string
  registration: string
  alternativePhone: string
  login: string
  type: 'Comum' | 'Administrador'
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
}
