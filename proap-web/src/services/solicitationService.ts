import { SolicitationFormValues } from "../containers/solicitation/SolicitationFormSchema";
import { LoginFormValues } from "../containers/login/LoginFormSchema";
import { authenticate } from "../store/slices/auth-slice/authSlice";
import { AppDispatch } from "../store";
import api from ".";

export const submitSolicitation = (values: SolicitationFormValues) =>
  api.post("assistancerequest/create", values);

export const updateSolicitation = (values: SolicitationFormValues) =>
  api.put("assistancerequest/update", values);

export const approveAssistanceRequestById = (id: number | string, values: SolicitationFormValues) => 
  api.put(`assistancerequest/approve/${id}`, values)

export const reproveAssistanceRequestById = (id: number | string, values: SolicitationFormValues) => 
  api.put(`assistancerequest/reprove/${id}`, values)
