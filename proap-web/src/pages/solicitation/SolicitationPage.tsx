import { Grid, Typography } from "@mui/material";
import React from "react";
import SolicitationFormContainer from "../../containers/solicitation/SolicitationFormContainer";
import {
  SolicitationGrid,
  SolicitationPaperContainer,
} from "./SolicitationPage.style";

export default function SolicitationPage() {
  return (
    <SolicitationGrid container justifyContent="center" alignItems="center">
      <Grid item xs={9}>
        <SolicitationFormContainer />
      </Grid>
    </SolicitationGrid>
  );
}
