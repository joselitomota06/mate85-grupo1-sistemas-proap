import * as Yup from 'yup';

export interface LoginFormValues {
  username: string;
  password: string;
}

export const INITIAL_FORM_VALUES: LoginFormValues = {
  username: '',
  password: '',
};

export const loginFormSchema = Yup.object({
  username: Yup.string()
    .required('Campo obrigatório')
    .email('Insira um e-mail válido'),
  password: Yup.string().required('Campo obrigatório'),
});
