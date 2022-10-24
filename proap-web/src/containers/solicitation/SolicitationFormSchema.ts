import * as Yup from "yup";

export const solicitantDataFormSchema = Yup.object({
  nomeCompleto: Yup.string().required("Campo obrigatório"),
  email: Yup.string()
    .required("Campo obrigatório")
    .email("Insira um e-mail válido"),
  titulo: Yup.string().required("Campo obrigatório"),
  doi: Yup.string().notRequired(),
  autores: Yup.string().required("Campo obrigatório"),
  alunoPGCOMP: Yup.string().required("Campo obrigatório"),
});

export const financingDataFormSchema = Yup.object({
  solicitacaoApoio: Yup.boolean().nullable().required("Campo obrigatório"),
  valorSolicitado: Yup.number().when("solicitacaoApoio", {
    is: "true",
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

export interface Solicitation {
  email: string;
  nomeCompleto: string;
  titulo: string;
  doi: string;
  autores: string;
  alunoPGCOMP: string;

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
}

export interface SolicitationFormValues extends Solicitation {
  aceiteFinal: boolean | undefined;
}

export const INITIAL_FORM_VALUES: SolicitationFormValues = {
  email: "",
  nomeCompleto: "",
  titulo: "",
  doi: "",
  autores: "",
  alunoPGCOMP: "",

  solicitacaoApoio: "",
  valorSolicitado: "",
  solicitacaoAuxilioOutrasFontes: "",
  nomeAgenciaFomento: "",
  valorSolicitadoAgenciaFomento: "",

  dataInicio: "",
  dataFim: "",
  linkHomepage: "",
  pais: "",
  cidade: "",
  valorInscricao: undefined,
  comprovantePagamento: "",
  cartaAceite: "",
  qualis: "",

  aceiteFinal: false,
};
