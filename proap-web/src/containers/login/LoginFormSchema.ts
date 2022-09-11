import * as Yup from 'yup'

export interface LoginFormValues {
  email: string
  password: string
}

export const INITIAL_FORM_VALUES: LoginFormValues = {
  email: '',
  password: '',
}

export const loginFormSchema = Yup.object({
  email: Yup.string().required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
})
