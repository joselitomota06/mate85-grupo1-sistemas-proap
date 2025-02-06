import React from 'react';
import SolicitationViewContainer from '../../containers/solicitation/view/SolicitationViewContainer';
import { Box, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const ViewSolicitationPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <Box>
      <SolicitationViewContainer id={id!} />
      <Button
        sx={{ mt: 4 }}
        variant="contained"
        color="primary"
        onClick={handleBackClick}
      >
        Voltar
      </Button>
    </Box>
  );
};

export default ViewSolicitationPage;
