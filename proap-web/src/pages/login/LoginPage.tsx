import { Grid, Paper, Typography } from '@mui/material';
import LoginFormContainer from '../../containers/login/LoginFormContainer';
import { LoginGrid, LoginPaperContainer } from './LoginPage.style';

export default function LoginPage() {
  return (
    <LoginGrid container justifyContent="center" alignItems="center">
      <Grid item xs={10} md={4}>
        <LoginPaperContainer elevation={2}>
          <Typography
            color="primary"
            component="h1"
            variant="h4"
            fontWeight="bold"
          >
            Proap
          </Typography>
          <LoginFormContainer />
        </LoginPaperContainer>
      </Grid>
    </LoginGrid>
  );
}
