import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  alpha,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { formatNumberToBRL } from '../../../../helpers/formatter';
import { SolicitationDetailsDialogProps } from '../../request-dialog/SolicitationDetailsDialog';
import { StatusChip } from './index';

interface SolicitationCardProps {
  solicitation: any;
  currentUserEmail: string;
  userCanViewAllRequests: boolean;
  userCanReviewRequests: boolean;
  isCeapg: boolean;
  onEdit: (id: number) => void;
  onReview: (id: number) => void;
  onView: (id: number) => void;
  onDelete: (id: number) => void;
  onShowDetails: (props: SolicitationDetailsDialogProps) => void;
}

const SolicitationCard: React.FC<SolicitationCardProps> = ({
  solicitation,
  currentUserEmail,
  userCanViewAllRequests,
  userCanReviewRequests,
  isCeapg,
  onEdit,
  onReview,
  onView,
  onDelete,
  onShowDetails,
}) => {
  const {
    id,
    user,
    valorTotal,
    createdAt,
    situacao,
    valorAprovado,
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
  } = solicitation;

  // Menu state
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent card click when menu button is clicked
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // Handle card click to navigate to view page
  const handleCardClick = () => {
    if (id !== undefined) onView(id);
  };

  const handleEdit = () => {
    if (id !== undefined) {
      onEdit(id);
      handleCloseMenu();
    }
  };

  const handleReview = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (id !== undefined) onReview(id);
  };

  const handleDelete = () => {
    if (id !== undefined) {
      onDelete(id);
      handleCloseMenu();
    }
  };

  const handleShowDetails = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onShowDetails({
      nomeSolicitante: user.name,
      solicitanteDocente,
      valorTotal,
      valorDiarias: valorDiaria,
      variacaoCambial: cotacaoMoeda,
      nomeEvento,
      tituloPublicacao,
      isDolar,
      qualisEvento: qualis,
      cidade,
      pais,
      dataInicio,
      dataFim,
      situacao,
      observacoes: observacao,
    });
  };

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
      }}
      onClick={handleCardClick}
    >
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={1}
        >
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight="medium"
              component="div"
              noWrap
              gutterBottom
            >
              {user.name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              component="div"
            >
              Solicitado em: {createdAt}
            </Typography>
          </Box>
          <StatusChip status={situacao} />
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Box mt={1.5}>
          <Typography variant="body2" color="text.secondary">
            Valor solicitado
          </Typography>
          <Typography variant="h6" component="div" fontWeight="medium">
            {formatNumberToBRL(valorTotal)}
          </Typography>
        </Box>

        <Box mt={1.5} display="flex" justifyContent="space-between">
          <Box>
            <Typography variant="body2" color="text.secondary">
              Valor aprovado
            </Typography>
            <Typography variant="body1">
              {valorAprovado === null ? '-' : formatNumberToBRL(valorAprovado)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" align="right">
              Data de avaliação
            </Typography>
            <Typography variant="body1" align="right">
              {dataAprovacao === null ? '-' : dataAprovacao}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 1,
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.05),
        }}
        onClick={(e) => e.stopPropagation()} // Prevent card click when clicking action buttons
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          {/* Primary Actions - Always visible */}
          {userCanViewAllRequests && (
            <IconButton
              size="small"
              color="primary"
              onClick={handleShowDetails}
              title="Ver resumo"
            >
              <VisibilityIcon fontSize="small" />
            </IconButton>
          )}

          {(userCanReviewRequests || isCeapg) && (
            <IconButton
              size="small"
              color="success"
              onClick={handleReview}
              title="Revisar"
            >
              <CheckCircleIcon fontSize="small" />
            </IconButton>
          )}
        </Box>

        {/* More Actions Menu Button */}
        <IconButton
          size="small"
          color="default"
          onClick={handleOpenMenu}
          aria-label="mais ações"
          aria-controls={open ? 'actions-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          title="Mais ações"
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>

        {/* Dropdown Menu */}
        <Menu
          id="actions-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          MenuListProps={{
            'aria-labelledby': 'more-button',
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClick={(e) => e.stopPropagation()} // Prevent card click on menu click
        >
          {/* Secondary Actions - In Dropdown */}
          <MenuItem
            onClick={handleEdit}
            disabled={
              !(
                (situacao == 0 && currentUserEmail === user.email) ||
                userCanReviewRequests
              )
            }
          >
            <ListItemIcon>
              <ModeEditIcon fontSize="small" color="warning" />
            </ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </MenuItem>

          <MenuItem
            onClick={handleDelete}
            disabled={
              !(
                (situacao == 0 && currentUserEmail === user.email) ||
                userCanReviewRequests
              )
            }
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Excluir</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </Card>
  );
};

export default SolicitationCard;
