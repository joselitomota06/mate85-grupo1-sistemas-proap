import React from 'react';
import { Box, Typography } from '@mui/material';
import styled from '@emotion/styled';

import { booleanToYesOrNo } from '../../helpers/conversion';
import { ExtraRequest } from '../../types/requests-type/ExtraRequest';
import { useAuth } from '../../hooks';
import { formatNumberToBRL } from '../../helpers/formatter';

interface ExtraSolicitationDetailsContainerProps {
  solicitation: ExtraRequest;
}

const StyledData = styled(Box)`
  padding: 0.5rem 0;
`;

export default function ExtraSolicitationDetailsContainer(
  props: ExtraSolicitationDetailsContainerProps,
) {
  const { solicitation } = props;
  const currentUser = useAuth();

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={2}>
      <Box flex="1 1 48%">
        <StyledData>
          <Typography>Nome do Solicitante</Typography>
          <Typography color="gray" variant="subtitle2">
            {currentUser.name}
          </Typography>
        </StyledData>

        <StyledData>
          <Typography>Email do Solicitante</Typography>
          <Typography color="gray" variant="subtitle2">
            {currentUser.email}
          </Typography>
        </StyledData>

        <StyledData>
          <Typography>
            Valor solicitado (R$)
            <span style={{ color: 'red' }}> *</span>
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {solicitation.valorSolicitado != null
              ? formatNumberToBRL(solicitation.valorSolicitado)
              : 'R$ 0,00'}
          </Typography>
        </StyledData>
        <StyledData>
          <Typography>Justificativa</Typography>
          <Typography color="gray" variant="subtitle2">
            {solicitation.justificativa}
          </Typography>
        </StyledData>
      </Box>
    </Box>
  );
}
