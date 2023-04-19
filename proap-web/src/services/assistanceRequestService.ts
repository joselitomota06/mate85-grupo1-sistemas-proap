import { AppDispatch } from '../store';

import {
  AssistanceRequest,
  updateSolicitations,
} from '../store/slices/assistance-request-slice/assistanceRequestSlice';

import api from '.';
import {
  Solicitation,
  SolicitationFormValues,
} from '../containers/solicitation/SolicitationFormSchema';

export interface AssistanceRequestListResponse {
  /**
   * Lista de requisições que devem ser exibidas na tela
   */
  list: AssistanceRequest[],
  /**
   * Número total de registros no banco
   */
  total: number
}

export const getAssistanceRequests =
  (prop?: keyof AssistanceRequest, ascending?: boolean, page?: number, size?: number) =>
  (dispatch: AppDispatch) => {   
    const defaultPropToFilter: keyof AssistanceRequest = 'nomeSolicitante';

    let requestUrl = 'assistancerequest/list'
      + `?prop=${prop ?? defaultPropToFilter}`
      + `&ascending=${ascending ?? true}`
      + `&page=${page ?? 0}`
      + `&size=${size ?? 10}`;

    return api
      .get<AssistanceRequestListResponse>(requestUrl)
      .then(({ data }) => dispatch(updateSolicitations(data)));
  };

export const getAssistanceRequestById = (id: number | string) => {
  return api.get<SolicitationFormValues>(`assistancerequest/find/${id}`);
};

export const removeAssistanceRequestById = (id: number | string) => {
  return api.delete<SolicitationFormValues>(`assistancerequest/remove/${id}`);
};
