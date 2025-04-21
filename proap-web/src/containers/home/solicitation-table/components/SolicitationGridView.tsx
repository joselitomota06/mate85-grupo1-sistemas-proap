import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { SolicitationCard } from './index';
import { SolicitationDetailsDialogProps } from '../../request-dialog/SolicitationDetailsDialog';

interface SolicitationGridViewProps {
  filteredRequests: any[];
  searchQuery: string;
  currentUserEmail: string;
  userCanViewAllRequests: boolean;
  userCanReviewRequests: boolean;
  isCeapg: boolean;
  onEdit: (id: number) => void;
  onReview: (id: number) => void;
  onView: (id: number) => void;
  onDelete: (id: number) => void;
  onShowDetails: (props: SolicitationDetailsDialogProps) => void;
}

const SolicitationGridView: React.FC<SolicitationGridViewProps> = ({
  filteredRequests,
  searchQuery,
  currentUserEmail,
  userCanViewAllRequests,
  userCanReviewRequests,
  isCeapg,
  onEdit,
  onReview,
  onView,
  onDelete,
  onShowDetails,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
      {!filteredRequests.length ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">
            {searchQuery
              ? 'Nenhuma solicitação encontrada para a busca realizada.'
              : 'Nenhuma solicitação de auxílio encontrada.'}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredRequests.map((solicitation) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={solicitation.id}>
              <SolicitationCard
                solicitation={solicitation}
                currentUserEmail={currentUserEmail}
                userCanViewAllRequests={userCanViewAllRequests}
                userCanReviewRequests={userCanReviewRequests}
                isCeapg={isCeapg}
                onEdit={onEdit}
                onReview={onReview}
                onView={onView}
                onDelete={onDelete}
                onShowDetails={onShowDetails}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default SolicitationGridView;
