import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AssistanceRequest {
  id: number
  doi: string
  nomeCompleto: string
  valorSolicitado: number
  valorInscricao: number
  review : {
    createdAt: string,
    dataAprovacao: string,
    id: number,
    numeroAta: string,
    numeroDiariasAprovadas: number,
    observacao: string,
    situacao: number,
    updatedAt: string
  }
  user : {
    id: number
    alternativePhone: string
    cpf: string
    email: string
    name: string
    password: string
  }
}

interface AssistanceRequestSliceState {
  requests: AssistanceRequest[]
}

const INITIAL_STATE: AssistanceRequestSliceState = {
  requests: [],
}

const assistanceRequestSlice = createSlice({
  name: 'solicitation',
  initialState: INITIAL_STATE,
  reducers: {
    updateSolicitations: (
      state,
      action: PayloadAction<AssistanceRequest[]>
    ) => {
      state.requests = action.payload
    },
  },
})

export const { updateSolicitations } = assistanceRequestSlice.actions
export default assistanceRequestSlice
