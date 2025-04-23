import React, { useState, useEffect } from 'react';
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
  Box,
  TextField,
  InputAdornment,
  Chip,
  Tooltip,
  Card,
  CardContent,
  Stack,
  Container,
  useTheme,
  useMediaQuery,
  Grid,
  Divider,
  Button,
} from '@mui/material';
import {
  PermIdentity as PermIdentityIcon,
  Search as SearchIcon,
  AdminPanelSettings,
  NoAccounts,
} from '@mui/icons-material';
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
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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

  useEffect(() => {
    if (users.length > 0) {
      setFilteredUsers(
        users.filter((user) =>
          Object.values(user).some(
            (value) =>
              typeof value === 'string' &&
              value.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        ),
      );
    }
  }, [users, searchTerm]);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const getProfileChipColor = (profileName: string) => {
    const profile = profileName.toLowerCase();
    if (profile.includes('admin')) return 'success';
    if (profile.includes('ceapg')) return 'warning';
    if (profile.includes('funcionario')) return 'warning';
    if (profile.includes('docente')) return 'primary';
    if (profile.includes('discente')) return 'info';
    return 'error';
  };

  const renderMobileView = () => (
    <Stack spacing={2}>
      {filteredUsers.map(({ name, cpf, email, phone, profileName }) => (
        <Card key={cpf} elevation={1} sx={{ mb: 1 }}>
          <CardContent>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}
            >
              <Typography variant="h6" component="div">
                {name}
              </Typography>
              <Chip
                label={
                  profileName.charAt(0).toUpperCase() + profileName.slice(1)
                }
                color={getProfileChipColor(profileName)}
                size="small"
              />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={1}>
              <Typography variant="body2">
                <strong>Email:</strong> {email}
              </Typography>
              <Typography variant="body2">
                <strong>CPF:</strong> {maskCpf(cpf)}
              </Typography>
              <Typography variant="body2">
                <strong>Telefone:</strong> {maskPhone(phone)}
              </Typography>
            </Stack>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<PermIdentityIcon />}
                onClick={() =>
                  handleClickPermissionAction(email, name, profileName)
                }
              >
                Gerenciar
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
      {filteredUsers.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <TablePagination
            component="div"
            count={totalUsers}
            page={page}
            rowsPerPage={PAGE_SIZE}
            rowsPerPageOptions={[PAGE_SIZE]}
            onPageChange={handlePageChange}
            labelRowsPerPage=""
          />
        </Box>
      )}
    </Stack>
  );

  const renderDesktopView = () => (
    <TableContainer component={Paper} elevation={0}>
      <Table
        stickyHeader
        sx={{ minWidth: 650 }}
        size="medium"
        aria-label="users table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>CPF</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>Perfil de Usuário</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.length > 0 ? (
            <>
              {filteredUsers.map(({ name, cpf, email, phone, profileName }) => (
                <TableRow
                  key={cpf}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{maskCpf(cpf)}</TableCell>
                  <TableCell>{maskPhone(phone)}</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        profileName.charAt(0).toUpperCase() +
                        profileName.slice(1)
                      }
                      color={getProfileChipColor(profileName)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Gerenciar permissões">
                      <IconButton
                        onClick={() =>
                          handleClickPermissionAction(email, name, profileName)
                        }
                        color="primary"
                        aria-label="gerenciar usuário"
                      >
                        <PermIdentityIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Box
                  sx={{
                    py: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <NoAccounts
                    sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }}
                  />
                  <Typography variant="body1" color="text.secondary">
                    Nenhum usuário encontrado
                  </Typography>
                </Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {filteredUsers.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TablePagination
            component="div"
            count={totalUsers}
            page={page}
            rowsPerPage={PAGE_SIZE}
            rowsPerPageOptions={[PAGE_SIZE]}
            onPageChange={handlePageChange}
            labelRowsPerPage=""
          />
        </Box>
      )}
    </TableContainer>
  );

  return !userCanViewPage ? (
    <UnauthorizedPage />
  ) : (
    <Container maxWidth="xl">
      <UserActionsDialogContainer
        open={open}
        userEmail={currentUserEmail}
        userName={currentUserName}
        currentProfile={currentProfile}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />

      <Box sx={{ mb: 4, mt: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 3,
            flexDirection: isMobile ? 'column' : 'row',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              width: isMobile ? '100%' : 'auto',
            }}
          >
            <AdminPanelSettings color="primary" fontSize="large" />
            <Typography variant="h5" color="primary" fontWeight="bold">
              Usuários cadastrados
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, width: isMobile ? '100%' : 'auto' }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar usuário..."
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {isLoading ? (
          <Card
            sx={{
              p: 4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
            }}
          >
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
              <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                Carregando usuários...
              </Typography>
            </Box>
          </Card>
        ) : (
          <Card elevation={1}>
            {isMobile ? renderMobileView() : renderDesktopView()}
          </Card>
        )}
      </Box>
    </Container>
  );
}
