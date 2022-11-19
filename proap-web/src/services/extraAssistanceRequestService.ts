import { ExtraSolicitation } from "../containers/extra-solicitation/schema";
import api from ".";

export const createExtraAssistanceRequest = (request: ExtraSolicitation) =>
  api.post("extrarequest/create", request);
