import { useSelector } from 'react-redux';
import { IRootState, useAppDispatch } from '../../store';
import { useEffect } from 'react';
import { getCurrentUserInfo } from '../../services/authService';
import { updateUser } from '../../store/slices/user-profile-slice/userProfileSlice';

export default function useCurrentUser() {
  const { currentUser } = useSelector(
    (state: IRootState) => state.userProfileSlice,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentUser.email === '') {
      getCurrentUserInfo()
        .then((user) => {
          dispatch(updateUser(user));
        })
        .catch((error) => {
          console.error('Error getting current user info: ', error);
        });
    }
  }, [currentUser, dispatch]);

  return currentUser;
}
