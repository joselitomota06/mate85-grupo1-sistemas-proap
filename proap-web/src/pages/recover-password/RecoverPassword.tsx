import { Grid, Paper, Typography } from '@mui/material'
import RecoverPasswordContainer from '../../containers/recover-password/RecoverPasswordContainer'
import { LoginGrid, LoginPaperContainer } from './RecoverPassword.style'

export default function RecoverPassword() {
  return (
    <LoginGrid container justifyContent='center' alignItems='center'>
      <Grid item xs={10} md={4}>
        <LoginPaperContainer elevation={2}>
          <Typography
            color='primary'
            component='h1'
            variant='h4'
            fontWeight='bold'
          >
            Proap
          </Typography>
          <RecoverPasswordContainer />
        </LoginPaperContainer>
      </Grid>
    </LoginGrid>
  )
}
