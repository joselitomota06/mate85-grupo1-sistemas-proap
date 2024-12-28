import { AssistanceRequest } from './AssistanceRequest';

export interface AssistanceRequestListResponse {
  /**
   * Lista de requisições que devem ser exibidas na tela
   */
  list: AssistanceRequest[];
  /**
   * Número total de registros no banco
   */
  total: number;
}
