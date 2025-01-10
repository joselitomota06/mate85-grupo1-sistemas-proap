import React from 'react';

import { Grid, Typography } from '@mui/material';
import styled from '@emotion/styled';

import { booleanToYesOrNo } from '../../helpers/conversion';
import { ExtraRequest } from '../../types/requests-type/ExtraRequest';

interface ExtraSolicitationDetailsContainerProps {
  solicitation: ExtraRequest;
}

const StyledData = styled.div`
  padding: 0.2rem;
`;

export default function ExtraSolicitationDetailsContainer(
  props: ExtraSolicitationDetailsContainerProps,
) {
  const { solicitation } = props;

  return (
    <Grid container justifyContent="center">
      <Grid item md={6} xs={12}>
        <StyledData>
          <Typography>Nome</Typography>
          <Typography style={{ color: 'gray' }} variant="subtitle2">
            {solicitation.nomeSolicitante}
          </Typography>
        </StyledData>
        <StyledData>
          <Typography>Email</Typography>
          <Typography style={{ color: 'gray' }} variant="subtitle2">
            {solicitation.emailSolicitacao}
          </Typography>
        </StyledData>
        <StyledData>
          <Typography>Justificativa</Typography>
          <Typography style={{ color: 'gray' }} variant="subtitle2">
            {solicitation.justificativa}
          </Typography>
        </StyledData>
        <StyledData>
          <Typography>Valor solicitado</Typography>
          <Typography style={{ color: 'gray' }} variant="subtitle2">
            {solicitation.valorSolicitado || '-'}
          </Typography>
        </StyledData>
      </Grid>
      <Grid item md={6} xs={12}>
        <StyledData>
          <Typography>
            Solicitou apoio para esse artigo em outro programa de pós-graduação
            <span style={{ color: 'red' }}>*</span>
          </Typography>
          <Typography style={{ color: 'gray' }} variant="subtitle2">
            {booleanToYesOrNo(Boolean(solicitation.solicitacaoApoio))}
          </Typography>
        </StyledData>

        <StyledData>
          <Typography>
            Solicitou auxilio para esse artigo de outras fontes de
            financiamento?<span style={{ color: 'red' }}>*</span>
          </Typography>
          <Typography style={{ color: 'gray' }} variant="subtitle2">
            {booleanToYesOrNo(
              Boolean(solicitation.solicitacaoAuxilioOutrasFontes),
            )}
          </Typography>
        </StyledData>
      </Grid>
    </Grid>
  );
}
