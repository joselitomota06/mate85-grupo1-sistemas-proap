import api from '.';
import { ProfileRole } from '../types';

export const fetchProfiles = async () => {
  const response = await api.get<ProfileRole[]>('profile/list');
  return {
    status: response.status === 200 ? 'success' : 'error',
    data: response.data,
  };
};
