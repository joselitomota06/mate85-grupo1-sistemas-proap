import * as Yup from 'yup';

export const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Senha atual é obrigatória'),
  newPassword: Yup.string()
    .required('Nova senha é obrigatória')
    .notOneOf(
      [Yup.ref('currentPassword'), undefined],
      'Nova senha não pode ser igual a senha atual',
    ),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'Senhas não conferem')
    .required('Confirmação de senha é obrigatória'),
});
