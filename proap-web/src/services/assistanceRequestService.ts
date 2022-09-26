import { AppDispatch } from '../store'

import {
  AssistanceRequest,
  updateSolicitations,
} from '../store/slices/assistance-request-slice/assistanceRequestSlice'

import api from '.'

export const getAssistanceRequests = () => (dispatch: AppDispatch) => {
  return api
    .get<AssistanceRequest[]>('assistancerequest/list')
    .then(({ data }) => dispatch(updateSolicitations(data)))
}
