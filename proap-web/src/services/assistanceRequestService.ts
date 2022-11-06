import { AppDispatch } from '../store'

import {
  AssistanceRequest,
  updateSolicitations,
} from '../store/slices/assistance-request-slice/assistanceRequestSlice'

import api from '.'
import { Solicitation, SolicitationFormValues } from '../containers/solicitation/SolicitationFormSchema'

export const getAssistanceRequests = () => (dispatch: AppDispatch) => {
  return api
    .get<AssistanceRequest[]>('assistancerequest/list')
    .then(({ data }) => dispatch(updateSolicitations(data)))
}

export const getAssistanceRequestById = (id: number | string) => {
  return api.get<SolicitationFormValues>(`assistancerequest/find/${id}`)
}
