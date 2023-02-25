import { ExtraSolicitation } from '../containers/extra-solicitation/schema';

import { AppDispatch } from '../store';
import api from '.';
import { updateExtraSolicitations } from '../store/slices/assistance-request-slice/assistanceRequestSlice';

export const getExtraAssistanceRequests = () => (dispatch: AppDispatch) =>
  api
    .get<ExtraSolicitation[]>('extrarequest/list')
    .then(({ data }) => dispatch(updateExtraSolicitations(data)));

export const createExtraAssistanceRequest = (request: ExtraSolicitation) =>
  api.post('extrarequest/create', request);

export const updateExtraAssistanceRequest = (request: ExtraSolicitation) =>
  api.put('extrarequest/update', request);

export const getExtraAssistanceRequestById = (id: number) =>
  api.get<ExtraSolicitation>(`extrarequest/find/${id}`);

export const deleteExtraAssistanceRequest = (id: number) =>
  api.delete(`extrarequest/remove/${id}`);
