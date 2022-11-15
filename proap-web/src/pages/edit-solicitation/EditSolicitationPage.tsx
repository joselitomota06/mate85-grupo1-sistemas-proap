import React, { useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormikValues } from "formik";

import SolicitationFormContainer from "../../containers/solicitation/SolicitationFormContainer";
import {
  updateSolicitation,
  approveAssistanceRequestById,
  reproveAssistanceRequestById,
} from "../../services/solicitationService";
import useSolicitation from "../../hooks/solicitation/useSolicitation";
import LinearProgress from "@mui/material/LinearProgress";
import { useAuth } from "../../hooks";
import {
  AdminSolicitationFormValues,
  INITIAL_ADMIN_FORM_VALUES,
  INITIAL_FORM_VALUES,
  SolicitationFormValues,
} from "../../containers/solicitation/SolicitationFormSchema";
import Toast from "../../helpers/notification";
import { dateToLocalDate } from "../../helpers/conversion";
import AdminSolicitationFormContainer from "../../containers/solicitation/AdminSolicitationFormContainer";
import { useDispatch } from "react-redux";

export default function EditSolicitationPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { solicitation, isLoading, hasError } = useSolicitation(id);
  const { isAdmin } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (hasError) navigate("/not-found");
  }, [hasError]);

  const handleEditSolicitationSubmit = useCallback(
    (values: FormikValues) => {
      if (isAdmin) {
        const {
          review: { situacao },
        } = values;
        const valuesWithCorrectDates: AdminSolicitationFormValues = {
          ...(values as AdminSolicitationFormValues),
          dataInicio: dateToLocalDate(new Date(values.dataInicio)),
          dataFim: dateToLocalDate(new Date(values.dataFim)),
          review: {
            ...values.review,
            situacao: Boolean(values.review.situacao),
            dataAprovacao: dateToLocalDate(
              new Date(values.review.dataAprovacao)
            ),
          },
        };

        if (situacao) {
          return approveAssistanceRequestById(values.id, valuesWithCorrectDates)
            .then(() => {
              Toast.success("Solicitação avaliada com sucesso!");
              navigate("/");
            })
            .catch(() => {
              Toast.error("Falha ao avaliar a solicitação");
            });
        } else {
          return reproveAssistanceRequestById(values.id, valuesWithCorrectDates)
            .then(() => {
              Toast.success("Solicitação avaliada com sucesso!");
              navigate("/");
            })
            .catch(() => {
              Toast.error("Falha ao avaliar a solicitação");
            });
        }
      } else {
        const valuesWithCorrectDates: SolicitationFormValues = {
          ...(values as SolicitationFormValues),
          dataInicio: dateToLocalDate(new Date(values.dataInicio)),
          dataFim: dateToLocalDate(new Date(values.dataFim)),
        };

        updateSolicitation(valuesWithCorrectDates)
          .then(() => {
            Toast.success("Solicitação atualizada com sucesso!");
            navigate("/");
          })
          .catch(() => {
            Toast.error("Falha ao atualizar a solicitação");
          });
      }
    },
    [dispatch]
  );

  return (
    <>
      {isLoading && <LinearProgress />}
      {!isLoading && !hasError && (
        <>
          {isAdmin ? (
            <AdminSolicitationFormContainer
              onSubmit={handleEditSolicitationSubmit}
              initialValues={{
                ...INITIAL_ADMIN_FORM_VALUES,
                ...solicitation,
                review: INITIAL_ADMIN_FORM_VALUES.review,
              }}
              title="Avaliar solicitação de auxílio"
              labels={{
                submit: "Finalizar análise",
              }}
            />
          ) : (
            <SolicitationFormContainer
              onSubmit={handleEditSolicitationSubmit}
              initialValues={{
                ...INITIAL_FORM_VALUES,
                ...solicitation,
                aceiteFinal: false,
              }}
              title="Editar solicitação de auxílio"
              labels={{
                submit: "Editar solicitação",
              }}
            />
          )}
        </>
      )}
    </>
  );
}
