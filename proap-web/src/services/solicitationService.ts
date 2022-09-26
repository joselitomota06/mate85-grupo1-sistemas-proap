import { SolicitationFormValues } from '../containers/solicitation/SolicitationFormSchema'
import { LoginFormValues } from '../containers/login/LoginFormSchema'
import { authenticate } from '../store/slices/auth-slice/authSlice'
import { AppDispatch } from '../store'
import api from '.'

export const submitSolicitation =
  (values: SolicitationFormValues) => (dispatch: AppDispatch) => {
    return api.post('assistancerequest/create', values)
  }
