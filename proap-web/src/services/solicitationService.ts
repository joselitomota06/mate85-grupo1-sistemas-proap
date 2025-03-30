import {
  InitialSolicitationFormValues,
  SolicitationFormValues,
} from '../containers/solicitation/SolicitationFormSchema';
import { LoginFormValues } from '../containers/login/LoginFormSchema';
import { authenticate } from '../store/slices/auth-slice/authSlice';
import { AppDispatch } from '../store';
import api from '.';
import { AssistanceRequest } from '../types';
import { AssistanceCeapgReview } from '../types/requests-type/AssistanceCeapgReview';

export const submitSolicitation = (values: InitialSolicitationFormValues) => {
  const formData = new FormData();

  const { file, ...jsonValues } = values;

  formData.append(
    'form',
    new Blob([JSON.stringify(jsonValues)], { type: 'application/json' }),
  );

  if (file) {
    formData.append('file', file as File);
  }

  return api.post('assistancerequest/create-with-file', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateSolicitation = (
  values: SolicitationFormValues,
  file?: File,
) => {
  const formData = new FormData();
  formData.append(
    'form',
    new Blob([JSON.stringify(values)], { type: 'application/json' }),
  );
  if (file) {
    formData.append('file', file);
  }
  return api.put('assistancerequest/update', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const reviewSolicitation = (values: SolicitationFormValues) =>
  api.put('assistancerequest/reviewsolicitation', values);

export const reviewSolicitationCeapg = async (
  id: number,
  values: AssistanceCeapgReview,
) => {
  const response = await api.put(`assistancerequest/${id}/ceapg`, values);
  if (response.status !== 200) {
    throw new Error('Erro ao avaliar a solicitação');
  }

  return response.data;
};
