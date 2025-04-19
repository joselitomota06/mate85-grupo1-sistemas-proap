import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { getAllCeapgReviews } from '../../services/ceapgService';

import PageHeader from '../../components/PageHeader';
import CeapgReviewRequests from '../../containers/admin-panel/CeapgReviewRequests';

const CeapgReviewsPage: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async (
    filterStartDate = startDate,
    filterEndDate = endDate,
  ) => {
    try {
      setLoading(true);
      const data = await getAllCeapgReviews(filterStartDate, filterEndDate);
      setRequests(data);
    } catch (error) {
      console.error('Error fetching CEAPG reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    fetchRequests(newStartDate, newEndDate);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <PageHeader
        title="Avaliações CEAPG"
        subtitle="Solicitações pendentes de avaliação"
      />
      <CeapgReviewRequests
        loading={loading}
        requests={requests}
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
