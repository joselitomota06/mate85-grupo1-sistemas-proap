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
  list: AssistanceRequest[];
  /**
   * Número total de registros no banco
   */
  total: number;
}

export type AssistanceRequestPropToSort =
  | keyof Omit<AssistanceRequest, 'user'>
  | `user.${keyof AssistanceRequest['user']}`;

export const getAssistanceRequests =
  (
    sortBy?: AssistanceRequestPropToSort,
    ascending?: boolean,
    page?: number,
    size?: number
  ) =>
  (dispatch: AppDispatch) => {
    const defaultPropToFilter: AssistanceRequestPropToSort = 'createdAt';

    let requestUrl =
      'assistancerequest/list' +
      `?sortBy=${sortBy ?? defaultPropToFilter}` +
      `&ascending=${ascending ?? false}` +
      `&page=${page ?? 0}` +
      `&size=${size ?? 10}`;

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
