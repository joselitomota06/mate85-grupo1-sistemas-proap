import React, { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import { FormikValues } from "formik";

import ExtraSolicitationFormContainer from "../../containers/extra-solicitation/ExtraSolicitationFormContainer";
import useExtraSolicitation from "../../hooks/solicitation/useExtraSolicitation";
import Toast from "../../helpers/notification";
import { updateExtraAssistanceRequest } from "../../services/extraAssistanceRequestService";
import { ExtraSolicitation } from "../../containers/extra-solicitation/schema";

export default function EditExtraSolicitationPage() {
  const { id } = useParams();
  const { solicitation, isLoading, hasError } = useExtraSolicitation(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasError) navigate("not-found");
  }, [hasError]);

  const handleSubmit = (values: FormikValues) => {
    return updateExtraAssistanceRequest(values as ExtraSolicitation)
      .then(() => {
        Toast.success("Solicitação alterada com sucesso");
        navigate("/");
      })
      .catch(() => Toast.error("Não foi possível alterar a solicitação."));
  };

  return (
    <>
      {isLoading && <LinearProgress />}
      {!isLoading && !hasError && (
        <ExtraSolicitationFormContainer
          title="Editar solicitação extra"
          initialValues={solicitation}
          onSubmit={handleSubmit}
          labels={{
            submit: "Editar solicitação",
          }}
        />
      )}
    </>
  );
}
