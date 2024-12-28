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
