import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, IRootState } from '../../store';
import useAuth from '../auth/useAuth';
import { useEffect } from 'react';
import { loadProfiles } from '../../store/slices/profile-slice/profileSlice';

/* 
  Hook to verify if a user has a specific permission.

  @param permission - Permission required (e.g. 'VIEW_USER').
  @returns boolean - True if the user has the permission, false otherwise.
*/
export default function useHasPermission(permission: string) {
  const profiles = useSelector((state: IRootState) => state.profileSlice);
  const { isAuthenticated, profile } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  if (!isAuthenticated || !profile) {
    return false;
  }

  useEffect(() => {
    if (!profiles || profiles.length === 0) {
      dispatch(loadProfiles());
    }
  }, [dispatch]);
  console.log('all profiles: ', profiles);
  console.log('current profile: ', profile);
  const userProfile = profiles.find(
    (p) => p.name.toLowerCase() === profile.toLowerCase(),
  );

  if (!userProfile) {
    return false;
  }

  return userProfile.permissions.includes(permission);
}
