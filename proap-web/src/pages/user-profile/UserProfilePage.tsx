import { useSelector } from 'react-redux';
import { IRootState, useAppDispatch } from '../../store';
import { useEffect } from 'react';
import {
  setLoading,
  updateUser,
} from '../../store/slices/user-profile-slice/userProfileSlice';
import {
  getCurrentUserInfo,
  updateUserProfile,
} from '../../services/authService';
import { User } from '../../types';
import { Container, Paper, Typography } from '@mui/material';
import UserProfileFormContainer from '../../containers/user-profile/UserProfileFormContainer';

export default function UserProfilePage() {
  const dispatch = useAppDispatch();
  const { currentUser, isLoading, error } = useSelector(
    (state: IRootState) => state.userProfileSlice,
  );

  useEffect(() => {
    if (currentUser.email === '') {
      dispatch(setLoading(true));
      getCurrentUserInfo(dispatch).then(() => dispatch(setLoading(false)));
    }
  }, [currentUser, dispatch]);

  const handleSubmit = async (values: User) => {
    dispatch(setLoading(true));
    const updatedUsers = await updateUserProfile(values);
    dispatch(updateUser(updatedUsers));
    dispatch(setLoading(false));
  };
  if (isLoading) {
    return <Typography>Carregando...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" color="primary" fontWeight="bold" paddingTop={4}>
        Informações do Usuário
      </Typography>
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <UserProfileFormContainer
          initialValues={currentUser}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Container>
  );
}
