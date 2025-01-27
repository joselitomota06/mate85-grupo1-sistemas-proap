import { User } from '../auth-type/user';

export interface AssistanceRequest {
  id: number;
  automaticDecText: string;

  tituloPublicacao: string;
  coautores: string[];
  algumCoautorPGCOMP: boolean | null;
  solicitanteDocente: boolean;
  nomeDocente: string;
  nomeDiscente: string;
  discenteNoPrazoDoCurso: boolean | null;
  mesesAtrasoCurso: number | null;
  nomeEvento: string;
  eventoInternacional: boolean;
  dataInicio: string;
  dataFim: string;
  afastamentoParaParticipacao: boolean | null;
  diasAfastamento: number | null;
  linkHomePageEvento: string;
  cidade: string;
  pais: string;
  qualis: string;
  modalidadeParticipacao: string;
  valorInscricao: number;
  linkPaginaInscricao: string;
  quantidadeDiariasSolicitadas: number;
  valorDiaria: number;
  isDolar: boolean;
  cotacaoMoeda: number;
  valorPassagem: number;
  valorTotal: number;
  valorAprovado: number;
  cartaAceite: string | null;
  justificativa: string;
  comprovantePagamento: string | null;
  situacao: number;
  dataAprovacao: string;
  numeroAta: number;
  numeroDiariasAprovadas: number;
  observacao: string;

  createdAt: string | undefined;
  updatedAt: string | undefined;

  user: User;
}
