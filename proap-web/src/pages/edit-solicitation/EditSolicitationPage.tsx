import React, { useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormikValues } from "formik";

import SolicitationFormContainer from "../../containers/solicitation/SolicitationFormContainer";
import { updateSolicitation } from "../../services/solicitationService";
import useSolicitation from "../../hooks/solicitation/useSolicitation";
import LinearProgress from "@mui/material/LinearProgress";
import { useAuth } from "../../hooks";
import {
  INITIAL_FORM_VALUES,
  SolicitationFormValues,
} from "../../containers/solicitation/SolicitationFormSchema";
import Toast from "../../helpers/notification";

export default function EditSolicitationPage() {
  const { id } = useParams();
  const { solicitation, isLoading, hasError } = useSolicitation(id);
  const { isAdmin } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (hasError) navigate("not-found");
  }, [hasError]);

  const handleEditSolicitationSubmit = useCallback((values: FormikValues) => {
    updateSolicitation(values as SolicitationFormValues).then(() => {
      Toast.success("Solicitação alterada com sucesso!");
      navigate("/");
    });
  }, []);

  return (
    <>
      {isLoading && <LinearProgress />}
      {!isLoading && !hasError && (
        <>
          {!isAdmin ? (
            <span>TODO</span>
          ) : (
            <SolicitationFormContainer
              onSubmit={handleEditSolicitationSubmit}
              initialValues={{
                ...INITIAL_FORM_VALUES,
                ...solicitation,
                aceiteFinal: false,
              }}
              title="Editar solicitação"
            />
          )}
        </>
      )}
    </>
  );
}
