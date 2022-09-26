import * as Yup from 'yup'

export const solicitantDataFormSchema = Yup.object({
  nome: Yup.string().required('Campo obrigatório'),
  email: Yup.string()
    .required('Campo obrigatório')
    .email('Insira um e-mail válido'),
  titulo: Yup.string().required('Campo obrigatório'),
  doi: Yup.string().notRequired(),
  autores: Yup.string().required('Campo obrigatório'),
})

export const financingDataFormSchema = Yup.object({
  solicitacaoApoio: Yup.boolean().nullable().required('Campo obrigatório'),
  valorSolicitado: Yup.number()
    .nullable()
    .required('Campo obrigatório')
    .min(1, 'Insira um valor válido'),
  solicitacaoAuxilioOutrasFontes: Yup.boolean()
    .nullable()
    .required('Campo obrigatório'),
  nomeAgenciaFomento: Yup.string().required('Campo obrigatório'),
  valorSolicitadoAgenciaFormento: Yup.number()
    .required('Campo obrigatório')
    .min(1, 'Insira um valor válido'),
})

export const EventDataFormSchema = Yup.object({})

export const DetailsEventDataFormSchema = Yup.object({})

export interface SolicitationFormValues {
  email: string
  nome: string
  titulo: string
  doi: string
  autores: string

  solicitacaoApoio: boolean | null
  valorSolicitado: number | string
  cartaAceite: string
  solicitacaoAuxilioOutrasFontes: boolean | null
  nomeAgenciaFomento: string
  valorSolicitadoAgenciaFormento: number | string

  cidade: string
  comprovantePagamento: string
  dataFim: string
  dataInicio: string
  linkHomepage: string
  nomeCompleto: string
  pais: string
  valorInscricao: number
  aceiteFinal: boolean
}

export const INITIAL_FORM_VALUES: SolicitationFormValues = {
  email: '',
  nome: '',
  titulo: '',
  doi: '',
  autores: '',

  solicitacaoApoio: null,
  valorSolicitado: '',
  cartaAceite: '',
  solicitacaoAuxilioOutrasFontes: null,
  nomeAgenciaFomento: '',
  valorSolicitadoAgenciaFormento: '',

  aceiteFinal: false,
  cidade: '',
  comprovantePagamento: '',
  dataFim: '',
  dataInicio: '',
  linkHomepage: '',
  nomeCompleto: '',
  pais: '',
  valorInscricao: 0,
}
