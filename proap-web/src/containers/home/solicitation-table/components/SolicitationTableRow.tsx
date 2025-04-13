import React from 'react';
import { TableRow, TableCell, Tooltip, Box, IconButton } from '@mui/material';
import { CheckCircle, Description, Visibility } from '@mui/icons-material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatNumberToBRL } from '../../../../helpers/formatter';
import { SolicitationDetailsDialogProps } from '../../request-dialog/SolicitationDetailsDialog';

interface SolicitationRowData {
  id?: number;
  user?: {
    name: string;
    email: string;
  };
  valorTotal?: number;
  createdAt?: string;
  situacao?: number;
  valorAprovado?: number | null;
  dataAprovacao?: string | null;
  solicitanteDocente?: boolean;
  tituloPublicacao?: string;
  valorDiaria?: number;
  cotacaoMoeda?: number;
  nomeEvento?: string;
  isDolar?: boolean;
  qualis?: string;
  cidade?: string;
  pais?: string;
  dataInicio?: string;
  dataFim?: string;
  observacao?: string;
}

interface SolicitationTableRowProps extends SolicitationRowData {
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

/**
 * Component for displaying a single solicitation in the table
 */
const SolicitationTableRow: React.FC<SolicitationTableRowProps> = ({
  id,
  user = { name: '', email: '' },
  valorTotal = 0,
  createdAt = '',
  situacao = 0,
  valorAprovado = null,
  dataAprovacao = null,
  solicitanteDocente = false,
  tituloPublicacao = '',
  valorDiaria = 0,
  cotacaoMoeda = 0,
  nomeEvento = '',
  isDolar = false,
  qualis = '',
  cidade = '',
  pais = '',
  dataInicio = '',
  dataFim = '',
  observacao = '',
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
  const getStatusStyle = () => {
    if (situacao === 2) return { backgroundColor: 'lightcoral' };
    if (situacao === 1) return { backgroundColor: 'lightgreen' };
    return { backgroundColor: 'yellow' };
  };

  const getStatusText = () => {
    if (situacao === 2) return 'Não aprovada';
    if (situacao === 1) return 'Aprovada';
    return 'Pendente de avaliação';
  };

  // Ensure id is defined before using it
  const handleView = () => {
    if (id !== undefined) onView(id);
  };

  const handleEdit = () => {
    if (id !== undefined) onEdit(id);
  };

  const handleReview = () => {
    if (id !== undefined) onReview(id);
  };

  const handleDelete = () => {
    if (id !== undefined) onDelete(id);
  };

  return (
    <TableRow>
      <TableCell align="center">{createdAt}</TableCell>
      <TableCell align="center">{user.name}</TableCell>
      <TableCell align="center" style={getStatusStyle()}>
        {getStatusText()}
      </TableCell>
      <TableCell align="center">{formatNumberToBRL(valorTotal)}</TableCell>
      <TableCell align="center">
        {valorAprovado === null ? '-' : formatNumberToBRL(valorAprovado)}
      </TableCell>
      <TableCell align="center">
        {dataAprovacao === null ? '-' : dataAprovacao}
      </TableCell>
      <TableCell align="center">
        <Box>
          {userCanViewAllRequests && (
            <Tooltip title="Ver resumo da Solicitação">
              <IconButton
                onClick={() =>
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
                  })
                }
              >
                <Visibility />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Ver Detalhes da Solicitação">
            <IconButton onClick={handleView}>
              <Description />
            </IconButton>
          </Tooltip>
          {(userCanReviewRequests || isCeapg) && (
            <Tooltip title="Revisar Solicitação">
              <IconButton onClick={handleReview}>
                <CheckCircle />
              </IconButton>
            </Tooltip>
          )}
          {((situacao === 0 && currentUserEmail === user.email) ||
            userCanReviewRequests) && (
            <Tooltip title="Editar Solicitação">
              <IconButton onClick={handleEdit}>
                <ModeEditIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Excluir Solicitação">
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default SolicitationTableRow;
