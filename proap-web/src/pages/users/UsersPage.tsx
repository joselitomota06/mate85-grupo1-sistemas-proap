import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { maskCpf, maskPhone } from '../../helpers/masks';
import useUsers from '../../hooks/auth/useUsers';
import Toast from '../../helpers/notification';
import { updateUserCredentials } from '../../services/authService';
import useAuth from '../../hooks/auth/useAuth';
import { UnauthorizedPage } from '../unauthorized/UnauthorizedPage';
import useHasPermission from '../../hooks/profile/useHasPermission';

export default function UsersPage() {
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('');
  const [open, setOpen] = useState(false);

  const {
    status,
    isLoading,
    users,
    page,
    totalUsers,
    PAGE_SIZE,
    handlePageChange,
    updateUsers,
  } = useUsers();

  const userCanViewPage = useHasPermission('VIEW_USER');

  const handleClose = () => setOpen(false);
  const handleConfirmSetAdmin = () => {
    setOpen(false);
    updateUserCredentials(currentUserEmail)
      .then(() => {
        Toast.success('Credencias do usuário atualizadas com sucesso.');
        setCurrentUserEmail('');
        updateUsers();
      })
      .catch(() => {
        Toast.error('Falha ao atualizar as credenciais do usuário');
      });
  };

  const handleClickPermissionAction = (email: string) => {
    setCurrentUserEmail(email);
    setOpen(true);
  };

  return !userCanViewPage ? (
    <UnauthorizedPage />
  ) : (
    <>
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
            <b>Deseja atribuir permissões administrativas a este usuário?</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Não</Button>
          <Button onClick={handleConfirmSetAdmin} variant="contained">
            Sim
          </Button>
        </DialogActions>
      </Dialog>
      {isLoading && <LinearProgress />}
      {!isLoading && (
        <>
          <Typography
            variant="h4"
            color="primary"
            fontWeight="bold"
            paddingBottom={2}
            marginTop={2}
          >
            Usuários cadastrados
          </Typography>
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell align="right">E-mail</TableCell>
                  <TableCell align="right">CPF</TableCell>
                  <TableCell align="right">Telefone</TableCell>
                  <TableCell align="right">Perfil de Usuário</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(({ name, cpf, email, phone, profileName }) => (
                  <TableRow
                    key={cpf}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {name}
                    </TableCell>
                    <TableCell align="right">{email}</TableCell>
                    <TableCell align="right">{maskCpf(cpf)}</TableCell>
                    <TableCell align="right">{maskPhone(phone)}</TableCell>
                    <TableCell align="right">
                      {profileName.charAt(0).toUpperCase() +
                        profileName.slice(1)}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => handleClickPermissionAction(email)}
                      >
                        <PermIdentityIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TablePagination
                    count={totalUsers}
                    page={page}
                    rowsPerPage={PAGE_SIZE}
                    rowsPerPageOptions={[PAGE_SIZE]}
                    onPageChange={handlePageChange}
                    labelRowsPerPage=""
                  />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
