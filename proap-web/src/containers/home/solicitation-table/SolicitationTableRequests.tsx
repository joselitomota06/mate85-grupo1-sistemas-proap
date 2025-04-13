import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import {
  AssistanceRequestPropToSort,
  getAssistanceRequests,
  removeAssistanceRequestById,
} from '../../../services/assistanceRequestService';
import { IRootState, useAppDispatch } from '../../../store';
import { useAuth } from '../../../hooks';
import usePrevious from '../../../helpers/usePrevious';
import useHasPermission from '../../../hooks/auth/useHasPermission';
import SolicitationDetailsDialog, {
  SolicitationDetailsDialogProps,
} from '../request-dialog/SolicitationDetailsDialog';
import { useTableSort } from '../../../hooks';
import { TableCellHeader, SolicitationTableRow } from './components';
import { ConfirmationDialog } from '../../../components/dialogs';

/**
 * Component that displays a table of assistance requests
 * Allows sorting, pagination, and actions like view, edit, review, delete
 */
export default function SolicitationTableRequests() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userCanViewAllRequests = useHasPermission('VIEW_ALL_REQUESTS');
  const isCeapg = useHasPermission('CEAPG_ROLE');
  const userCanReviewRequests = useHasPermission('APPROVE_REQUEST');
  const currentUser = useAuth();

  // Table sorting
  const { selectedPropToSortTable, getSelectedProp, handleClickSortTable } =
    useTableSort('createdAt', false);

  // Pagination
  const [numberPagesAssistance, setNumberPagesAssistance] = useState(1);
  const prevNumberPagesAssistance = usePrevious(numberPagesAssistance);
  const [size, setSize] = useState(5);
  const [currentPageAssistance, setCurrentPageAssistance] = useState(0);

  // Deletion confirmation
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [solicitationToDelete, setSolicitationToDelete] = useState<
    number | null
  >(null);

  // Solicitation details
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [detailsDialogData, setDetailsDialogData] =
    useState<SolicitationDetailsDialogProps>({
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

  // Data fetching
  const { requests } = useSelector(
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

  const updateAssistanceRequestListWithCurrentParameters = () => {
    updateAssistanceRequestList(
      getSelectedProp(),
      selectedPropToSortTable[getSelectedProp()] as boolean,
      size,
      currentPageAssistance,
    );
  };

  // Action handlers
  const handleClickEditRequest = (id: number) => {
    navigate(`/solicitation/edit/${id}`);
  };

  const handleClickReviewRequest = (id: number) => {
    navigate(`/solicitation/review/${id}`);
  };

  const handleClickViewSolicitation = (id: number) => {
    navigate(`/solicitation/view/${id}`);
  };

  const handleClickRemoveRequest = () => {
    if (solicitationToDelete) {
      removeAssistanceRequestById(solicitationToDelete).then(() => {
        updateAssistanceRequestListWithCurrentParameters();
        toast.success('Solicitação removida com sucesso');
        setOpenDeleteConfirmation(false);
        setSolicitationToDelete(null);
      });
    }
  };

  const openDeleteDialog = (id: number) => {
    setSolicitationToDelete(id);
    setOpenDeleteConfirmation(true);
  };

  const closeDeleteDialog = () => {
    setOpenDeleteConfirmation(false);
    setSolicitationToDelete(null);
  };

  const handleShowDetails = (props: SolicitationDetailsDialogProps) => {
    setDetailsDialogData(props);
    setOpenDetailsDialog(true);
  };

  // Effects
  useEffect(() => {
    if (
      prevNumberPagesAssistance &&
      prevNumberPagesAssistance > numberPagesAssistance &&
      currentPageAssistance >= numberPagesAssistance
    )
      setCurrentPageAssistance(numberPagesAssistance - 1);
  }, [numberPagesAssistance, prevNumberPagesAssistance, currentPageAssistance]);

  useEffect(() => {
    updateAssistanceRequestList(
      getSelectedProp(),
      selectedPropToSortTable[getSelectedProp()] as boolean,
      size,
      currentPageAssistance,
    );
  }, [
    currentPageAssistance,
    size,
    selectedPropToSortTable,
    updateAssistanceRequestList,
  ]);

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
                  selectedPropToSortTable={selectedPropToSortTable}
                  handleClickSortTable={handleClickSortTable}
                />
              </TableCell>
              <TableCell align="center">
                <TableCellHeader
                  text="Solicitante"
                  sortBy="user.name"
                  selectedPropToSortTable={selectedPropToSortTable}
                  handleClickSortTable={handleClickSortTable}
                />
              </TableCell>
              <TableCell align="center">
                <TableCellHeader
                  text="Status"
                  sortBy="situacao"
                  selectedPropToSortTable={selectedPropToSortTable}
                  handleClickSortTable={handleClickSortTable}
                />
              </TableCell>
              <TableCell align="center">
                <TableCellHeader
                  text="Valor total da solicitação"
                  sortBy="valorTotal"
                  selectedPropToSortTable={selectedPropToSortTable}
                  handleClickSortTable={handleClickSortTable}
                />
              </TableCell>
              <TableCell align="center">
                <TableCellHeader
                  text="Valor aprovado"
                  sortBy="valorAprovado"
                  selectedPropToSortTable={selectedPropToSortTable}
                  handleClickSortTable={handleClickSortTable}
                />
              </TableCell>
              <TableCell align="center">
                <TableCellHeader
                  text="Data da avaliação"
                  sortBy="dataAprovacao"
                  selectedPropToSortTable={selectedPropToSortTable}
                  handleClickSortTable={handleClickSortTable}
                />
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
              requests.list.map((solicitation) => (
                <SolicitationTableRow
                  key={solicitation.id}
                  {...solicitation}
                  currentUserEmail={currentUser.email}
                  userCanViewAllRequests={userCanViewAllRequests}
                  userCanReviewRequests={userCanReviewRequests}
                  isCeapg={isCeapg}
                  onEdit={handleClickEditRequest}
                  onReview={handleClickReviewRequest}
                  onView={handleClickViewSolicitation}
                  onDelete={openDeleteDialog}
                  onShowDetails={handleShowDetails}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div style={{ display: 'flex' }}>
        <Stack spacing={2} style={{ marginTop: '1rem' }}>
          <Pagination
            count={numberPagesAssistance}
            onChange={(e, v) => setCurrentPageAssistance(v - 1)}
          />
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

      <ConfirmationDialog
        open={openDeleteConfirmation}
        onClose={closeDeleteDialog}
        onConfirm={handleClickRemoveRequest}
        title="Remoção de solicitação"
        message="Deseja realmente remover esta solicitação?"
      />

      <SolicitationDetailsDialog
        open={openDetailsDialog}
        onClose={() => setOpenDetailsDialog(false)}
        solicitationData={detailsDialogData}
      />
    </>
  );
}
