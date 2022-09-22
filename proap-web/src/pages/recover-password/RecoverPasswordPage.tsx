import { Grid, Paper, Typography } from "@mui/material";
import RecoverPasswordFormContainer from "../../containers/recover-password/RecoverPasswordFormContainer";
import { RecoverPasswordGrid, RecoverPasswordPaperContainer } from "./RecoverPasswordPage.style";

export default function RecoverPasswordPage() {
  return (
    <RecoverPasswordGrid container justifyContent="center" alignItems="center">
      <Grid item xs={10} md={4}>
        <RecoverPasswordPaperContainer elevation={2}>
          <Typography
            color="primary"
            component="h1"
            variant="h4"
            fontWeight="bold"
          >
            Recuperar Senha
          </Typography>
          <Typography color="#667080" component="p">
            Para recuperar seu acesso, preencha o campo com o seu e-mail de
            cadastro.
          </Typography>
          <RecoverPasswordFormContainer />
        </RecoverPasswordPaperContainer>
      </Grid>
    </RecoverPasswordGrid>
  );
}
