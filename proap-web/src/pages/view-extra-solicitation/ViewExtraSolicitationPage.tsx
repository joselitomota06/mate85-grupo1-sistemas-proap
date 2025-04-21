import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  Divider,
  Grid,
} from '@mui/material';
import { toast } from 'react-toastify';
import { getExtraAssistanceRequestById } from '../../services/extraAssistanceRequestService';
import ViewExtraSolicitationContainer from '../../containers/solicitation/view/ViewExtraSolicitationContainer';
import PageHeader from '../../components/PageHeader';
import LoadingIndicator from '../../components/LoadingIndicator';
import ErrorMessage from '../../components/ErrorMessage';

/**
 * Página para visualização de detalhes de uma solicitação de demanda extra
 */
export default function ViewExtraSolicitationPage() {
  const { id } = useParams<{ id: string }>();
  const [extraRequest, setExtraRequest] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!id) {
          throw new Error('ID da solicitação não fornecido');
        }

        const response = await getExtraAssistanceRequestById(Number(id));
        setExtraRequest(response);
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Erro ao carregar os dados da solicitação';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Conteúdo da página
  let content;
  if (loading) {
    content = <LoadingIndicator />;
  } else if (error) {
    content = <ErrorMessage message={error} />;
  } else if (!extraRequest) {
    content = <ErrorMessage message="Solicitação não encontrada" />;
  } else {
    content = <ViewExtraSolicitationContainer extraRequest={extraRequest} />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <PageHeader title="Visualizar Solicitação de Demanda Extra" backUrl="/" />
      <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>{content}</Paper>
    </Container>
  );
}
