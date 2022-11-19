import * as Yup from "yup";

export interface ExtraSolicitation {
  id: number;
  nomeSolicitante: string;
  emailSolicitacao: string;
  justificativa: string;
  solicitacaoAuxilioOutrasFontes: boolean;
  valorSolicitado: number | string;
  solicitacaoApoio: boolean;
}

export const extraSolicitantDataSchema = Yup.object({
  nomeSolicitante: Yup.string().required("Campo obrigatório"),
  emailSolicitacao: Yup.string()
    .required("Campo obrigatório")
    .email("Insira um e-mail válido."),

  justificativa: Yup.string()
    .required("Campo obrigatório")
    .max(255, "A justificativa não pode conter mais que 255 caracteres."),
});

export const EXTRA_SOLICITATION_INITIAL_VALUES: ExtraSolicitation = {
  id: 0,
  nomeSolicitante: "",
  emailSolicitacao: "",
  solicitacaoAuxilioOutrasFontes: false,
  solicitacaoApoio: false,
  valorSolicitado: "",
  justificativa: "",
};
