import React from 'react';
import { Container, useTheme, useMediaQuery } from '@mui/material';
import AdminDashboardContainer from '../../containers/admin-panel/AdminDashboardContainer';

const AdminDashboardPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container
      maxWidth={false}
      disableGutters={isMobile}
      sx={{
        mt: 4,
        mb: 4,
        px: isMobile ? 0 : 3,
        maxWidth: isMobile ? '100%' : theme.breakpoints.values.xl,
      }}
    >
      <AdminDashboardContainer />
    </Container>
  );
};

export default AdminDashboardPage;
