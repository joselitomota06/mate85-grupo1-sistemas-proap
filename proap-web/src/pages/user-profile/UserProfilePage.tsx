import { useSelector } from 'react-redux';
import { IRootState, useAppDispatch } from '../../store';
import { useEffect } from 'react';
import {
  setLoading,
  updateUser,
} from '../../store/slices/user-profile-slice/userProfileSlice';
import {
  changeUserPassword,
  getCurrentUserInfo,
  updateUserProfile,
} from '../../services/authService';
import { User } from '../../types';
import { Box, Container, Fade, Paper, Typography } from '@mui/material';
import UserProfileFormContainer from '../../containers/user-profile/UserProfileFormContainer';
import Toast from '../../helpers/notification';
import ChangePasswordContainer from '../../containers/change-password/ChangePasswordContainer';

export default function UserProfilePage() {
  const dispatch = useAppDispatch();
  const { currentUser, isLoading, error } = useSelector(
    (state: IRootState) => state.userProfileSlice,
  );

  useEffect(() => {
    if (currentUser.email === '') {
      dispatch(setLoading(true));
      getCurrentUserInfo()
        .then((user) => {
          dispatch(updateUser(user));
          dispatch(setLoading(false));
        })
        .catch((error) => {
          dispatch(setLoading(false));
          Toast.error(
            'Erro ao carregar informações do usuário: ' + error.message,
          );
        });
    }
  }, [currentUser, dispatch]);

  const handleSubmit = async (values: User) => {
    dispatch(setLoading(true));
    updateUserProfile(values)
      .then((updatedUsers) => {
        Toast.success('Usuário atualizado com sucesso!');
        dispatch(updateUser(updatedUsers));
        dispatch(setLoading(false));
      })
      .catch((error) => {
        Toast.error('Erro ao atualizar usuário: ' + error.message);
        dispatch(setLoading(false));
      });
  };
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h4" fontWeight="bold">
          Carregando...
        </Typography>
      </Box>
    );
  }

  const handleChangePasswordSubmit = (values: unknown) => {
    const { currentPassword, newPassword } = values as {
      currentPassword: string;
      newPassword: string;
    };
    dispatch(setLoading(true));
    changeUserPassword(currentPassword, newPassword)
      .then((response) => {
        Toast.success(response.message);
        dispatch(setLoading(false));
      })
      .catch((error) => {
        Toast.error(error.response.data.message);
        console.error(error.response.data);
        dispatch(setLoading(false));
      });
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" color="primary" fontWeight="bold" paddingTop={4}>
        Informações do Usuário
      </Typography>
      <Fade in timeout={500}>
        <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
          <UserProfileFormContainer
            initialValues={currentUser}
            onSubmit={handleSubmit}
          />
        </Paper>
      </Fade>
      <Typography variant="h4" color="primary" fontWeight="bold" paddingTop={4}>
        Alterar Senha
      </Typography>
      <Fade in timeout={500}>
        <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
          <ChangePasswordContainer onSubmit={handleChangePasswordSubmit} />
        </Paper>
      </Fade>
    </Container>
  );
}
