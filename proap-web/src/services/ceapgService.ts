import api from '.';
import { CeapgResponse } from '../types';

export const getPendingCeapgReviews = async (
  startDate?: string,
  endDate?: string,
) => {
  const params: Record<string, string> = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  const response = await api.get('/admin/ceapg/pending', {
    params,
  });
  return response.data as CeapgResponse[];
};

export const getCompletedCeapgReviews = async (
  startDate?: string,
  endDate?: string,
) => {
  const params: Record<string, string> = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  const response = await api.get('/admin/ceapg/completed', {
    params,
  });
  return response.data as CeapgResponse[];
};

export const getAllCeapgReviews = async (
  startDate?: string,
  endDate?: string,
) => {
  const params: Record<string, string> = {};
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  const response = await api.get('/admin/ceapg', {
    params,
  });

  return response.data as CeapgResponse[];
};
