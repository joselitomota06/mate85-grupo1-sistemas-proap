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

export const eventDataFormSchema = Yup.object({
  dataInicio: Yup.string().required('Campo obrigatório'),
  dataFim: Yup.string().required('Campo obrigatório'),
  pais: Yup.string().required('Campo obrigatório'),
  cidade: Yup.string().required('Campo obrigatório'),
  linkHomepage: Yup.string().required('Campo obrigatório'),
  valorInscricao: Yup.number()
    .nullable()
    .required('Campo obrigatório')
    .min(1, 'Insira um valor válido'),
  cartaAceite: Yup.string().required('Campo obrigatório'),
})

export const DetailsEventDataFormSchema = Yup.object({})

export interface SolicitationFormValues {
  email: string
  nomeCompleto: string
  titulo: string
  doi: string
  autores: string

  solicitacaoApoio: boolean | null
  valorSolicitado: number | string
  solicitacaoAuxilioOutrasFontes: boolean | null
  nomeAgenciaFomento: string
  valorSolicitadoAgenciaFormento: number | string

  dataInicio: string
  dataFim: string
  linkHomepage: string
  pais: string
  cidade: string
  valorInscricao: number | null
  cartaAceite: string

  aceiteFinal: boolean
  comprovantePagamento: string
}

export const INITIAL_FORM_VALUES: SolicitationFormValues = {
  email: '',
  nomeCompleto: '',
  titulo: '',
  doi: '',
  autores: '',

  solicitacaoApoio: null,
  valorSolicitado: '',
  solicitacaoAuxilioOutrasFontes: null,
  nomeAgenciaFomento: '',
  valorSolicitadoAgenciaFormento: '',

  dataInicio: '',
  dataFim: '',
  linkHomepage: '',
  pais: '',
  cidade: '',
  valorInscricao: null,
  comprovantePagamento: '',
  cartaAceite: '',

  aceiteFinal: false,
}
