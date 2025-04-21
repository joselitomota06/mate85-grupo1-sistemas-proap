import { useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

type ViewMode = 'table' | 'grid';

/**
 * Hook para gerenciar a preferência de visualização (tabela/grid) do usuário
 *
 * @param userEmail - E-mail do usuário para salvar a preferência específica por usuário
 * @returns Um array contendo o modo de visualização atual e uma função para alterá-lo
 */
export const useViewModePreference = (
  userEmail: string,
): [ViewMode, (newMode: ViewMode) => void] => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Chave única para o localStorage baseada no email do usuário
  const storageKey = `viewMode_preference_${userEmail}`;

  // Função para obter a preferência salva ou determinar o padrão baseado no dispositivo
  const getInitialMode = (): ViewMode => {
    // Apenas lê do localStorage se não for mobile
    if (!isMobile) {
      const savedPreference = localStorage.getItem(storageKey);
      if (savedPreference === 'table' || savedPreference === 'grid') {
        return savedPreference;
      }
    }

    // Se for mobile ou não houver preferência salva válida, usa o padrão baseado no dispositivo
    return isMobile ? 'grid' : 'table';
  };

  const [viewMode, setViewMode] = useState<ViewMode>(getInitialMode);

  // Atualiza o estado quando o isMobile muda (por exemplo, em resize da janela)
  useEffect(() => {
    // Apenas recalcula o modo se não houver preferência salva
    if (!localStorage.getItem(storageKey)) {
      setViewMode(isMobile ? 'grid' : 'table');
    }
  }, [isMobile, storageKey]);

  // Função para atualizar o modo de visualização e salvá-lo no localStorage
  const updateViewMode = (newMode: ViewMode) => {
    setViewMode(newMode);

    // Apenas salva no localStorage se não for mobile
    if (!isMobile) {
      localStorage.setItem(storageKey, newMode);
    }
  };

  return [viewMode, updateViewMode];
};
