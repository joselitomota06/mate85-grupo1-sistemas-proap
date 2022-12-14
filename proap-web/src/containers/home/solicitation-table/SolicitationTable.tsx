import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  getAssistanceRequests,
  removeAssistanceRequestById,
} from "../../../services/assistanceRequestService";
import { IRootState, useAppDispatch } from "../../../store";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Visibility from "@mui/icons-material/Visibility";
import { CheckCircle } from "@mui/icons-material";
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
import {
  deleteExtraAssistanceRequest,
  getExtraAssistanceRequests,
} from "../../../services/extraAssistanceRequestService";

export default function SolicitationTable() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const { requests, extraRequests } = useSelector(
    (state: IRootState) => state.assistanceRequestSlice
  );

  const updateAssistanceRequestList = useCallback(() => {
    dispatch(getAssistanceRequests());
    dispatch(getExtraAssistanceRequests());
  }, [dispatch]);

  useEffect(() => {
    updateAssistanceRequestList();
  }, []);

  const handleClickEditRequest = (id: number) => {
    navigate(`/solicitation/edit/${id}`);
  };

  const handleClickEditExtraRequest = (id: number) => {
    navigate(`/extra-solicitation/edit/${id}`);
  };

  const handleClickReviewRequest = (id: number) => {
    navigate(`/solicitation/review/${id}`);
  };

  const handleClickRemoveRequest = (id: number) => {
    removeAssistanceRequestById(id).then(() => {
      updateAssistanceRequestList();
      toast.success("Solicita????o removida com sucesso");
    });
  };

  const handleClickRemoveExtraRequest = (id: number) => {
    deleteExtraAssistanceRequest(id).then(() => {
      updateAssistanceRequestList();
      toast.success("Solicita????o extra removida com sucesso");
    });
  };

  const [open, setOpen] = React.useState(false);
  const [solicitationId, setSolicitationId] = React.useState(0);
  const [isExtraSolicitation, setIsExtraSolicitation] = React.useState(false);

  const handleClickOpenModal = (id: number, isExtra: boolean = false) => {
    setIsExtraSolicitation(isExtra);
    setSolicitationId(id);
    setOpen(true);
  };

  const handleClickTextOpenModal = (texto: string) => {
    if (texto == null) {
      var texto =
        "Texto de solicita????o " +
        "\n" +
        "\n" +
        "Texto n??o dispon??vel, solicita????o ainda n??o foi avaliada. Avalie a solicita????o e volte para conferir." +
        "\n";
      alert(texto);
    } else {
      alert("Texto de solicita????o " + "\n" + "\n" + texto + "\n");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveSolicitation = () => {
    isExtraSolicitation
      ? handleClickRemoveExtraRequest(solicitationId)
      : handleClickRemoveRequest(solicitationId);

    setIsExtraSolicitation(false);
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
      <TableContainer sx={{ maxHeight: "500px" }}>
        <Table stickyHeader>
          <TableHead>
            <TableCell align="center">Solicitante</TableCell>
            <TableCell align="center">?? extra?</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Valor solicitado</TableCell>
            <TableCell align="center">Valor aprovado</TableCell>
            <TableCell align="center">Data de solicita????o</TableCell>
            <TableCell align="center">Data da avalia????o</TableCell>
            <TableCell align="center">A????es</TableCell>
          </TableHead>

          <TableBody>
            {!requests.length && !extraRequests.length && (
              <TableRow>
                <TableCell colSpan={7}>
                  <Typography align="center" color="gray">
                    Nenhuma solicita????o de aux??lio encontrada.
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
                  valorAprovado,
                  automaticDecText,
                  dataAprovacao,
                  user,
                }) => (
                  <TableRow key={nomeSolicitante}>
                    <TableCell align="center">{nomeSolicitante}</TableCell>
                    <TableCell align="center">N??o</TableCell>
                    {situacao === 2 && (
                      <TableCell
                        align="center"
                        style={{ backgroundColor: "lightcoral" }}
                      >
                        N??o aprovada
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
                        Pendente de avalia????o
                      </TableCell>
                    )}
                    <TableCell align="center">R$ {valorInscricao}</TableCell>
                    {valorAprovado === null && (
                      <TableCell align="center">-</TableCell>
                    )}

                    {valorAprovado !== null && (
                      <TableCell align="center">R$ {valorAprovado}</TableCell>
                    )}

                    <TableCell align="center">{createdAt}</TableCell>

                    {dataAprovacao === null && (
                      <TableCell align="center">-</TableCell>
                    )}

                    {dataAprovacao !== null && (
                      <TableCell align="center">{dataAprovacao}</TableCell>
                    )}

                    <TableCell align="center">
                      <Box>
                        {isAdmin && (
                          <>
                            <IconButton
                              onClick={() =>
                                handleClickTextOpenModal(automaticDecText)
                              }
                            >
                              <Visibility />
                            </IconButton>
                            <IconButton
                              onClick={() => handleClickReviewRequest(id)}
                            >
                              <CheckCircle />
                            </IconButton>
                          </>
                        )}

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
            {extraRequests.length > 0 &&
              extraRequests.map(
                ({
                  id,
                  nomeSolicitante,
                  valorSolicitado,
                  createdAt,
                  review,
                }) => (
                  <TableRow key={nomeSolicitante}>
                    <TableCell align="center">{nomeSolicitante}</TableCell>
                    <TableCell align="center">Sim</TableCell>
                    {review ? (
                      <TableCell
                        align="center"
                        style={{ backgroundColor: "lightgreen" }}
                      >
                        Aprovada
                      </TableCell>
                    ) : (
                      <TableCell
                        align="center"
                        style={{ backgroundColor: "lightcoral" }}
                      >
                        N??o aprovada
                      </TableCell>
                    )}
                    <TableCell align="center">
                      {valorSolicitado ? `R$ ${valorSolicitado}` : "-"}
                    </TableCell>
                    <TableCell align="center">-</TableCell>
                    <TableCell align="center">{createdAt}</TableCell>
                    <TableCell align="center">-</TableCell>

                    <TableCell align="center">
                      <Box>
                        <IconButton
                          onClick={() => handleClickEditExtraRequest(id)}
                        >
                          <ModeEditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleClickOpenModal(id, true)}
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

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remo????o de solicita????o"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <b>Deseja realmente remover esta solicita????o?</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>N??o</Button>
          <Button onClick={handleRemoveSolicitation} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
