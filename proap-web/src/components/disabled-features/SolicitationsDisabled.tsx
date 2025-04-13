import {
  Box,
  Typography,
  Paper,
  Button,
  Container,
  Stack,
  useTheme,
} from '@mui/material';
import {
  AccessTimeOutlined,
  InfoOutlined,
  HomeOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SolicitationsDisabled = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Detalhe visual */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '5px',
            backgroundColor: theme.palette.error.main,
          }}
        />

        <Stack spacing={4} alignItems="center">
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'error.lighter',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AccessTimeOutlined color="error" sx={{ fontSize: 40 }} />
          </Box>

          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: 'bold', color: 'text.primary' }}
          >
            Solicitações Temporariamente Indisponíveis
          </Typography>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: 600 }}
          >
            O sistema PROAP não está recebendo novas solicitações no momento.
            Esta é uma interrupção temporária programada pela administração.
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              width: '100%',
              borderRadius: 2,
              backgroundColor: 'info.lighter',
              border: '1px solid',
              borderColor: 'info.light',
            }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <InfoOutlined color="info" />
              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  color="info.dark"
                >
                  Próximos passos
                </Typography>
                <Typography variant="body2" color="info.dark">
                  As solicitações serão reabertas em breve. Você pode continuar
                  navegando no sistema para consultar solicitações anteriores ou
                  entrar em contato com a administração para mais informações.
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<HomeOutlined />}
              onClick={() => navigate('/')}
            >
              Ir para Home
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default SolicitationsDisabled;
