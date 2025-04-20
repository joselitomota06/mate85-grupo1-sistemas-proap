import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';

import PageHeader from '../../components/PageHeader';
import CeapgReviewRequests from '../../containers/admin-panel/CeapgReviewRequests';
import useLoadCeapgRequests from '../../hooks/admin/useLoadCeapgRequests';

const CeapgReviewsPage: React.FC = () => {
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);

  const fetchCeapg = useLoadCeapgRequests();

  useEffect(() => {
    fetchCeapg.getCeapg();
  }, []);

  const handleFilter = (newStartDate?: string, newEndDate?: string) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    fetchCeapg.getCeapg(newStartDate, newEndDate);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <PageHeader
        title="Avaliações CEAPG"
        subtitle="Solicitações pendentes de avaliação"
      />
      <CeapgReviewRequests
        loading={fetchCeapg.loading}
        requests={fetchCeapg.ceapgRequests}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onFilter={handleFilter}
      />
    </Container>
  );
};

export default CeapgReviewsPage;
