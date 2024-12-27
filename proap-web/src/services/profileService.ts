import api from '.';

export interface Profile {
  name: string;
  permissions: string[];
}

export const fetchProfiles = async () => {
  const response = await api.get<Profile[]>('profile/list');
  return {
    status: response.status === 200 ? 'success' : 'error',
    data: response.data,
  };
};
