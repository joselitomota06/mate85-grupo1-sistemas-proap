import React from 'react';
import SolicitationViewContainer from '../../containers/solicitation/view/SolicitationViewContainer';
import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

const ViewSolicitationPage: React.FC = () => {
  const { id } = useParams();
  return (
    <Box>
      <SolicitationViewContainer id={id!} />
    </Box>
  );
};

export default ViewSolicitationPage;
