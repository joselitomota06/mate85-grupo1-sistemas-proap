import * as Yup from 'yup';
import { AssistanceRequest } from '../../types';

export const solicitantionDataFormSchema = Yup.object({
  tituloPublicacao: Yup.string().required('Campo obrigatório'),
  coautores: Yup.array().of(Yup.string()),
  algumCoautorPGCOMP: Yup.boolean().required('Campo obrigatório'),
});

export const solicitantDetailFormSchema = Yup.object({
  solicitanteDocente: Yup.boolean().required('Campo obrigatório'),
  nomeDocente: Yup.string().required('Campo obrigatório'),
  nomeDiscente: Yup.string().when(
    ['solicitanteDocente'],
    (solicitanteDocente, schema) =>
      solicitanteDocente
        ? schema.notRequired()
        : schema.required('Campo obrigatório'),
  ),
  discenteNoPrazoDoCurso: Yup.boolean().when(
    ['solicitanteDocente'],
    (solicitanteDocente, schema) =>
      solicitanteDocente
        ? schema.notRequired()
        : schema.required('Campo obrigatório'),
  ),
  mesesAtrasoCurso: Yup.number().when(
    ['discenteNoPrazoDoCurso'],
    (discenteNoPrazoDoCurso, schema) =>
      discenteNoPrazoDoCurso
        ? schema.notRequired()
        : schema.required('Campo obrigatório'),
  ),
});
export const eventDetailFormSchema = Yup.object({
  nomeEvento: Yup.string().required('Campo obrigatório'),
  eventoInternacional: Yup.boolean().required('Campo obrigatório'),
  dataInicio: Yup.string().required('Campo obrigatório'),
  dataFim: Yup.string()
    .required('Campo obrigatório')
    .min(
      Yup.ref('dataInicio'),
      'Data de fim deve ser maior que a data de início',
    ),
  afastamentoParaParticipacao: Yup.boolean().required('Campo obrigatório'),
  diasAfastamento: Yup.number().when(
    ['afastamentoParaParticipacao'],
    (afastamentoParaParticipacao, schema) =>
      afastamentoParaParticipacao
        ? schema.required('Campo obrigatório')
        : schema.notRequired(),
  ),
  linkHomePageEvento: Yup.string(),
  cidade: Yup.string().required('Campo obrigatório'),
  pais: Yup.string().required('Campo obrigatório'),
  qualis: Yup.string().required('Campo obrigatório'),
  modalidadeParticipacao: Yup.string().required('Campo obrigatório'),
});

export const financialDetailFormSchema = Yup.object({
  valorInscricao: Yup.number()
    .nullable()
    .min(1, 'Insira um valor válido')
    .defined()
    .required('Campo obrigatório'),
  linkPaginaInscricao: Yup.string().required('Campo obrigatório'),
  quantidadeDiariasSolicitadas: Yup.number()
    .nullable()
    .min(1, 'Insira um valor válido')
    .defined()
    .required('Campo obrigatório'),
  valorDiaria: Yup.number()
    .nullable()
    .min(1, 'Insira um valor válido')
    .defined()
    .required('Campo obrigatório'),
  isDolar: Yup.boolean().required('Campo obrigatório'),
  cotacaoMoeda: Yup.number().when(['isDolar'], (isDolar, schema) =>
    isDolar ? schema.required('Campo obrigatório') : schema.notRequired(),
  ),
  valorPassagem: Yup.number()
    .nullable()
    .min(1, 'Insira um valor válido')
    .defined()
    .required('Campo obrigatório'),
});

export const acceptanceDataFormSchema = Yup.object({
  cartaAceite: Yup.string().required('Campo obrigatório'),
  justificativa: Yup.string(),
  aceiteFinal: Yup.boolean()
    .nullable()
    .required('É necessário aceitar os termos para continuar')
    .isTrue('É necessário aceitar os termos para continuar'),
});

export const reviewDataFormSchema = Yup.object({
  situacao: Yup.string().required('Campo obrigatório'),
  dataAprovacao: Yup.string().required('Campo obrigatório'),
  numeroAta: Yup.number().required('Campo obrigatório'),
  numeroDiariasAprovadas: Yup.number().required('Campo obrigatório'),
  observacao: Yup.string().required('Campo obrigatório'),
  valorAprovado: Yup.number().required('Campo obrigatório'),
});

export interface SolicitationFormValues
  extends Omit<AssistanceRequest, 'id' | 'automaticDecText'> {
  aceiteFinal: boolean | undefined;
}

export const INITIAL_FORM_VALUES: SolicitationFormValues = {
  tituloPublicacao: '',
  coautores: [],
  eventoInternacional: false,
  afastamentoParaParticipacao: false,
  diasAfastamento: undefined,
  linkHomePageEvento: '',
  modalidadeParticipacao: '',
  linkPaginaInscricao: '',
  valorDiaria: undefined,
  isDolar: undefined,
  cotacaoMoeda: undefined,
  valorPassagem: undefined,
  algumCoautorPGCOMP: false,
  solicitanteDocente: false,
  nomeDocente: '',
  nomeDiscente: '',
  discenteNoPrazoDoCurso: undefined,
  mesesAtrasoCurso: undefined,
  dataInicio: '',
  dataFim: '',
  pais: '',
  cidade: '',
  valorInscricao: undefined,
  comprovantePagamento: '',
  cartaAceite: '',
  qualis: 'A1',
  aceiteFinal: false,
  situacao: 2,
  dataAprovacao: '',
  numeroAta: 0,
  numeroDiariasAprovadas: 0,
  observacao: '',
  nomeEvento: '',
  quantidadeDiariasSolicitadas: 0,
  valorAprovado: undefined,

  createdAt: '',
  updatedAt: '',

  user: {
    alternativePhone: '',
    cpf: '',
    email: '',
    name: '',
    phone: '',
    registrationNumber: '',
    profileName: '',
  },
};
