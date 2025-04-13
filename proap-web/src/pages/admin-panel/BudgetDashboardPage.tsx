import React from 'react';
import { Container } from '@mui/material';
import BudgetDashboardContainer from '../../containers/admin-panel/BudgetDashboardContainer';

const BudgetDashboardPage: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <BudgetDashboardContainer />
    </Container>
  );
};

export default BudgetDashboardPage;
