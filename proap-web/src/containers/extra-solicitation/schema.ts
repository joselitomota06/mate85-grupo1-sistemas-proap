import * as Yup from 'yup';
import { RequestReview } from '../../store/slices/assistance-request-slice/assistanceRequestSlice';

export interface ExtraRequestFormSchema {
  id: number;
  nomeSolicitante: string;
  emailSolicitacao: string;
  justificativa: string;
  valorSolicitado: number | string;
  solicitacaoApoio: boolean | string;
  solicitacaoAuxilioOutrasFontes: boolean | string;
  nomeAgenciaFomento: string;
  valorSolicitadoAgenciaFomento: number | string;
  review?: RequestReview;
  createdAt?: string;
}

export interface ExtraSolicitationFormValues extends ExtraRequestFormSchema {
  aceiteFinal: boolean;
}

export const extraSolicitantDataSchema = Yup.object({
  nomeSolicitante: Yup.string().required('Campo obrigatório'),
  emailSolicitacao: Yup.string()
    .required('Campo obrigatório')
    .email('Insira um e-mail válido.'),

  justificativa: Yup.string()
    .required('Campo obrigatório')
    .max(255, 'A justificativa não pode conter mais que 255 caracteres.'),
});

export const EXTRA_SOLICITATION_INITIAL_VALUES: ExtraSolicitationFormValues = {
  id: 0,
  nomeSolicitante: '',
  emailSolicitacao: '',
  justificativa: '',
  valorSolicitado: '',
  solicitacaoApoio: false,
  solicitacaoAuxilioOutrasFontes: false,
  nomeAgenciaFomento: '',
  valorSolicitadoAgenciaFomento: '',
  aceiteFinal: false,
};
