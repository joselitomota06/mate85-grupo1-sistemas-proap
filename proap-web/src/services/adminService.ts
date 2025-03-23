import { SystemConfiguration } from '../types';
import api from './index';

export const getSystemConfiguration =
  async (): Promise<SystemConfiguration> => {
    const response = await api.get('/admin/system-config');

    // Inicializa resourceLinks se não existir no response
    if (!response.data.resourceLinks) {
      response.data.resourceLinks = [];
    }

    return response.data;
  };

export const updateSystemConfiguration = async (
  configuration: SystemConfiguration,
): Promise<SystemConfiguration> => {
  const response = await api.put('/admin/system-config', configuration);
  return response.data;
};

export const getQualisCategories = async (): Promise<string[]> => {
  const response = await api.get('/admin/qualis-categories');
  return response.data;
};

export const saveQualisCategories = async (
  categories: string[],
): Promise<string[]> => {
  const response = await api.post('/admin/qualis-categories', categories);
  return response.data;
};

export const addQualisCategory = async (
  category: string,
): Promise<string[]> => {
  const response = await api.post(`/admin/qualis-categories/${category}`);
  return response.data;
};

export const removeQualisCategory = async (
  category: string,
): Promise<string[]> => {
  const response = await api.delete(`/admin/qualis-categories/${category}`);
  return response.data;
};
