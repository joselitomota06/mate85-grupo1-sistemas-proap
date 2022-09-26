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

export const FinancingDataFormSchema = Yup.object({})

export const EventDataFormSchema = Yup.object({})

export const DetailsEventDataFormSchema = Yup.object({})

export interface SolicitationFormValues {
  email: string
  nome: string
  titulo: string
  doi: string
  autores: string

  aceiteFinal: boolean
  cartaAceite: string
  cidade: string
  comprovantePagamento: string
  dataFim: string
  dataInicio: string
  linkHomepage: string
  nomeAgenciaFomento: string
  nomeCompleto: string
  pais: string
  solicitacaoApoio: boolean
  solicitacaoAuxilioOutrasFontes: boolean
  valorInscricao: number
  valorSolicitado: number
  valorSolicitadoAgenciaFormento: string
}

export const INITIAL_FORM_VALUES: SolicitationFormValues = {
  email: '',
  nome: '',
  titulo: '',
  aceiteFinal: false,
  autores: '',
  cartaAceite: '',
  cidade: '',
  comprovantePagamento: '',
  dataFim: '',
  dataInicio: '',
  doi: '',
  linkHomepage: '',
  nomeAgenciaFomento: '',
  nomeCompleto: '',
  pais: '',
  solicitacaoApoio: false,
  solicitacaoAuxilioOutrasFontes: false,
  valorInscricao: 0,
  valorSolicitado: 0,
  valorSolicitadoAgenciaFormento: '',
}
