import * as Yup from 'yup';
import { AssistanceRequest } from '../../store/slices/assistance-request-slice/assistanceRequestSlice';

export const solicitantDataFormSchema = Yup.object({
  nomeCompleto: Yup.string(),
  doi: Yup.string().notRequired(),
  autores: Yup.string().required('Campo obrigatório'),
  autoresPresentePGCOMP: Yup.string().required('Campo obrigatório'),
});

export const financingDataFormSchema = Yup.object({
  solicitacaoApoio: Yup.boolean().nullable().required('Campo obrigatório'),
  valorSolicitado: Yup.number()
    .nullable()
    .when('solicitacaoApoio', {
      is: true,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.notRequired(),
    }),
  solicitacaoAuxilioOutrasFontes: Yup.boolean()
    .nullable()
    .required('Campo obrigatório'),
  nomeAgenciaFomento: Yup.string().when('solicitacaoAuxilioOutrasFontes', {
    is: true,
    then: (schema) => schema.required('Campo obrigatório'),
    otherwise: (schema) => schema.notRequired(),
  }),
  valorSolicitadoAgenciaFomento: Yup.number().when(
    'solicitacaoAuxilioOutrasFontes',
    {
      is: true,
      then: (schema) => schema.required('Campo obrigatório'),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
});

export const eventDataFormSchema = Yup.object({
  dataInicio: Yup.string().required('Campo obrigatório'),
  dataFim: Yup.string().required('Campo obrigatório'),
  pais: Yup.string().required('Campo obrigatório'),
  cidade: Yup.string().required('Campo obrigatório'),
  linkHomepage: Yup.string().required('Campo obrigatório'),
  quantidadeDiariasSolicitadas: Yup.number()
    .nullable()
    .required('Campo obrigatório')
    .min(1, 'Insira um valor válido'),

  valorInscricao: Yup.number()
    .nullable()
    .required('Campo obrigatório')
    .min(1, 'Insira um valor válido'),

  cartaAceite: Yup.string().required('Campo obrigatório'),
  qualis: Yup.string().required('Campo obrigatório'),

  nomeEvento: Yup.string().required('Campo obrigatório'),
});

export const detailsEventDataFormSchema = Yup.object({
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

export interface SolicitationFormValues extends AssistanceRequest {
  aceiteFinal: boolean | undefined;
}

export const INITIAL_FORM_VALUES: SolicitationFormValues = {
  nomeCompleto: '',
  doi: '',
  autores: '',
  autoresPresentePGCOMP: 'false',

  solicitacaoApoio: '',
  valorSolicitado: '',
  solicitacaoAuxilioOutrasFontes: '',
  nomeAgenciaFomento: '',
  valorSolicitadoAgenciaFomento: '',
  dataInicio: '',
  dataFim: '',
  linkHomepage: '',
  pais: '',
  cidade: '',
  valorInscricao: undefined,
  comprovantePagamento: '',
  cartaAceite: '',
  qualis: 'A1',
  aceiteFinal: false,
  situacao: '2',
  dataAprovacao: '',
  numeroAta: 0,
  numeroDiariasAprovadas: 0,
  observacao: '',
  nomeEvento: '',
  quantidadeDiariasSolicitadas: 0,
  valorAprovado: undefined,

  createdAt: undefined,
  updatedAt: undefined,
  
  user: {
    id: 0,
    alternativePhone: '',
    cpf: '',
    email: '',
    name: '',
    password: ''
  }
};
