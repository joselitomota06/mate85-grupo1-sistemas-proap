import { RecoverPasswordFormValues } from '../containers/recover-password/RecoverPasswordSchema'
import { AppDispatch } from '../store'
import api from '.'

export const recoverPassword =
  (values: RecoverPasswordFormValues) => (dispatch: AppDispatch) => {
    return api.post('/reoverPassword', values)
  }