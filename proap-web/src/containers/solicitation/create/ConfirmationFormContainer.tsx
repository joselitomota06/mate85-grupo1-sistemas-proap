import { useFormikContext } from 'formik';
import { InitialSolicitationFormValues } from '../SolicitationFormSchema';
import {
  Box,
  Paper,
  Typography,
  Divider,
  alpha,
  useTheme,
} from '@mui/material';
import SolicitationDetailsContainer from './SolicitationDetailsContainer';
import AcceptanceFormContainer from './AcceptanceFormContainer';
import { AssignmentTurnedIn } from '@mui/icons-material';

export default function ConfirmationFormContainer() {
  const { values } = useFormikContext<InitialSolicitationFormValues>();
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        mt: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 2,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          background: alpha(theme.palette.background.paper, 0.8),
        }}
      >
        <Typography
          variant="h6"
          color="primary"
          fontWeight="medium"
          gutterBottom
          sx={{ mb: 2, display: 'flex', alignItems: 'center' }}
        >
          <AssignmentTurnedIn sx={{ mr: 1 }} /> Confirmação da Solicitação
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          Por favor, revise todas as informações abaixo antes de confirmar sua
          solicitação. Após o envio, você não poderá fazer alterações sem abrir
          um novo processo.
        </Typography>

        <SolicitationDetailsContainer solicitation={values} />
      </Paper>

      <AcceptanceFormContainer />
    </Box>
  );
}
