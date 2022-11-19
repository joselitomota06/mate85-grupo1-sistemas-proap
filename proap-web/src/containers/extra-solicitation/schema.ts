import * as Yup from "yup";

export interface ExtraSolicitation {
  id: number;
  nomeSolicitante: string;
  emailSolicitacao: string;
  justificativa: string;
  valorSolicitado: number | string;
  solicitacaoApoio: boolean | string;
  solicitacaoAuxilioOutrasFontes: boolean | string;
  nomeAgenciaFomento: string;
  valorSolicitadoAgenciaFomento: number | string;
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

export const extraSolicitationFinancingSchema = Yup.object({
  solicitacaoApoio: Yup.boolean().nullable().required("Campo obrigatório"),
  valorSolicitado: Yup.number()
    .nullable()
    .when("solicitacaoApoio", {
      is: true,
      then: (schema) => schema.required("Campo obrigatório"),
      otherwise: (schema) => schema.notRequired(),
    }),
  solicitacaoAuxilioOutrasFontes: Yup.boolean()
    .nullable()
    .required("Campo obrigatório"),
  nomeAgenciaFomento: Yup.string().when("solicitacaoAuxilioOutrasFontes", {
    is: true,
    then: (schema) => schema.required("Campo obrigatório"),
    otherwise: (schema) => schema.notRequired(),
  }),
  valorSolicitadoAgenciaFomento: Yup.number().when(
    "solicitacaoAuxilioOutrasFontes",
    {
      is: true,
      then: (schema) => schema.required("Campo obrigatório"),
      otherwise: (schema) => schema.notRequired(),
    }
  ),
});

export const EXTRA_SOLICITATION_INITIAL_VALUES: ExtraSolicitation = {
  id: 0,
  nomeSolicitante: "",
  emailSolicitacao: "",
  justificativa: "",
  valorSolicitado: "",
  solicitacaoApoio: false,
  solicitacaoAuxilioOutrasFontes: false,
  nomeAgenciaFomento: "",
  valorSolicitadoAgenciaFomento: "",
};
