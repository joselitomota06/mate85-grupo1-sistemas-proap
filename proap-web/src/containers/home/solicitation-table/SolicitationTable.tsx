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
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import { useAuth } from "../../../hooks";
import { toast, ToastOptions } from "react-toastify";

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
                <TableCell colSpan={5}>
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
                        <IconButton onClick={() => handleClickEditRequest(id)}>
                          <ModeEditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleClickRemoveRequest(id)}
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
    </>
  );
}
