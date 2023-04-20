import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  getAssistanceRequests,
  removeAssistanceRequestById,
} from '../../../services/assistanceRequestService';
import { IRootState, useAppDispatch } from '../../../store';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Visibility from '@mui/icons-material/Visibility';
import { CheckCircle } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import { useAuth } from '../../../hooks';
import { toast, ToastOptions } from 'react-toastify';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// Modal inports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  deleteExtraAssistanceRequest,
  getExtraAssistanceRequests,
} from '../../../services/extraAssistanceRequestService';
import assistanceRequestSlice, {
  AssistanceRequest,
} from '../../../store/slices/assistance-request-slice/assistanceRequestSlice';

export default function SolicitationTable() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  //#region table data
  const { requests, extraRequests } = useSelector(
    (state: IRootState) => state.assistanceRequestSlice
  );
  
  const updateAssistanceRequestList = useCallback(
    (
      prop: keyof AssistanceRequest,
      ascending: boolean,
      size: number,
      page?: number,
    ) => {
      dispatch(getAssistanceRequests(prop, ascending, page, size)); // XXX : Esse método é chamado para carregar os dados da página
      dispatch(getExtraAssistanceRequests());
    },
    [dispatch]
  );

  const updateAssistanceRequestListWithCurrentParameters = () => {
    updateAssistanceRequestList(
      getSelectedProp(), 
      selectedPropToSortTable[getSelectedProp()] as boolean, 
      size
    );
  }

  useEffect(() => {
    updateAssistanceRequestListWithCurrentParameters();
  }, []);
  //#endregion

  //#region actions column
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
      updateAssistanceRequestListWithCurrentParameters();
      toast.success('Solicitação removida com sucesso');
    });
  };

  const handleClickRemoveExtraRequest = (id: number) => {
    deleteExtraAssistanceRequest(id).then(() => {
      updateAssistanceRequestListWithCurrentParameters();
      toast.success('Solicitação extra removida com sucesso');
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
        'Texto de solicitação ' +
        '\n' +
        '\n' +
        'Texto não disponível, solicitação ainda não foi avaliada. Avalie a solicitação e volte para conferir.' +
        '\n';
      alert(texto);
    } else {
      alert('Texto de solicitação ' + '\n' + '\n' + texto + '\n');
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
  //#endregion

  //#region table sort
  const [selectedPropToSortTable, setSelectedPropToSortTable] = useState<{
    /**
     * "true" se estiver ascendente, "false" descendente e undefined caso a
     * prop não esteja selecionada
     */
    [Property in keyof AssistanceRequest]?: boolean;
  }>({
    nomeSolicitante: true,
  });

  const getSelectedProp = () => {
    return Object
      .getOwnPropertyNames(
        selectedPropToSortTable
      )[0] as keyof AssistanceRequest;
  }

  const handleClickSortTable = (prop: keyof AssistanceRequest) => {
    if (selectedPropToSortTable[prop]) {
      updateAssistanceRequestList(prop, false, size);

      setSelectedPropToSortTable({
        [prop]: false,
      });
    } else {
      updateAssistanceRequestList(prop, true, size);

      setSelectedPropToSortTable({
        [prop]: true,
      });
    }
  };
  
  function TableCellHeader({
    text,
    prop,
  }: {
    text: string;
    prop: keyof AssistanceRequest;
  }) {
    return (
      <div
        onClick={() => handleClickSortTable(prop)}
        style={{ userSelect: 'none', cursor: 'pointer' }}
      >
        {text}
        {selectedPropToSortTable[prop] != undefined ? (
          selectedPropToSortTable[prop] ? (
            <ArrowDropUpIcon />
          ) : (
            <ArrowDropDownIcon />
          )
        ) : null}
      </div>
    );
  }
  //#endregion

  //#region pagination
  const [size, setSize] = React.useState(5);

  const handleChangeSize = (newSize: number) => {
    setSize(newSize);

    updateAssistanceRequestList(
      getSelectedProp(), 
      selectedPropToSortTable[getSelectedProp()] as boolean, 
      newSize
    );
  }
  //#endregion

  return (
    <>
      <TableContainer sx={{ maxHeight: '500px' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <TableCellHeader
                  text="Solicitante"
                  prop="nomeSolicitante"
                ></TableCellHeader>
              </TableCell>
              <TableCell align="center">
                <TableCellHeader
                  text="Status"
                  prop="situacao"
                ></TableCellHeader>
              </TableCell>
              <TableCell align="center">
                <TableCellHeader
                  text="Valor solicitado"
                  prop="valorSolicitado"
                ></TableCellHeader>
              </TableCell>
              <TableCell align="center">
                <TableCellHeader
                  text="Valor aprovado"
                  prop="valorAprovado"
                ></TableCellHeader>
              </TableCell>
              <TableCell align="center">
                <TableCellHeader
                  text="Data de solicitação"
                  prop="createdAt"
                ></TableCellHeader>
              </TableCell>
              <TableCell align="center">
                <TableCellHeader
                  text="Data da avaliação"
                  prop="dataAprovacao"
                ></TableCellHeader>
              </TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {!requests.list.length && !extraRequests.length && (
              <TableRow>
                <TableCell colSpan={7}>
                  <Typography align="center" color="gray">
                    Nenhuma solicitação de auxílio encontrada.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {requests.list.length > 0 &&
              requests.list.map(
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
                    {situacao === 2 && (
                      <TableCell
                        align="center"
                        style={{ backgroundColor: 'lightcoral' }}
                      >
                        Não aprovada
                      </TableCell>
                    )}

                    {situacao === 1 && (
                      <TableCell
                        align="center"
                        style={{ backgroundColor: 'lightgreen' }}
                      >
                        Aprovada
                      </TableCell>
                    )}

                    {situacao === 0 && (
                      <TableCell
                        align="center"
                        style={{ backgroundColor: 'gray' }}
                      >
                        Pendente de avaliação
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
            {
              // TODO : Remover este código e separar em duas abas
              /* {extraRequests.length > 0 &&
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
                        style={{ backgroundColor: 'lightgreen' }}
                      >
                        Aprovada
                      </TableCell>
                    ) : (
                      <TableCell
                        align="center"
                        style={{ backgroundColor: 'lightcoral' }}
                      >
                        Não aprovada
                      </TableCell>
                    )}
                    <TableCell align="center">
                      {valorSolicitado ? `R$ ${valorSolicitado}` : '-'}
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
              )} */
            }
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: 'flex' }}>
        <Stack spacing={2} style={{ marginTop: '1rem' }}>
          <Pagination count={10}></Pagination>
        </Stack>
        <Select
          value={size}
          onChange={(e) => handleChangeSize(e.target.value as number)}
          type="number"
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Remoção de solicitação'}
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
