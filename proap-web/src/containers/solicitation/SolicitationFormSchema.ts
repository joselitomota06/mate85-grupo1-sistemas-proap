import * as Yup from 'yup';
import { AssistanceRequest } from '../../types';

export const solicitantionDataFormSchema = Yup.object({
  tituloPublicacao: Yup.string().required('Campo obrigatório'),
  coautores: Yup.array().of(Yup.string()),
  algumCoautorPGCOMP: Yup.boolean().when('coautores', {
    is: (coautores: string[]) => coautores && coautores.length > 0,
    then: () => Yup.string().required('Campo obrigatório'),
    otherwise: () => Yup.string().notRequired(),
  }),
  file: Yup.mixed<File>()
    .nullable()
    .notRequired()
    .test('fileSize', 'O arquivo deve ter no máximo 10MB', (value) => {
      if (!value) return true;
      return value.size <= 10000000;
    }),
});

export const solicitantDetailFormSchema = Yup.object({
  solicitanteDocente: Yup.boolean().required('Campo obrigatório'),
  nomeDocente: Yup.string().required('Campo obrigatório'),
  nomeDiscente: Yup.string().when('solicitanteDocente', {
    is: false,
    then: () => Yup.string().required('Campo obrigatório'),
    otherwise: () => Yup.string().notRequired(),
  }),
  discenteNoPrazoDoCurso: Yup.boolean().when('solicitanteDocente', {
    is: true,
    then: () => Yup.boolean().notRequired(),
    otherwise: () => Yup.boolean().required('Campo obrigatório'),
  }),
  mesesAtrasoCurso: Yup.number()
    .when('discenteNoPrazoDoCurso', {
      is: false,
      then: () => Yup.number().required('Campo obrigatório'),
      otherwise: () => Yup.number().notRequired(),
    })
    .integer('Deve ser um número inteiro')
    .min(1, 'O valor mínimo é 1'),
});
export const eventDetailFormSchema = Yup.object({
  nomeEvento: Yup.string().required('Campo obrigatório'),
  eventoInternacional: Yup.boolean().required('Campo obrigatório'),
  dataInicio: Yup.string().required('Campo obrigatório'),
  dataFim: Yup.string()
    .required('Campo obrigatório')
    .test(
      'dataFim-maior-que-dataInicio',
      'Data de término deve ser maior ou igual a data de início',
      function (value) {
        const { dataInicio } = this.parent;
        return value && dataInicio && new Date(value) >= new Date(dataInicio);
      },
    ),
  afastamentoParaParticipacao: Yup.boolean().required('Campo obrigatório'),
  diasAfastamento: Yup.number().when('afastamentoParaParticipacao', {
    is: true,
    then: () => Yup.number().required('Campo obrigatório'),
    otherwise: () => Yup.number().notRequired(),
  }),
  linkHomePageEvento: Yup.string().url('Insira uma URL válida'),
  cidade: Yup.string().required('Campo obrigatório'),
  pais: Yup.string().required('Campo obrigatório'),
  qualis: Yup.string().required('Campo obrigatório'),
  modalidadeParticipacao: Yup.string().required('Campo obrigatório'),
});

export const financialDetailFormSchema = Yup.object({
  valorInscricao: Yup.number()
    .min(0, 'Insira um valor válido')
    .defined()
    .required('Campo obrigatório'),
  linkPaginaInscricao: Yup.string()
    .url('Insira uma URL válida')
    .required('Campo obrigatório'),
  quantidadeDiariasSolicitadas: Yup.number()
    .min(0, 'Insira um valor válido')
    .defined()
    .required('Campo obrigatório'),
  valorDiaria: Yup.number()
    .min(0, 'Insira um valor válido')
    .defined()
    .when('quantidadeDiariasSolicitadas', {
      is: (quantidadeDiariasSolicitadas: number) =>
        quantidadeDiariasSolicitadas > 0,
      then: () => Yup.number().required('Campo obrigatório'),
      otherwise: () => Yup.number().notRequired(),
    }),
  ultimaDiariaIntegral: Yup.boolean().required('Campo obrigatório'),
  isDolar: Yup.boolean().required('Campo obrigatório'),
  cotacaoMoeda: Yup.number()
    .when('isDolar', {
      is: true,
      then: () => Yup.number().required('Campo obrigatório'),
      otherwise: () => Yup.number().notRequired(),
    })
    .defined()
    .min(1, 'Insira um valor válido'),
  valorPassagem: Yup.number()
    .min(0, 'Insira um valor válido')
    .defined()
    .when('solitanteDocente', {
      is: true,
      then: () => Yup.number().required('Campo obrigatório'),
      otherwise: () => Yup.number().notRequired(),
    }),
  countryGroup: Yup.string().when('isDolar', {
    is: true,
    then: () => Yup.string().required('Selecione o grupo do país'),
    otherwise: () => Yup.string().notRequired(),
  }),
});
export const confirmationDataFormSchema = Yup.object({
  // justificativa: Yup.string(),
  aceiteFinal: Yup.boolean()
    .nullable()
    .required('É necessário aceitar os termos para continuar')
    .isTrue('É necessário aceitar os termos para continuar'),
});

