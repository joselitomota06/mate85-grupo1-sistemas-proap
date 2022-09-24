import { Grid, Paper, Typography } from '@mui/material'
import RecoverPasswordFormContainer from '../../containers/recover-password/RecoverPasswordContainer'
import { RecoverPasswordGrid, RecoverPasswordPaperContainer } from './RecoverPassword.style'

export default function RecoverPassword() {
  return (
    <RecoverPasswordGrid container justifyContent='center' alignItems='center'>
      <Grid item xs={10} md={4}>
        <RecoverPasswordPaperContainer elevation={2}>
          <Typography
            color='primary'
            component='h1'
            variant='h4'
            fontWeight='bold'
          >
            Proap
          </Typography>
          <RecoverPasswordFormContainer />
        </RecoverPasswordPaperContainer>
      </Grid>
    </RecoverPasswordGrid>
  )
}
