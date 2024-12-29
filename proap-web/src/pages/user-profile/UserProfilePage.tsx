import { useSelector } from 'react-redux';
import { IRootState, useAppDispatch } from '../../store';
import { useEffect } from 'react';
import {
  setLoading,
  updateUser,
} from '../../store/slices/user-profile-slice/userProfileSlice';
import { getCurrentUserInfo } from '../../services/authService';
import { User } from '../../types';
import { Container, Paper, Typography } from '@mui/material';
import UserProfileFormContainer from '../../containers/user-profile/UserProfileFormContainer';

export default function UserProfilePage() {
  const dispatch = useAppDispatch();
  const { currentUser, isLoading, error } = useSelector(
    (state: IRootState) => state.userProfileSlice,
  );

  useEffect(() => {
    dispatch(setLoading(true));
    getCurrentUserInfo(dispatch).then(() => dispatch(setLoading(false)));
  }, [dispatch]);

  const handleSubmit = (values: Partial<User>) => {
    dispatch(setLoading(true));
    dispatch(updateUser(values));
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
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem' }}>
        <UserProfileFormContainer
          initialValues={currentUser}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Container>
  );
}
