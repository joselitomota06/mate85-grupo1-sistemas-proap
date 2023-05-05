import { ExtraSolicitation } from '../containers/extra-solicitation/schema';

import { AppDispatch } from '../store';
import api from '.';
import { updateExtraSolicitations } from '../store/slices/assistance-request-slice/assistanceRequestSlice';

export interface ExtraRequestListResponse {
  /**
   * Lista de solicitações extras que devem ser exibidas na tela
   */
  list: ExtraSolicitation[];
  /**
   * Número total de registros no banco
   */
  total: number;
}

export const getExtraAssistanceRequests =
  (
    prop?: keyof ExtraSolicitation,
    ascending?: boolean,
    page?: number,
    size?: number
  ) =>
  (dispatch: AppDispatch) => {
    const defaultPropToFilter: keyof ExtraSolicitation = 'nomeSolicitante';

    let requestUrl = 'extrarequest/list'
      + `?prop=${prop ?? defaultPropToFilter}`
      + `&ascending=${ascending ?? true}`
      + `&page=${page ?? 0}`
      + `&size=${size ?? 10}`;

    return api
      .get<ExtraRequestListResponse>(requestUrl)
      .then(({ data }) => dispatch(updateExtraSolicitations(data)));
  };

export const createExtraAssistanceRequest = (request: ExtraSolicitation) =>
  api.post('extrarequest/create', request);

export const updateExtraAssistanceRequest = (request: ExtraSolicitation) =>
  api.put('extrarequest/update', request);

export const getExtraAssistanceRequestById = (id: number) =>
  api.get<ExtraSolicitation>(`extrarequest/find/${id}`);

export const deleteExtraAssistanceRequest = (id: number) =>
  api.delete(`extrarequest/remove/${id}`);
