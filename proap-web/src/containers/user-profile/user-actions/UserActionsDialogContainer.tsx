import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tab,
  Tabs,
  Box,
  Typography,
  CircularProgress,
} from '@mui/material';
import ProfileSelectionComponent from '../../../components/user-actions/ProfileSelectionComponent';
import { ProfileRole } from '../../../types';
import useAllProfiles from '../../../hooks/profile/useAllProfiles';
import Toast from '../../../helpers/notification';
import {
  updateUserProfileRole,
  deleteUser,
} from '../../../services/authService';
import DeleteUserComponent from '../../../components/user-actions/DeleteUserComponent';
import useHasPermission from '../../../hooks/auth/useHasPermission';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`user-actions-tabpanel-${index}`}
      aria-labelledby={`user-actions-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

interface UserActionsDialogProps {
  open: boolean;
  userEmail: string;
  userName: string;
  currentProfile: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UserActionsDialogContainer({
  open,
  userEmail,
  userName,
  currentProfile,
  onClose,
  onSuccess,
}: UserActionsDialogProps) {
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const profiles = useAllProfiles();
  const isAdmin = useHasPermission('ADMIN_ROLE');

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleUpdateProfile = (selectedProfile: ProfileRole) => {
    setIsLoading(true);
    updateUserProfileRole(userEmail, selectedProfile.id)
      .then(() => {
        Toast.success(
          `Perfil do usuário alterado para ${selectedProfile.name}`,
        );
        setIsLoading(false);
        onSuccess();
      })
      .catch((error) => {
        Toast.error(`Falha ao atualizar perfil: ${error.message}`);
        setIsLoading(false);
        console.error(error);
      });
  };

  const handleDeleteUser = () => {
    setIsLoading(true);
    deleteUser(userEmail)
      .then(() => {
        Toast.success('Usuário excluído com sucesso');
        setIsLoading(false);
        onClose();
        onSuccess();
      })
      .catch((error) => {
        Toast.error(`Falha ao excluir o usuário: ${error.message}`);
        setIsLoading(false);
        console.error(error);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="user-actions-dialog-title"
    >
      <DialogTitle id="user-actions-dialog-title">
        Gerenciar Usuário
      </DialogTitle>

      <DialogContent>
        <>
          <Typography variant="h6" gutterBottom>
            {userName}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Email: {userEmail}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Perfil atual: {currentProfile}
          </Typography>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Atribuir perfil" />
              <Tab label="Excluir usuário" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            {profiles.error ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="subtitle2" alignSelf="center" gutterBottom>
                  {profiles.error}
                </Typography>
              </Box>
            ) : (
              <ProfileSelectionComponent
                profiles={profiles.profiles}
                currentProfile={currentProfile}
                onSubmit={handleUpdateProfile}
              />
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {isAdmin ? (
              <DeleteUserComponent
                onSubmit={handleDeleteUser}
                userEmail={userEmail}
              />
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="subtitle2" alignSelf="center" gutterBottom>
                  Você não tem permissão para excluir usuários
                </Typography>
              </Box>
            )}
          </TabPanel>
        </>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
