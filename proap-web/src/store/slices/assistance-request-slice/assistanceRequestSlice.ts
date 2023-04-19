import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExtraSolicitation } from '../../../containers/extra-solicitation/schema';
import { AssistanceRequestListResponse } from '../../../services/assistanceRequestService';

export interface RequestReview {
  createdAt: string;
  dataAprovacao: string;
  id: number;
  numeroAta: string;
  numeroDiariasAprovadas: number;
  observacao: string;
  situacao: number;
  updatedAt: string;
}

export interface AssistanceRequest {
  id: number;
  doi: string;
  nomeSolicitante: string;
  valorSolicitado: number;
  valorInscricao: number;
  createdAt: string;
  updatedAt: string;
  situacao: number;
  automaticDecText: string;
  valorAprovado: number;
  dataAprovacao: string;

  user: {
    id: number;
    alternativePhone: string;
    cpf: string;
    email: string;
    name: string;
    password: string;
  };
}

interface AssistanceRequestSliceState {
  requests: AssistanceRequestListResponse;
  extraRequests: ExtraSolicitation[];
}

const INITIAL_STATE: AssistanceRequestSliceState = {
  requests: {
    list: [],
    total: 0
  },
  extraRequests: [],
};

const assistanceRequestSlice = createSlice({
  name: 'solicitation',
  initialState: INITIAL_STATE,
  reducers: {
    updateSolicitations: (
      state,
      action: PayloadAction<AssistanceRequestListResponse>
    ) => {
      state.requests = action.payload;
    },
    updateExtraSolicitations: (
      state,
      action: PayloadAction<ExtraSolicitation[]>
    ) => {
      state.extraRequests = action.payload;
    },
  },
});

export const { updateSolicitations, updateExtraSolicitations } =
  assistanceRequestSlice.actions;
export default assistanceRequestSlice;
