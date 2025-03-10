import * as Yup from 'yup';

export interface RecoverPasswordFormValues {
  email: string;
}

export const INITIAL_FORM_VALUES: RecoverPasswordFormValues = {
  email: '',
};

export const recoverPasswordFormSchema = Yup.object({
  email: Yup.string().required('Campo obrigatório'),
});
