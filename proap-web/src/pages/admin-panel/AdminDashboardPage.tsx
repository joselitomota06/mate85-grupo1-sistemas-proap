import React from 'react';
import { Container } from '@mui/material';
import AdminDashboardContainer from '../../containers/admin-panel/AdminDashboardContainer';

const AdminDashboardPage: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <AdminDashboardContainer />
    </Container>
  );
};

export default AdminDashboardPage;
