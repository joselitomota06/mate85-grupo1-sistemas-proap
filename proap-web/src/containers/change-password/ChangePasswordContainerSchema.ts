import * as Yup from 'yup';

export const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Senha atual é obrigatória'),
  newPassword: Yup.string()
    .required('Nova senha é obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .notOneOf(
      [Yup.ref('currentPassword'), undefined],
      'Nova senha não pode ser igual a senha atual',
    ),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), undefined], 'Senhas não conferem')
    .required('Confirmação de senha é obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres'),
});
