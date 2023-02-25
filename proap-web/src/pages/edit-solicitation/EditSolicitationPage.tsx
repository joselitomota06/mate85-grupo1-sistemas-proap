import React, { useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormikValues } from 'formik';

import SolicitationFormContainer from '../../containers/solicitation/SolicitationFormContainer';
import { updateSolicitation } from '../../services/solicitationService';
import useSolicitation from '../../hooks/solicitation/useSolicitation';
import LinearProgress from '@mui/material/LinearProgress';
import { useAuth } from '../../hooks';
import {
  INITIAL_FORM_VALUES,
  SolicitationFormValues,
} from '../../containers/solicitation/SolicitationFormSchema';
import Toast from '../../helpers/notification';
import { dateToLocalDate } from '../../helpers/conversion';
import { useDispatch } from 'react-redux';

export default function EditSolicitationPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { solicitation, isLoading, hasError } = useSolicitation(id);
  const { isAdmin } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (hasError) navigate('not-found');
  }, [hasError]);

  const handleEditSolicitationSubmit = useCallback(
    (values: FormikValues) => {
      const valuesWithCorrectDates: SolicitationFormValues = {
        ...(values as SolicitationFormValues),
        dataInicio: dateToLocalDate(new Date(values.dataInicio)),
        dataFim: dateToLocalDate(new Date(values.dataFim)),
        createdAt: undefined,
        updatedAt: undefined,
      };

      return updateSolicitation(valuesWithCorrectDates).then(() => {
        Toast.success('Solicitação avaliada com sucesso!');
        navigate('/');
      });
    },
    [dispatch]
  );

  return (
    <>
      {isLoading && <LinearProgress />}
      {!isLoading && !hasError && (
        <>
          {
            <SolicitationFormContainer
              onSubmit={handleEditSolicitationSubmit}
              initialValues={{
                ...INITIAL_FORM_VALUES,
                ...solicitation,
                aceiteFinal: false,
              }}
              title="Editar solicitação de auxílio"
              labels={{
                submit: 'Editar solicitação',
              }}
            />
          }
        </>
      )}
    </>
  );
}
