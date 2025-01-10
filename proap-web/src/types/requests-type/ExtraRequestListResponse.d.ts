import { ExtraRequest } from './ExtraRequest';

export interface ExtraRequestListResponse {
  /**
   * Lista de solicitações extras que devem ser exibidas na tela
   */
  list: ExtraRequest[];
  /**
   * Número total de registros no banco
   */
  total: number;
}
