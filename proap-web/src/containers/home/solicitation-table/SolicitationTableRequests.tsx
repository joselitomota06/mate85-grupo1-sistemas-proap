import {
  Typography,
  Box,
  Paper,
  InputAdornment,
  TextField,
  IconButton,
  useMediaQuery,
  useTheme,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  MenuItem,
  Select,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Pagination from '@mui/material/Pagination';

// Icons
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';

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
import { useTableSort, useViewModePreference } from '../../../hooks';
import { SolicitationTableView, SolicitationGridView } from './components';
import { ConfirmationDialog } from '../../../components/dialogs';

/**
 * Component that displays a table of assistance requests
 * Allows sorting, pagination, and actions like view, edit, review, delete
 */
export default function SolicitationTableRequests() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const userCanViewAllRequests = useHasPermission('VIEW_ALL_REQUESTS');
  const isCeapg = useHasPermission('CEAPG_ROLE');
  const userCanReviewRequests = useHasPermission('APPROVE_REQUEST');
  const currentUser = useAuth();

  // View mode (table or grid) com preferência salva
  const [viewMode, setViewMode] = useViewModePreference(currentUser.email);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Table sorting
  const { selectedPropToSortTable, getSelectedProp, handleClickSortTable } =
    useTableSort('createdAt', false);

  // Pagination
  const [numberPagesAssistance, setNumberPagesAssistance] = useState(1);
  const prevNumberPagesAssistance = usePrevious(numberPagesAssistance);
  const [size, setSize] = useState(10);
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

  const handleViewModeChange = (
    _: React.MouseEvent<HTMLElement>,
    newMode: 'table' | 'grid',
  ) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
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

  // Filter requests based on search query
  const filteredRequests = requests.list.filter(
    (request) =>
      !searchQuery ||
      request.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.tituloPublicacao
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      request.nomeEvento?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Solicitações de Apoio
          </Typography>

          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={handleViewModeChange}
            aria-label="view mode"
            size="small"
          >
            <ToggleButton value="table" aria-label="table view">
              <Tooltip title="Visualização em tabela">
                <ViewListIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="grid" aria-label="grid view">
              <Tooltip title="Visualização em cards">
                <ViewModuleIcon />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Buscar solicitações"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flexGrow: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="Ordenação">
              <IconButton size="small">
                <SortIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Filtros">
              <IconButton size="small">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      {viewMode === 'table' ? (
        <SolicitationTableView
          filteredRequests={filteredRequests}
          searchQuery={searchQuery}
          selectedPropToSortTable={selectedPropToSortTable}
          handleClickSortTable={handleClickSortTable}
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
      ) : (
        <SolicitationGridView
          filteredRequests={filteredRequests}
          searchQuery={searchQuery}
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
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Itens por página:
          </Typography>
          <Select
            value={size}
            onChange={(e) => setSize(e.target.value as number)}
            size="small"
            sx={{ minWidth: 70 }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </Box>

        <Pagination
          count={numberPagesAssistance}
          page={currentPageAssistance + 1}
          onChange={(e, v) => setCurrentPageAssistance(v - 1)}
          color="primary"
          showFirstButton
          showLastButton
          size={isMobile ? 'small' : 'medium'}
        />

        <Typography variant="body2" color="text.secondary">
          Total: {requests.total} solicitações
        </Typography>
      </Box>

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
    </Paper>
  );
}
