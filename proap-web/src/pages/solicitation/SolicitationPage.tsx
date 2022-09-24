import { Grid } from '@mui/material'

import SolicitationFormContainer from '../../containers/solicitation/SolicitationFormContainer'
import { SolicitationGrid } from './SolicitationPage.style'

export default function SolicitationPage() {
  return (
    <SolicitationGrid container justifyContent='center' alignItems='center'>
      <Grid item xs={9}>
        <SolicitationFormContainer />
      </Grid>
    </SolicitationGrid>
  )
}
