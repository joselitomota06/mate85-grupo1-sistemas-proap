import { RecoverPasswordFormValues } from '../containers/recover-password/RecoverPasswordSchema';
import { AppDispatch } from '../store';
import api from '.';
import { StatusResponse } from '../types';
import { ConfirmRecoverPasswordFormValues } from '../containers/recover-password/confirm/ConfirmRecoverPasswordSchema';

export const recoverPassword = async (
  values: RecoverPasswordFormValues,
): Promise<StatusResponse> => {
  try {
    const response = await api.post('/authentication/reset-password', null, {
      params: {
        email: values.email,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const validateToken = async (token: string): Promise<StatusResponse> => {
  try {
    const response = await api.get('authentication/reset-password/validate', {
      params: {
        token: token,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};

export const confirmRecoverPassword = async (
  values: ConfirmRecoverPasswordFormValues,
  token: string,
): Promise<StatusResponse> => {
  try {
    const response = await api.post(
      'authentication/reset-password/confirm',
      { newPassword: values.password },
      {
        params: {
          token: token,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    console.error(error.response.data);
    throw error.response.data;
  }
};
