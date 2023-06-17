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

export interface ExtraRequest {
  id: number;

  itemSolicitado: string;
  justificativa: string;
  valorSolicitado: number | null;
	solicitacaoApoio: boolean;
	solicitacaoAuxilioOutrasFontes: boolean;
	nomeSolicitacao: string;
	nomeAgenciaFomento: string;
	situacao: number;
	numeroAta: string;
	dataAprovacao: string;
	valorAprovado: number | null;
	observacao: string;	
	automaticDecText: string;

  createdAt: string;
  updatedAt: string;

  user: {
    id: number;
    alternativePhone: string;
    cpf: string;
    email: string;
    name: string;
    password: string;
  };
}

export interface AssistanceRequest {
  id: number;
  automaticDecText: string;
  
  nomeCompleto: string;
  doi: string;
  autores: string;
  autoresPresentePGCOMP: string;
  valorSolicitado: number | string;
  solicitacaoApoio: boolean | undefined;
  solicitacaoAuxilioOutrasFontes: boolean | undefined;
  nomeAgenciaFomento: string;
  valorSolicitadoAgenciaFomento: number | string;
  valorAprovado: number | undefined;
  dataInicio: string;
  dataFim: string;
  linkHomepage: string;
  pais: string;
  cidade: string;
  valorInscricao: number | undefined;
  cartaAceite: string;
  qualis: string;
  comprovantePagamento: string;
  nomeEvento: string;
  situacao: number;
  dataAprovacao: string;
  numeroAta: number;
  numeroDiariasAprovadas: number;
  observacao: string;
  quantidadeDiariasSolicitadas: number;

  createdAt: string;
  updatedAt: string;

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
