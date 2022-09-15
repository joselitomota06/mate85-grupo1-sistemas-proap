import * as Yup from 'yup'

export const personalDataFormSchema = Yup.object({
  name: Yup.string().required('Campo obrigatório'),
  cpf: Yup.string().required('Campo obrigatório'),
  registration: Yup.string().required('Campo obrigatório'),
})

export const contactDataFormSchema = Yup.object({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('Campo obrigatório'),
  phone: Yup.string().required('Campo obrigatório'),
})

export const passwordFormSchema = Yup.object({
  password: Yup.string().required('Campo obrigatório'),
  confirmPassword: Yup.string()
    .required('Campo obrigatório')
    .test('same-password', 'As senhas não coincidem', function (value) {
      return this.parent.password == value
    }),
})

export interface RegisterFormValues {
  name: string
  cpf: string
  registration: string
  email: string
  phone: string
  alternativePhone: string
  password: string
  confirmPassword: string
  type: 'Comum' | 'Administrador'
}

export const INITIAL_FORM_VALUES: RegisterFormValues = {
  name: '',
  cpf: '',
  registration: '',
  email: '',
  phone: '',
  alternativePhone: '',
  password: '',
  confirmPassword: '',
  type: 'Comum',
}
