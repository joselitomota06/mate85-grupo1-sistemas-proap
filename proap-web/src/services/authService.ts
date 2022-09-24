import { RegisterFormValues } from '../containers/register/RegisterFormSchema'
import { LoginFormValues } from '../containers/login/LoginFormSchema'
import { authenticate } from '../store/slices/auth-slice/authSlice'
import { AppDispatch } from '../store'
import api from '.'

interface SignInResponse {
  accessToken: string
  tokenType: string
}

export const registerUser =
  (values: RegisterFormValues) => (dispatch: AppDispatch) => {
    return api.post('user/create', values)
  }

export const signIn = (values: LoginFormValues) => (dispatch: AppDispatch) => {
  return api
    .post<SignInResponse>('authentication/signin', values)
    .then(({ data: { accessToken } }) => {
      dispatch(authenticate(accessToken))
    })
}
