import * as Yup from 'yup';

export const userProfileSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('Email é obrigatório'),
  cpf: Yup.string()
    .required('CPF é obrigatório')
    .length(11, 'CPF deve ter 11 dígitos'),
  phone: Yup.string().required('Telefone é obrigatório'),
  alternativePhone: Yup.string(),
  registrationNumber: Yup.string().required('Matrícula é obrigatória'),
});
