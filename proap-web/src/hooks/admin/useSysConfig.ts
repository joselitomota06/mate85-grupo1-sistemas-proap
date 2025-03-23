import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IRootState, useAppDispatch } from '../../store';
import {
  fetchSystemConfig,
  saveSystemConfig,
} from '../../store/slices/system-config-slice/systemConfigSlice';
import { SystemConfiguration } from '../../types';
import Toast from '../../helpers/notification';

/**
 * Hook personalizado para gerenciar as configurações do sistema
 * Abstrai a lógica de carregar e salvar configurações usando Redux
 */
export function useSysConfig() {
  const dispatch = useAppDispatch();
  const { config, isLoading, error } = useSelector(
    (state: IRootState) => state.systemConfigSlice,
  );

  // Carregar as configurações ao montar o componente
  useEffect(() => {
    if (!config.id) {
      dispatch(fetchSystemConfig());
    }
  }, [dispatch, config.id]);

  /**
   * Salva as configurações do sistema
   * @param newConfig - Novas configurações a serem salvas
   * @param showToast - Se true, exibe mensagens de toast sobre o resultado
   * @returns Um objeto com o resultado da operação
   */
  const saveConfig = async (
    newConfig: SystemConfiguration,
    showToast = true,
  ): Promise<{ success: boolean }> => {
    try {
      const result = await dispatch(saveSystemConfig(newConfig)).unwrap();
      if (showToast && result.success) {
        Toast.success('Configurações atualizadas com sucesso!');
      }
      return { success: true };
    } catch (error) {
      if (showToast) {
        Toast.error('Erro ao atualizar configurações');
      }
      return { success: false };
    }
  };

  /**
   * Recarrega as configurações do sistema a partir do servidor
   */
  const reloadConfig = () => {
    dispatch(fetchSystemConfig());
  };

  return {
    config,
    isLoading,
    error,
    saveConfig,
    reloadConfig,
  };
}
