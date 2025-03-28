import React, { useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormikValues } from 'formik';
import {
  updateSolicitation,
  reviewSolicitation,
} from '../../services/solicitationService';
import useSolicitation from '../../hooks/solicitation/useSolicitation';
import LinearProgress from '@mui/material/LinearProgress';
import { useAuth } from '../../hooks';
import {
  INITIAL_REVIEW_FORM_VALUES,
  SolicitationFormValues,
} from '../../containers/solicitation/SolicitationFormSchema';
import Toast from '../../helpers/notification';
import { dateToLocalDate } from '../../helpers/conversion';
import AdminSolicitationFormContainer from '../../containers/solicitation/AdminSolicitationFormContainer';
import { useDispatch } from 'react-redux';
import useHasPermission from '../../hooks/auth/useHasPermission';
import { UnauthorizedPage } from '../unauthorized/UnauthorizedPage';

export default function ReviewSolicitationPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { solicitation, isLoading, hasError } = useSolicitation(id);
  const userHasPermission = useHasPermission('APPROVE_REQUEST');

  const navigate = useNavigate();

  useEffect(() => {
    if (hasError) navigate('not-found');
  }, [hasError]);

  const handleReviewSolicitationSubmit = useCallback(
    (values: FormikValues) => {
      const valuesWithCorrectDates: SolicitationFormValues = {
        ...(values as SolicitationFormValues),
        dataInicio: dateToLocalDate(values.dataInicio),
        dataFim: dateToLocalDate(values.dataFim),
        dataAprovacao: dateToLocalDate(values.dataAprovacao),
        createdAt: undefined,
        updatedAt: undefined,
      };

      return reviewSolicitation(valuesWithCorrectDates).then(() => {
        Toast.success('Solicitação avaliada com sucesso!');
        navigate('/');
      });
    },
    [dispatch],
  );

  if (!userHasPermission) {
    return <UnauthorizedPage />;
  }

  return (
    <>
      {isLoading && <LinearProgress />}
      {!isLoading && !hasError && (
        <>
          {
            <AdminSolicitationFormContainer
              onSubmit={handleReviewSolicitationSubmit}
              initialValues={{
                ...solicitation,
              }}
              title="Avaliar solicitação de auxílio"
              labels={{
                submit: 'Finalizar análise',
              }}
            />
          }
        </>
      )}
    </>
  );
}
