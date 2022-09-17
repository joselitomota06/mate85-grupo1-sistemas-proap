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
  cpf: Yup.string()
    .required('Campo obrigatório')
    .test('validation-cpf', 'CPF inválido', function (value) {
      var Soma
      var Resto
      var i
      Soma = 0
      if (!value || value == '00000000000') return false

      for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(value.substring(i - 1, i)) * (11 - i)
      Resto = (Soma * 10) % 11

      if (Resto == 10 || Resto == 11) Resto = 0
      if (Resto != parseInt(value.substring(9, 10))) return false

      Soma = 0
      for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(value.substring(i - 1, i)) * (12 - i)
      Resto = (Soma * 10) % 11

      if (Resto == 10 || Resto == 11) Resto = 0
      if (Resto != parseInt(value.substring(10, 11))) return false
      return true
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