export const reviewDataFormSchema = Yup.object({
  situacao: Yup.number()
    .required('Campo obrigatório')
    .oneOf([1, 2], 'Situação deve ser Aprovado ou Reprovado'),
  dataAprovacao: Yup.string().required('Campo obrigatório'),
  numeroAta: Yup.number().required('Campo obrigatório'),
  numeroDiariasAprovadas: Yup.number().required('Campo obrigatório'),
  observacao: Yup.string().notRequired(),
  valorAprovado: Yup.number().required('Campo obrigatório'),
});

export const ceapgDataFormSchema = Yup.object({
  custoFinalCeapg: Yup.number().required('Campo obrigatório'),
  observacoesCeapg: Yup.string().notRequired(),
});

export interface SolicitationFormValues
  extends Omit<AssistanceRequest, 'automaticDecText'> {
  aceiteFinal: boolean | undefined;
}

export type InitialSolicitationFormValues = Pick<
  AssistanceRequest,
  | 'tituloPublicacao'
  | 'coautores'
  | 'algumCoautorPGCOMP'
  | 'solicitanteDocente'
  | 'nomeDocente'
  | 'nomeDiscente'
  | 'discenteNoPrazoDoCurso'
  | 'mesesAtrasoCurso'
  | 'nomeEvento'
  | 'eventoInternacional'
  | 'dataInicio'
  | 'dataFim'
  | 'afastamentoParaParticipacao'
  | 'diasAfastamento'
  | 'linkHomePageEvento'
  | 'cidade'
  | 'pais'
  | 'qualis'
  | 'modalidadeParticipacao'
  | 'valorInscricao'
  | 'linkPaginaInscricao'
  | 'quantidadeDiariasSolicitadas'
  | 'valorDiaria'
  | 'ultimaDiariaIntegral'
  | 'isDolar'
  | 'cotacaoMoeda'
  | 'valorPassagem'
  | 'valorTotal'
  | 'justificativa'
  | 'cartaAceite'
> & {
  file: File | null;
  aceiteFinal: boolean | undefined;
  countryGroup?: string;
};

export const INITIAL_FORM_VALUES: InitialSolicitationFormValues = {
  tituloPublicacao: '',
  coautores: [],
  eventoInternacional: false,
  afastamentoParaParticipacao: null,
  diasAfastamento: null,
  linkHomePageEvento: '',
  modalidadeParticipacao: '',
  linkPaginaInscricao: '',
  valorDiaria: 0,
  ultimaDiariaIntegral: false,
  isDolar: false,
  cotacaoMoeda: 1,
  valorPassagem: 0,
  valorTotal: 0,
  algumCoautorPGCOMP: false,
  solicitanteDocente: false,
  nomeDocente: '',
  nomeDiscente: '',
  discenteNoPrazoDoCurso: null,
  mesesAtrasoCurso: null,
  dataInicio: '',
  dataFim: '',
  pais: '',
  cidade: '',
  valorInscricao: 0,
  qualis: 'A1',
  nomeEvento: '',
  quantidadeDiariasSolicitadas: 0,
  file: null,
  aceiteFinal: false,
  justificativa: '',
  cartaAceite: null,
  countryGroup: '',
};

export const INITIAL_REVIEW_FORM_VALUES: SolicitationFormValues = {
  id: undefined,
  tituloPublicacao: '',
  coautores: [],
  eventoInternacional: false,
  afastamentoParaParticipacao: null,
  diasAfastamento: null,
  linkHomePageEvento: '',
  modalidadeParticipacao: '',
  linkPaginaInscricao: '',
  valorDiaria: 0,
  ultimaDiariaIntegral: false,
  isDolar: false,
  cotacaoMoeda: 1,
  valorPassagem: 0,
  valorTotal: 0,
  algumCoautorPGCOMP: false,
  solicitanteDocente: false,
  nomeDocente: '',
  nomeDiscente: '',
  discenteNoPrazoDoCurso: null,
  mesesAtrasoCurso: null,
  dataInicio: '',
  dataFim: '',
  pais: '',
  cidade: '',
  valorInscricao: 0,
  qualis: 'A1',
  nomeEvento: '',
  quantidadeDiariasSolicitadas: 0,
  cartaAceite: null,
  aceiteFinal: false,
  justificativa: '',
  situacao: 0,
  dataAprovacao: '',
  numeroAta: 0,
  numeroDiariasAprovadas: 0,
  observacao: '',
  valorAprovado: 0,
  comprovantePagamento: null,
  createdAt: undefined,
  updatedAt: undefined,
  percentualOrcamentoAnual: 0,
  custoFinalCeapg: 0,
  observacoesCeapg: '',
  user: {
    name: '',
    cpf: '',
    email: '',
    phone: '',
    alternativePhone: '',
    registrationNumber: '',
    profileName: '',
  },
  avaliadorProap: {
    name: '',
    cpf: '',
    email: '',
    phone: '',
    alternativePhone: '',
    registrationNumber: '',
    profileName: '',
  },
  avaliadorCeapg: {
    name: '',
    cpf: '',
    email: '',
    phone: '',
    alternativePhone: '',
    registrationNumber: '',
    profileName: '',
  },
};
