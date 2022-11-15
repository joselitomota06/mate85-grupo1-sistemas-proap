import {
  AdminSolicitationFormValues,
  SolicitationFormValues,
} from "../containers/solicitation/SolicitationFormSchema";
import api from ".";

export const submitSolicitation = (values: SolicitationFormValues) =>
  api.post("assistancerequest/create", values);

export const updateSolicitation = (values: SolicitationFormValues) =>
  api.put("assistancerequest/update", values);

export const approveAssistanceRequestById = (
  id: number | string,
  values: AdminSolicitationFormValues
) => api.put(`assistancerequest/approve/${id}`, values);

export const reproveAssistanceRequestById = (
  id: number | string,
  values: AdminSolicitationFormValues
) => api.put(`assistancerequest/reprove/${id}`, values);
