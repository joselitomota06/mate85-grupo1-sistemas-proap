import { RecoverPasswordFormValues } from '../containers/recover-password/RecoverPasswordFormSchema'
import { AppDispatch } from '../store'
import api from '.'

export const recoverPassword =
  (values: RecoverPasswordFormValues) => (dispatch: AppDispatch) => {
    return api.post('user/recoverpassword', values)
  }
