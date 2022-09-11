import * as Yup from 'yup'

export const registerFormSchema = Yup.object({
  // email: Yup.string().required('Campo obrigatório'),
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
})

export interface RegisterFormValues {
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export const INITIAL_FORM_VALUES: RegisterFormValues = {
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
}
