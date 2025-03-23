import { Box, Container, Fade, Paper, Typography } from '@mui/material';
import SystemConfigFormContainer from '../../containers/admin-panel/SystemConfigFormContainer';
import { SystemConfiguration } from '../../types';
import { useSysConfig } from '../../hooks/admin/useSysConfig';

export default function AdminPanelPage() {
  const { config, isLoading, error, saveConfig } = useSysConfig();

  const handleSubmit = async (values: SystemConfiguration) => {
    await saveConfig(values);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h4" fontWeight="bold">
          Carregando...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" color="primary" fontWeight="bold" paddingTop={4}>
        Configurações do Sistema
      </Typography>
      <Fade in timeout={500}>
        <Paper
          elevation={3}
          style={{ padding: '2rem', marginTop: '2rem', marginBottom: '3rem' }}
        >
          <SystemConfigFormContainer
            initialValues={config}
            onSubmit={handleSubmit}
          />
        </Paper>
      </Fade>
    </Container>
  );
}
