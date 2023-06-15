import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AssistanceRequestListResponse } from '../../../services/assistanceRequestService';
import { ExtraRequestListResponse } from '../../../services/extraAssistanceRequestService';

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

export interface ExtraRequest
  extends Omit<AssistanceRequest, 'doi' | 'valorInscricao'> {
  titulo: string;
  justificativa: string;
}

export interface AssistanceRequest {
  id: number;
  doi: string;
  nomeSolicitante: string;
  emailSolicitacao: string;
  valorSolicitado: number;
  valorInscricao: number;
  createdAt: string;
  updatedAt: string;
  situacao: number;
  automaticDecText: string;
  valorAprovado: number;
  dataAprovacao: string;
	solicitacaoApoio: boolean;
  solicitacaoAuxilioOutrasFontes: boolean;

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
  extraRequests: ExtraRequestListResponse;
}

const INITIAL_STATE: AssistanceRequestSliceState = {
  requests: {
    list: [],
    total: 0,
  },
  extraRequests: {
    list: [],
    total: 0,
  },
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
      action: PayloadAction<ExtraRequestListResponse>
    ) => {
      state.extraRequests = action.payload;
    },
  },
});

export const { updateSolicitations, updateExtraSolicitations } =
  assistanceRequestSlice.actions;
export default assistanceRequestSlice;
