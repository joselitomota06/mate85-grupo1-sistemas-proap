import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import ExtraRequestCard from './ExtraRequestCard';

interface ExtraRequestGridViewProps {
  extraRequests: any[];
  currentUserEmail: string;
  userCanViewAllRequests: boolean;
  userCanReviewRequests: boolean;
  isCeapg: boolean;
  onEdit: (id: number) => void;
  onReview: (id: number) => void;
  onView: (id: number) => void;
  onDelete: (id: number) => void;
  onShowText: (text: string) => void;
}

const ExtraRequestGridView: React.FC<ExtraRequestGridViewProps> = ({
  extraRequests,
  currentUserEmail,
  userCanViewAllRequests,
  userCanReviewRequests,
  isCeapg,
  onEdit,
  onReview,
  onView,
  onDelete,
  onShowText,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      {!extraRequests.length ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">
            Nenhuma solicitação de demanda extra encontrada.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {extraRequests.map((extraRequest) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={extraRequest.id}>
              <ExtraRequestCard
                extraRequest={extraRequest}
                currentUserEmail={currentUserEmail}
                userCanViewAllRequests={userCanViewAllRequests}
                userCanReviewRequests={userCanReviewRequests}
                isCeapg={isCeapg}
                onEdit={onEdit}
                onReview={onReview}
                onView={onView}
                onDelete={onDelete}
                onShowText={onShowText}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ExtraRequestGridView;
