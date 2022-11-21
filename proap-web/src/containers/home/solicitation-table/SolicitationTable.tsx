import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,

} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  getAssistanceRequests,
  removeAssistanceRequestById,
} from "../../../services/assistanceRequestService";
import { IRootState, useAppDispatch } from "../../../store";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Visibility from '@mui/icons-material/Visibility';
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import { useAuth } from "../../../hooks";
import { toast, ToastOptions } from "react-toastify";

// Modal inports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function SolicitationTable() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const { requests } = useSelector(
    (state: IRootState) => state.assistanceRequestSlice
  );

  useEffect(() => {
    dispatch(getAssistanceRequests());
  }, [dispatch]);

  const handleClickEditRequest = (id: number) => {
    navigate(`/solicitation/edit/${id}`);
  };

  const handleClickRemoveRequest = (id: number) => {
    removeAssistanceRequestById(id).then(() => {
      dispatch(getAssistanceRequests());
      toast.success("Solicitação removida com sucesso");
    });
  };

  const [open, setOpen] = React.useState(false);
  const [solicitationId, setSolicitationId] = React.useState(0);

  const handleClickOpenModal = (id: number) => {
    setSolicitationId(id);
    setOpen(true);
  };

  const handleClickTextOpenModal = (texto: string) => {
    if(texto == null){
      alert("Texto de solicitação "  +"\n"
            +"\n"
            +"Texto não disponível, solicitação ainda não foi avaliada. Avalie a solicitação e volte para conferir." +"\n");
    }else{
      alert("Texto de solicitação "  +"\n"
            +"\n"
            +texto+"\n");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveSolicitation = () => {
    handleClickRemoveRequest(solicitationId);
    setSolicitationId(0);
    handleClose();
  };

  const handleTextModal = () => {  
    handleClickRemoveRequest(solicitationId);
    setSolicitationId(0);
    handleClose();
  };

  return (
    <>
      <Typography
        variant="h4"
        color="primary"
        fontWeight="bold"
        paddingBottom={2}
      >
        {isAdmin ? "Solicitações cadastradas" : "Minhas solicitações"}
      </Typography>

      <TableContainer sx={{ maxHeight: "500px" }}>
        <Table stickyHeader>
          <TableHead>
            <TableCell align="center">Solicitante</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Valor solicitado</TableCell>
            <TableCell align="center">Valor aprovado</TableCell>
            <TableCell align="center">Data de solicitação</TableCell>
            <TableCell align="center">Data de aprovação</TableCell>
            <TableCell align="center">Ações</TableCell>
          </TableHead>

          <TableBody>
            {requests.length === 0 && (
              <TableRow>
                <TableCell colSpan={7}>
                  <Typography align="center" color="gray">
                    Nenhuma solicitação de auxílio encontrada.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {requests.length > 0 &&
              requests.map(
                ({
                  id,
                  nomeSolicitante,
                  valorInscricao,
                  createdAt,
                  situacao,
                  automaticDecText,
                  user,
                }) => (
                  <TableRow key={nomeSolicitante}>
                    <TableCell align="center">{nomeSolicitante}</TableCell>
                    {situacao === 2 && (
                      <TableCell
                        align="center"
                        style={{ backgroundColor: "lightcoral" }}
                      >
                        Não aprovada
                      </TableCell>
                    )}

                    {situacao === 1 && (
                      <TableCell
                        align="center"
                        style={{ backgroundColor: "lightgreen" }}
                      >
                        Aprovada
                      </TableCell>
                    )}

                    {situacao === 0 && (
                      <TableCell
                        align="center"
                        style={{ backgroundColor: "gray" }}
                      >
                        Pendente de avaliação
                      </TableCell>
                    )}
                    <TableCell align="center">R$ {valorInscricao}</TableCell>
                    <TableCell align="center">R$</TableCell>
                    <TableCell align="center">{createdAt}</TableCell>
                    <TableCell align="center">-</TableCell>

                    <TableCell align="center">
                      <Box>
                        <IconButton onClick={() => handleClickTextOpenModal(automaticDecText)}>
                          <Visibility />
                        </IconButton>
                        <IconButton onClick={() => handleClickEditRequest(id)}>
                          <ModeEditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleClickOpenModal(id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remoção de solicitação"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <b>Deseja realmente remover esta solicitação?</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Não</Button>
          <Button onClick={handleRemoveSolicitation} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
