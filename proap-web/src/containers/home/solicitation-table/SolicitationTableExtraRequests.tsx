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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
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

import { removeAssistanceRequestById } from '../../../services/assistanceRequestService';
import {
  ExtraRequestPropToSort,
  deleteExtraAssistanceRequest,
  getExtraAssistanceRequests,
} from '../../../services/extraAssistanceRequestService';
import { IRootState, useAppDispatch } from '../../../store';
import { useAuth } from '../../../hooks';
import usePrevious from '../../../helpers/usePrevious';
import useHasPermission from '../../../hooks/auth/useHasPermission';
import { useViewModePreference } from '../../../hooks';
import { ExtraRequestTableView, ExtraRequestGridView } from './components';

/**
 * Component that displays a table of extra assistance requests
 * Allows sorting, pagination, and actions like edit, review, delete
 */
export default function SolicitationTableExtraRequests() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const currentUser = useAuth();

  // Permissions
  const userCanViewAllRequests = useHasPermission('VIEW_ALL_REQUESTS');
  const isCeapg = useHasPermission('CEAPG_ROLE');
  const userCanReviewRequests = useHasPermission('APPROVE_REQUEST');

  // View mode (table or grid) com preferência salva
  const [viewMode, setViewMode] = useViewModePreference(currentUser.email);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Table sorting
  const [selectedPropToSortTable, setSelectedPropToSortTable] = useState<{
    [Property in ExtraRequestPropToSort]?: boolean;
  }>({
    createdAt: false,
  });

  const getSelectedProp = () => {
    return Object.getOwnPropertyNames(
      selectedPropToSortTable,
    )[0] as ExtraRequestPropToSort;
  };

  const handleClickSortTable = (sortBy: ExtraRequestPropToSort) => {
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

  // Pagination
  const [numberPages, setNumberPages] = useState(1);
  const prevNumberPages = usePrevious(numberPages);
  const [size, setSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  // Deletion confirmation
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [solicitationToDelete, setSolicitationToDelete] = useState<
    number | null
  >(null);

  // Data fetching
  const { extraRequests } = useSelector(
    (state: IRootState) => state.assistanceRequestSlice,
  );

  const updateRequestList = useCallback(
    (
      sortBy: ExtraRequestPropToSort,
      ascending: boolean,
      size: number,
      page: number,
    ) => {
      dispatch(getExtraAssistanceRequests(sortBy, ascending, page, size)).then(
        (extraRequests) =>
          setNumberPages(Math.trunc(extraRequests.payload.total / size) + 1),
      );
    },
    [dispatch],
  );

  const updateRequestListWithCurrentParameters = () => {
    updateRequestList(
      getSelectedProp(),
      selectedPropToSortTable[getSelectedProp()] as boolean,
      size,
      currentPage,
    );
  };

  // Action handlers
  const handleClickEdit = (id: number) => {
    navigate(`/extra-solicitation/edit/${id}`);
  };

  const handleClickReview = (id: number) => {
    navigate(`/extra-solicitation/review/${id}`);
  };

  const handleClickView = (id: number) => {
    // Navigate to view page
    navigate(`/extra-solicitation/view/${id}`);
  };

  const openDeleteDialog = (id: number) => {
    setSolicitationToDelete(id);
    setOpenDeleteConfirmation(true);
  };

  const closeDeleteDialog = () => {
    setOpenDeleteConfirmation(false);
    setSolicitationToDelete(null);
  };

  const handleClickRemoveRequest = () => {
    if (solicitationToDelete) {
      deleteExtraAssistanceRequest(solicitationToDelete).then(() => {
        updateRequestListWithCurrentParameters();
        toast.success('Solicitação extra removida com sucesso');
        closeDeleteDialog();
      });
    }
  };

  const handleShowText = (text: string) => {
    if (text == null) {
      let message =
        'Texto de solicitação\n\nTexto não disponível, solicitação ainda não foi avaliada. Avalie a solicitação e volte para conferir.';
      alert(message);
    } else {
      alert('Texto de solicitação\n\n' + text);
    }
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
      prevNumberPages &&
      prevNumberPages > numberPages &&
      currentPage >= numberPages
    )
      setCurrentPage(numberPages - 1);
  }, [numberPages, prevNumberPages, currentPage]);

  useEffect(() => {
    updateRequestList(
      getSelectedProp(),
      selectedPropToSortTable[getSelectedProp()] as boolean,
      size,
      currentPage,
    );
  }, [currentPage, size, selectedPropToSortTable, updateRequestList]);

  // Initial load
  useEffect(() => {
    updateRequestListWithCurrentParameters();
  }, []);

  // Filter requests based on search query
  const filteredRequests = extraRequests.list.filter(
    (request) =>
      !searchQuery ||
      request.user.name.toLowerCase().includes(searchQuery.toLowerCase()),
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
            Solicitações de Demanda Extra
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
        <ExtraRequestTableView
          extraRequests={filteredRequests}
          currentUserEmail={currentUser.email}
          userCanViewAllRequests={userCanViewAllRequests}
          userCanReviewRequests={userCanReviewRequests}
          isCeapg={isCeapg}
          selectedPropToSortTable={selectedPropToSortTable}
          handleClickSortTable={handleClickSortTable}
          onEdit={handleClickEdit}
          onReview={handleClickReview}
          onView={handleClickView}
          onDelete={openDeleteDialog}
          onShowText={handleShowText}
        />
      ) : (
        <ExtraRequestGridView
          extraRequests={filteredRequests}
          currentUserEmail={currentUser.email}
          userCanViewAllRequests={userCanViewAllRequests}
          userCanReviewRequests={userCanReviewRequests}
          isCeapg={isCeapg}
          onEdit={handleClickEdit}
          onReview={handleClickReview}
          onView={handleClickView}
          onDelete={openDeleteDialog}
          onShowText={handleShowText}
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
          count={numberPages}
          page={currentPage + 1}
          onChange={(e, v) => setCurrentPage(v - 1)}
          color="primary"
          showFirstButton
          showLastButton
          size={isMobile ? 'small' : 'medium'}
        />

        <Typography variant="body2" color="text.secondary">
          Total: {extraRequests.total} solicitações
        </Typography>
      </Box>

      <Dialog
        open={openDeleteConfirmation}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Remoção de solicitação
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <b>Deseja realmente remover esta solicitação?</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Não</Button>
          <Button onClick={handleClickRemoveRequest} autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
