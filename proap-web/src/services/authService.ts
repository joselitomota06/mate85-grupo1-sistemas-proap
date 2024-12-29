import { RegisterFormValues } from '../containers/register/RegisterFormSchema';
import { LoginFormValues } from '../containers/login/LoginFormSchema';
import { authenticate } from '../store/slices/auth-slice/authSlice';
import { AppDispatch } from '../store';
import api from '.';
import { SignInResponse, User } from '../types';
import { setUser } from '../store/slices/user-profile-slice/userProfileSlice';

export const registerUser =
  (values: RegisterFormValues) => (dispatch: AppDispatch) => {
    return api.post('user/create', values);
  };

export const signIn =
  (values: LoginFormValues) => async (dispatch: AppDispatch) => {
    return await api
      .post<SignInResponse>('authentication/signin', values)
      .then(({ data: { accessToken } }) => {
        dispatch(authenticate(accessToken));
      });
  };

export const listUsers = async () => {
  const response = await api.get<User[]>('user/list');
  return {
    status: response.status === 200 ? 'success' : 'error',
    data: response.data,
  };
};

export const getCurrentUserInfo = async (dispatch: AppDispatch) => {
  return await api.get<User>('user/info').then((response) => {
    dispatch(setUser(response.data));
  });
};

export const updateUser = (values: Partial<User>) => {
  return api.put('user/update', values);
};

export const updateUserCredentials = (email: string) => {
  return api.put(`user/set-admin/${email}`);
};
