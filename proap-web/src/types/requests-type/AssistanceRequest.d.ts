import { User } from '../auth-type/user';

export interface AssistanceRequest {
  id: number;
  automaticDecText: string;

  tituloPublicacao: string;
  coautores: string[];
  algumCoautorPGCOMP: boolean;
  solicitanteDocente: boolean;
  nomeDocente: string;
  nomeDiscente: string;
  discenteNoPrazoDoCurso: boolean | undefined;
  mesesAtrasoCurso: number | undefined;
  nomeEvento: string;
  eventoInternacional: boolean;
  dataInicio: string;
  dataFim: string;
  afastamentoParaParticipacao: boolean;
  diasAfastamento: number | undefined;
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
  valorPassagem: number | undefined;
  valorAprovado: number | undefined;
  cartaAceite: string;
  comprovantePagamento: string;
  situacao: number;
  dataAprovacao: string;
  numeroAta: number;
  numeroDiariasAprovadas: number;
  observacao: string;

  createdAt: string;
  updatedAt: string;

  user: User;
}
