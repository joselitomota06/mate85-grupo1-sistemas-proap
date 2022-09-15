import * as Yup from 'yup'

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
  cpf: Yup.string().required('Campo obrigatório'),
  login: Yup.string().required('Campo obrigatório'),
  name: Yup.string().required('Campo obrigatório'),
  registration: Yup.string().required('Campo obrigatório'),
})

export interface RegisterFormValues {
  email: string
  phone: string
  password: string
  confirmPassword: string
  alternativePhone: string
  cpf: string
  login: string
  name: string
  registration: string
  type: 'Comum' | 'Administrador'
}

export const INITIAL_FORM_VALUES: RegisterFormValues = {
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  alternativePhone: '',
  cpf: '',
  login: '',
  name: '',
  registration: '',
  type: 'Comum',
}
