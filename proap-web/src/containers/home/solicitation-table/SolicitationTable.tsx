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
  getDeclarationRequests,
} from "../../../services/assistanceRequestService";
import { IRootState, useAppDispatch } from "../../../store";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import ReviewsIcon from '@mui/icons-material/Reviews';
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import { useAuth } from "../../../hooks";
import { toast, ToastOptions } from "react-toastify";

// Modal inports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

  const [openModelRemove, setOpenModalRemove] = React.useState(false);
  const [openModalDeclaration, setOpenModalDeclaration] = React.useState(false);

  const [solicitationId, setSolicitationId] = React.useState(0);
  const [backendTex, setBackendTex] = React.useState('');

  const handleClickOpenModalRemove = (id: number) => {
    setSolicitationId(id);
    setOpenModalRemove(true);
  };

  const handleClose = () => {
    setOpenModalRemove(false);
    setOpenModalDeclaration(false);
  };

  const handleRemoveSolicitation = () => {
    handleClickRemoveRequest(solicitationId);
    setSolicitationId(0);
    handleClose();
  }

  const handleClickOpenModalDeclaration = (id: number) => {
    let strBackendText = getDeclarationRequests(id);
    setBackendTex(strBackendText);
    setOpenModalDeclaration(true);
  }

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
                  review,
                  user,
                }) => (
                  <TableRow key={nomeSolicitante}>
                    <TableCell align="center">{nomeSolicitante}</TableCell>
                    {review === null && (
                      <TableCell align="center">Não aprovada</TableCell>
                    )}

                    {review !== null && (
                      <TableCell align="center">Aprovada</TableCell>
                    )}
                    <TableCell align="center">R$ {valorInscricao}</TableCell>
                    <TableCell align="center">R$</TableCell>
                    <TableCell align="center">{createdAt}</TableCell>
                    <TableCell align="center">-</TableCell>

                    <TableCell align="center">
                      <Box>
                        <IconButton onClick={() => handleClickOpenModalDeclaration(id)}>
                          <ReviewsIcon />
                        </IconButton>
                        <IconButton onClick={() => handleClickEditRequest(id)}>
                          <ModeEditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleClickOpenModalRemove(id)}
                        >
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

      {/* Modal Remove*/}
      <Dialog
        open={openModelRemove}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title-remove"
        aria-describedby="alert-dialog-description-remove"
      >
        <DialogTitle id="alert-dialog-title-remove">
          {"Remoção de solicitação"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description-remove">
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

      {/* Modal declaration */}
      <Dialog
        open={openModalDeclaration}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title-declaration"
        aria-describedby="alert-dialog-description-declaration"
      >
        <DialogTitle id="alert-dialog-title-declaration">
          {"Declaração"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description-declaration">
            <b>{backendTex}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Não</Button>
          <Button onClick={handleClose} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
