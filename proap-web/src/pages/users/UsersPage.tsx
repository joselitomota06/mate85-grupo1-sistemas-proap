import React, { useState } from 'react';
import {
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
import { UnauthorizedPage } from '../unauthorized/UnauthorizedPage';
import useHasPermission from '../../hooks/auth/useHasPermission';
import UserActionsDialogContainer from '../../containers/user-profile/user-actions/UserActionsDialogContainer';

export default function UsersPage() {
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('');
  const [currentUserName, setCurrentUserName] = useState<string>('');
  const [currentProfile, setCurrentProfile] = useState<string>('');
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

  const handleSuccess = () => {
    setOpen(false);
    setCurrentUserEmail('');
    setCurrentUserName('');
    setCurrentProfile('');
    updateUsers();
  };

  const handleClickPermissionAction = (
    email: string,
    name: string,
    profileName: string,
  ) => {
    setCurrentUserEmail(email);
    setCurrentUserName(name);
    setCurrentProfile(profileName);
    setOpen(true);
  };

  return !userCanViewPage ? (
    <UnauthorizedPage />
  ) : (
    <>
      <UserActionsDialogContainer
        open={open}
        userEmail={currentUserEmail}
        userName={currentUserName}
        currentProfile={currentProfile}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
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
                        onClick={() =>
                          handleClickPermissionAction(email, name, profileName)
                        }
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
