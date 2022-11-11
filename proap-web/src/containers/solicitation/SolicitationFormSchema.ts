import * as Yup from "yup";

export const solicitantDataFormSchema = Yup.object({
  nomeSolicitacao: Yup.string().required("Campo obrigatório"),
  emailSolicitacao: Yup.string()
    .required("Campo obrigatório")
    .email("Insira um e-mail válido"),
  nomeCompleto: Yup.string(),
  doi: Yup.string().notRequired(),
  autores: Yup.string().required("Campo obrigatório"),
  alunoPGCOMP: Yup.string().required("Campo obrigatório"),
});

export const financingDataFormSchema = Yup.object({
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

export const eventDataFormSchema = Yup.object({
  dataInicio: Yup.string().required("Campo obrigatório"),
  dataFim: Yup.string().required("Campo obrigatório"),
  pais: Yup.string().required("Campo obrigatório"),
  cidade: Yup.string().required("Campo obrigatório"),
  linkHomepage: Yup.string().required("Campo obrigatório"),
  valorInscricao: Yup.number()
    .nullable()
    .required("Campo obrigatório")
    .min(1, "Insira um valor válido"),
  cartaAceite: Yup.string().required("Campo obrigatório"),
  qualis: Yup.string().required("Campo obrigatório"),
});

export const detailsEventDataFormSchema = Yup.object({
  aceiteFinal: Yup.boolean()
    .nullable()
    .required("É necessário aceitar os termos para continuar")
    .isTrue("É necessário aceitar os termos para continuar"),
});

export const reviewDataFormSchema = Yup.object({
  situacao: Yup.boolean().nullable().required("Campo obrigatório"),
  dataAprovacao: Yup.string().required("Campo obrigatório"),
  numeroAta: Yup.number().required("Campo obrigatório"),
  numeroDiariasAprovadas: Yup.number().required("Campo obrigatório"),
  observacao: Yup.string().required("Campo obrigatório"),
});

export interface Solicitation {
  nomeCompleto: string;
  doi: string;
  autores: string;
  alunoPGCOMP: string;
  nomeSolicitacao: string;
  emailSolicitacao: string;
  solicitacaoApoio: string | undefined;
  valorSolicitado: number | string;
  solicitacaoAuxilioOutrasFontes: string | undefined;
  nomeAgenciaFomento: string;
  valorSolicitadoAgenciaFomento: number | string;

  dataInicio: string;
  dataFim: string;
  linkHomepage: string;
  pais: string;
  cidade: string;
  valorInscricao: number | undefined;
  cartaAceite: string;
  qualis: string;

  comprovantePagamento: string;

  situacao: boolean;
  dataAprovacao: string;
  numeroAta: number;
  numeroDiariasAprovadas: number;
  observacao: string;
}

export interface SolicitationFormValues extends Solicitation {
  aceiteFinal: boolean | undefined;
}

export const INITIAL_FORM_VALUES: SolicitationFormValues = {
  nomeCompleto: "",
  doi: "",
  autores: "",
  alunoPGCOMP: "true",

  solicitacaoApoio: "",
  valorSolicitado: "",
  solicitacaoAuxilioOutrasFontes: "",
  nomeAgenciaFomento: "",
  valorSolicitadoAgenciaFomento: "",
  nomeSolicitacao: "",
  emailSolicitacao: "",
  dataInicio: "",
  dataFim: "",
  linkHomepage: "",
  pais: "",
  cidade: "",
  valorInscricao: undefined,
  comprovantePagamento: "",
  cartaAceite: "",
  qualis: "A1",
  aceiteFinal: false,

  situacao: false,
  dataAprovacao: "",
  numeroAta: 0,
  numeroDiariasAprovadas: 0,
  observacao: "",
};
