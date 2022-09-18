import { Grid, Paper, Typography } from "@mui/material";
import LoginFormContainer from "../../containers/login/LoginFormContainer";
import { LoginGrid, LoginPaperContainer } from "./LoginPage.style";

import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import {
  DataModal,
  BoxModal,
  CloseIconModal,
  GridButtonsModal,
  ModalDates,
} from "./DataModal.style";
import { useState } from "react";

export default function LoginPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <LoginGrid container justifyContent="center" alignItems="center">
      <Grid item xs={10} md={4}>
        <LoginPaperContainer elevation={2}>
          <Typography color="primary" component="h1" variant="h4">
            Proap
          </Typography>
          <LoginFormContainer />
        </LoginPaperContainer>
      </Grid>

      {/* Ambiente do Modal */}
      <Button onClick={handleOpen}>Open modal</Button>
      <DataModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <BoxModal>
          <Grid container spacing={2}>
            <CloseIconModal item xs={12}>
              <CloseIcon />
            </CloseIconModal>

            <Grid item xs={4}>
              <Typography className="title">Email</Typography>
              <Typography className="sub">contato@ufba.br</Typography>

              <Typography className="title">
                Nome do Solicitante<span style={{ color: "red" }}>*</span>
              </Typography>
              <Typography className="sub">Joselito</Typography>

              <Typography className="title">
                Título completo da publicação a ser apoiada
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <Typography className="sub">Lorem</Typography>

              <Typography className="title">DOI (se disponível)</Typography>
              <Typography className="sub">Lorem</Typography>

              <Typography className="title">
                Lista completa de co-autor(es) da publicação a ser apoiada
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <Typography className="sub">Lorem, ipsum.</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography className="title">
                Solicitou apoio para esse artigo em outro programa de
                pós-graduação? <span style={{ color: "red" }}>*</span>
              </Typography>
              <Typography className="sub">Lorem, ipsum.</Typography>

              <Typography className="title">
                Solicitou auxílio para esse artigo de outras fontes de
                financiamento <span style={{ color: "red" }}>*</span>
              </Typography>
              <Typography className="sub">Lorem, ipsum.</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography className="title">
                Data de início<span style={{ color: "red" }}>*</span>
              </Typography>
              <Typography className="sub">Lorem, ipsum.</Typography>
              <Typography className="title">
                Data de término<span style={{ color: "red" }}>*</span>
              </Typography>
              <Typography className="sub">Lorem, ipsum.</Typography>

              <Typography className="title">
                Link Homepage<span style={{ color: "red" }}>*</span>
              </Typography>
              <Typography className="sub">Lorem, ipsum.</Typography>
              <Typography className="title">
                País
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <Typography className="sub">Lorem, ipsum.</Typography>
              <Typography className="title">
                Cidade<span style={{ color: "red" }}>*</span>
              </Typography>
              <Typography className="sub">Lorem, ipsum.</Typography>
              <Typography className="title">
                Valor da inscrição + publicação
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <Typography className="sub">Lorem, ipsum.</Typography>
              <Typography className="title">
                Data<span style={{ color: "red" }}>*</span>
              </Typography>
              <Typography className="sub">Lorem, ipsum.</Typography>
              <Typography className="title">
                Informe o Qualis do seu evento
                <span style={{ color: "red" }}>*</span>
              </Typography>
              <Typography className="sub">Lorem, ipsum.</Typography>
            </Grid>

            <GridButtonsModal item xs={12}>
              <Button
                style={{ backgroundColor: "#e5eaf1", color: "#69788d" }}
                variant="contained"
              >
                Reprovar
              </Button>
              <Button
                style={{ backgroundColor: "#184a7f", color: "#fff" }}
                variant="contained"
              >
                Aprovar
              </Button>
            </GridButtonsModal>
          </Grid>
        </BoxModal>
      </DataModal>
    </LoginGrid>
  );
}
