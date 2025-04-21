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
  dataAvaliacaoProap: string;
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
