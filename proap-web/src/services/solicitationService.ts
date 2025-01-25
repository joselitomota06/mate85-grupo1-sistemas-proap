import {
  InitialSolicitationFormValues,
  SolicitationFormValues,
} from '../containers/solicitation/SolicitationFormSchema';
import { LoginFormValues } from '../containers/login/LoginFormSchema';
import { authenticate } from '../store/slices/auth-slice/authSlice';
import { AppDispatch } from '../store';
import api from '.';

export const submitSolicitation = (values: InitialSolicitationFormValues) => {
  const formData = new FormData();

  const { file, ...jsonValues } = values;

  formData.append(
    'form',
    new Blob([JSON.stringify(jsonValues)], { type: 'application/json' }),
  );

  if (file) {
    formData.append('cartaAceite', file as File);
  }

  return api.post('assistancerequest/create-with-file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateSolicitation = (values: SolicitationFormValues) =>
  api.put('assistancerequest/update', values);

export const reviewSolicitation = (values: SolicitationFormValues) =>
  api.put('assistancerequest/reviewsolicitation', values);
