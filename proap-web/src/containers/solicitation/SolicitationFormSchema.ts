import * as Yup from "yup";

export const SolicitantDataFormSchema = Yup.object({
  email: Yup.string()
    .email("Insira um e-mail válido")
    .required("Campo obrigatório"),
  name: Yup.string().required("Campo obrigatório"),
  title: Yup.string().required("Campo obrigatório"),
  coautor: Yup.string().required("Campo obrigatório"),
});

export const FinancingDataFormSchema = Yup.object({});

export const EventDataFormSchema = Yup.object({});

export const DetailsEventDataFormSchema = Yup.object({});

export interface SolicitationFormValues {
  name: string;
  email: string;
  title: string;
  coautor: string;
}

export const INITIAL_FORM_VALUES: SolicitationFormValues = {
  name: "",
  email: "",
  title: "",
  coautor: "",
};
