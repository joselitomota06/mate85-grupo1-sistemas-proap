import { Box, Typography } from '@mui/material';
import RecoverPasswordFormContainer from '../../containers/recover-password/RecoverPasswordContainer';
import {
  RecoverPasswordBox,
  RecoverPasswordPaperContainer,
} from './RecoverPassword.style';

export default function RecoverPassword() {
  return (
    <RecoverPasswordBox
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <RecoverPasswordPaperContainer elevation={2}>
          <Typography
            color="primary"
            component="h1"
            variant="h4"
            fontWeight="bold"
          >
            Recuperar Senha
          </Typography>
          <RecoverPasswordFormContainer />
        </RecoverPasswordPaperContainer>
      </Box>
    </RecoverPasswordBox>
  );
}
