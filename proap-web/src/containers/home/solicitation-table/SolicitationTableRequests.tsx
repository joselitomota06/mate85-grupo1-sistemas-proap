import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  AssistanceRequestPropToSort,
  getAssistanceRequests,
  removeAssistanceRequestById,
} from '../../../services/assistanceRequestService';
import { IRootState, useAppDispatch } from '../../../store';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Visibility from '@mui/icons-material/Visibility';
import {
  Article,
  ArticleOutlined,
  AssignmentOutlined,
  CheckCircle,
  Description,
  DescriptionTwoTone,
  FindInPage,
  OpenInBrowser,
} from '@mui/icons-material';
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

import usePrevious from '../../../helpers/usePrevious';
import useHasPermission from '../../../hooks/auth/useHasPermission';
import SolicitationDetailsDialog, {
  SolicitationDetailsDialogProps,
} from '../request-dialog/SolicitationDetailsDialog';
import useSolicitation from '../../../hooks/solicitation/useSolicitation';
import SolicitationViewContainer from '../../solicitation/view/SolicitationViewContainer';
import SolicitationViewDialog from '../request-dialog/SolicitationViewDialog';

export default function SolicitationTableRequests() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userCanViewAllRequests = useHasPermission('VIEW_ALL_REQUESTS');
  const currentUser = useAuth();

  //#region table data
  // TODO : Não usar mais o slice já que request e extra request agora estão em abas separadas
  const { requests, extraRequests } = useSelector(
    (state: IRootState) => state.assistanceRequestSlice,
  );

  const updateAssistanceRequestList = useCallback(
    (
      sortBy: AssistanceRequestPropToSort,
      ascending: boolean,
      size: number,
      page: number,
    ) => {
      dispatch(getAssistanceRequests(sortBy, ascending, page, size)).then(
        (requests) =>
          setNumberPagesAssistance(
            Math.trunc(requests.payload.total / size) + 1,
          ),
      );
    },
    [dispatch],
  );
  // HACK : Não entendi a tempo como usar useCallback com os valores atualizados. Estava sempre pegando os iniciais
  const updateAssistanceRequestListWithCurrentParameters = () => {
    updateAssistanceRequestList(
      getSelectedProp(),
      selectedPropToSortTable[getSelectedProp()] as boolean,
      size,
      currentPageAssistance,
    );
  };
  //#endregion
  //#region actions column
  const handleClickEditRequest = (id: number) => {
    navigate(`/solicitation/edit/${id}`);
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
  const [openViewSolicitation, setOpenViewSolicitation] = React.useState(false);
  const [solicitationValues, setSolicitationValues] = React.useState<any>({});
  const [selectedSolicitationId, setSelectedSolicitationId] = useState<
    number | null
  >(null);
  const [openResume, setOpenResume] = React.useState(false);
  const [solicitationId, setSolicitationId] = React.useState(0);
  const [openTextModal, setOpenTextModal] = React.useState(false);
  const [textDialog, setTextDialog] =
    React.useState<SolicitationDetailsDialogProps>({
      nomeSolicitante: '',
      solicitanteDocente: false,
      valorTotal: 0,
      variacaoCambial: 0,
      valorDiarias: 0,
      nomeEvento: '',
      tituloPublicacao: '',
      isDolar: false,
      qualisEvento: '',
      cidade: '',
      pais: '',
      dataInicio: '',
      dataFim: '',
      situacao: 0,
      observacoes: '',
    });

  const handleClickOpenModal = (id: number, isExtra: boolean = false) => {
    setSolicitationId(id);
    setOpenResume(true);
  };

  const handleClickTextOpenModal = (props: any) => {
    // if (!texto) {
    //   texto =
    //     'Texto não disponível, solicitação ainda não foi avaliada. Avalie a solicitação e volte para conferir.';
    // }
    setTextDialog(props);
    setOpenTextModal(true);
  };

  const handleCloseTextModal = () => {
    setOpenTextModal(false);
  };

  // const handleClickTextOpenModal = (texto: string) => {
  //   if (texto == null) {
  //     var texto =
  //       'Texto de solicitação ' +
  //       '\n' +
  //       '\n' +
  //       'Texto não disponível, solicitação ainda não foi avaliada. Avalie a solicitação e volte para conferir.' +
  //       '\n';
  //     alert(texto);
  //   } else {
  //     alert('Texto de solicitação ' + '\n' + '\n' + texto + '\n');
  //   }
  // };

  const handleClose = () => {
    setOpenResume(false);
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
  //#endregion

  //#region table sort
  const [selectedPropToSortTable, setSelectedPropToSortTable] = useState<{
    /**
     * "true" se estiver ascendente, "false" descendente e undefined caso a
     * sortBy não esteja selecionada
     */
    [Property in AssistanceRequestPropToSort]?: boolean;
  }>({
    createdAt: false,
  });

  const getSelectedProp = () => {
    return Object.getOwnPropertyNames(
      selectedPropToSortTable,
    )[0] as AssistanceRequestPropToSort;
  };

  const handleClickSortTable = (sortBy: AssistanceRequestPropToSort) => {
    if (selectedPropToSortTable[sortBy]) {
      setSelectedPropToSortTable({
        [sortBy]: false,
      });
    } else {
      setSelectedPropToSortTable({
        [sortBy]: true,
      });
    }
  };

  function TableCellHeader({
    text,
    sortBy,
  }: {
    text: string;
    sortBy: AssistanceRequestPropToSort;
  }) {
    return (
      <div
        onClick={() => handleClickSortTable(sortBy)}
        style={{ userSelect: 'none', cursor: 'pointer' }}
      >
        {text}
        {selectedPropToSortTable[sortBy] != undefined ? (
          selectedPropToSortTable[sortBy] ? (
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
  const [numberPagesAssistance, setNumberPagesAssistance] = React.useState(1);
  const prevNumberPagesAssistance = usePrevious(numberPagesAssistance);

  const [size, setSize] = React.useState(5);

  const [currentPageAssistance, setCurrentPageAssistance] = React.useState(0);

  useEffect(() => {
    if (
      prevNumberPagesAssistance &&
      prevNumberPagesAssistance > numberPagesAssistance &&
      currentPageAssistance >= numberPagesAssistance
    )
      setCurrentPageAssistance(numberPagesAssistance - 1);
  }, [numberPagesAssistance]);
  //#endregion

  useEffect(() => {
    updateAssistanceRequestList(
      getSelectedProp(),
      selectedPropToSortTable[getSelectedProp()] as boolean,
      size,
      currentPageAssistance,
    );
  }, [currentPageAssistance, size, selectedPropToSortTable]);

  useEffect(() => {
    if (selectedSolicitationId !== null) {
      setOpenViewSolicitation(true);
    }
  }, [selectedSolicitationId]);

  function handleClickViewSolicitation(id: number): void {
    navigate(`/solicitation/view/${id}`);
  }

  function handleCloseViewSolicitation() {
    setSelectedSolicitationId(null);
    setOpenViewSolicitation(false);
  }

  return (
    <>
      <TableContainer sx={{ maxHeight: '500px' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <TableCellHeader
                  text="Data de solicitação"
                  sortBy="createdAt"
                ></TableCellHeader>
              </TableCell>
              <TableCell align="center">
                <TableCellHeader
                  text="Solicitante"
                  sortBy="user.name"
                ></TableCellHeader>
              </TableCell>
              <TableCell align="center">
                <TableCellHeader
                  text="Status"
                  sortBy="situacao"
                ></TableCellHeader>
              </TableCell>
              <TableCell align="center">
                <TableCellHeader
                  text="Valor total da solicitação"
                  sortBy="valorTotal"
                ></TableCellHeader>
              </TableCell>
              <TableCell align="center">
                <TableCellHeader
                  text="Valor aprovado"
                  sortBy="valorAprovado"
                ></TableCellHeader>
              </TableCell>
              <TableCell align="center">
                <TableCellHeader
                  text="Data da avaliação"
                  sortBy="dataAprovacao"
                ></TableCellHeader>
              </TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {!requests.list.length && (
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
                  user,
                  valorTotal,
                  createdAt,
                  situacao,
                  valorAprovado,
                  automaticDecText,
                  dataAprovacao,
                  solicitanteDocente,
                  tituloPublicacao,
                  valorDiaria,
                  cotacaoMoeda,
                  nomeEvento,
                  isDolar,
                  qualis,
                  cidade,
                  pais,
                  dataInicio,
                  dataFim,
                  observacao,
                }) => (
                  <TableRow key={id}>
                    <TableCell align="center">{createdAt}</TableCell>

                    <TableCell align="center">{user.name}</TableCell>
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
                        style={{ backgroundColor: 'yellow' }}
                      >
                        Pendente de avaliação
                      </TableCell>
                    )}
                    <TableCell align="center">R$ {valorTotal}</TableCell>
                    {valorAprovado === null && (
                      <TableCell align="center">-</TableCell>
                    )}

                    {valorAprovado !== null && (
                      <TableCell align="center">R$ {valorAprovado}</TableCell>
                    )}

                    {dataAprovacao === null && (
                      <TableCell align="center">-</TableCell>
                    )}

                    {dataAprovacao !== null && (
                      <TableCell align="center">{dataAprovacao}</TableCell>
                    )}

                    <TableCell align="center">
                      <Box>
                        <>
                          <Tooltip title="Ver resumo da Solicitação">
                            <IconButton
                              onClick={() =>
                                handleClickTextOpenModal({
                                  nomeSolicitante: user.name,
                                  solicitanteDocente: solicitanteDocente,
                                  valorTotal: valorTotal,
                                  valorDiarias: valorDiaria,
                                  variacaoCambial: cotacaoMoeda,
                                  nomeEvento: nomeEvento,
                                  tituloPublicacao: tituloPublicacao,
                                  isDolar: isDolar,
                                  qualisEvento: qualis,
                                  cidade: cidade,
                                  pais: pais,
                                  dataInicio: dataInicio,
                                  dataFim: dataFim,
                                  situacao: situacao,
                                  observacoes: observacao,
                                })
                              }
                            >
                              <Visibility />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Ver Detalhes da Solicitação">
                            <IconButton
                              onClick={() => handleClickViewSolicitation(id!)}
                            >
                              <Description />
                            </IconButton>
                          </Tooltip>
                          {userCanViewAllRequests && (
                            <Tooltip title="Revisar Solicitação">
                              <IconButton
                                onClick={() => handleClickReviewRequest(id!)}
                              >
                                <CheckCircle />
                              </IconButton>
                            </Tooltip>
                          )}
                        </>

                        {user.email === currentUser.email && (
                          <Tooltip title="Editar Solicitação">
                            <IconButton
                              onClick={() => handleClickEditRequest(id!)}
                            >
                              <ModeEditIcon />
                            </IconButton>
                          </Tooltip>
                        )}

                        <Tooltip title="Excluir Solicitação">
                          <IconButton onClick={() => handleClickOpenModal(id!)}>
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ),
              )}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: 'flex' }}>
        <Stack spacing={2} style={{ marginTop: '1rem' }}>
          <Pagination
            count={numberPagesAssistance}
            onChange={(e, v) => setCurrentPageAssistance(v - 1)}
          ></Pagination>
        </Stack>
        <Select
          value={size}
          onChange={(e) => setSize(e.target.value as number)}
          type="number"
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </div>

      <Dialog
        open={openResume}
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

      <Dialog
        open={false}
        onClose={handleCloseTextModal}
        aria-labelledby="text-dialog-title"
        aria-describedby="text-dialog-description"
      >
        <DialogTitle id="text-dialog-title">Texto da Solicitação</DialogTitle>
        <DialogContent>
          <DialogContentText id="text-dialog-description">{}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTextModal}>Fechar</Button>
        </DialogActions>
      </Dialog>
      <SolicitationDetailsDialog
        open={openTextModal}
        onClose={handleCloseTextModal}
        solicitationData={{ ...textDialog }}
      />
      <SolicitationViewDialog
        open={openViewSolicitation}
        onClose={handleCloseViewSolicitation}
        id={String(selectedSolicitationId ?? '')}
      />
    </>
  );
}
