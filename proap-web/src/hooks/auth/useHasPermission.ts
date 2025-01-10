import useAuth from './useAuth';

/* 
  Hook to verify if a user has a specific permission.

  @param permission - Permission required (e.g. 'VIEW_USER').
  @returns boolean - True if the user has the permission, false otherwise.
*/
export default function useHasPermission(permission: string) {
  const { isAuthenticated, profile, permissions } = useAuth();

  if (!isAuthenticated || !profile) {
    return false;
  }

  return permissions.includes(permission);
}
