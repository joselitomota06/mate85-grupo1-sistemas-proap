import { useCallback, useEffect, useMemo, useState } from 'react';
import { listUsers } from '../../services/authService';
import { User } from '../../types/auth-type/user';

const PAGE_SIZE = 10;

export default function useUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState('');

  const handlePageChange = useCallback((e: any, newPage: number) => {
    setPage(newPage);
  }, []);

  const updateUsers = useCallback(() => {
    setIsLoading(true);
    listUsers()
      .then(({ status, data }) => {
        setUsers(data);
        setPage(0);
        setStatus(status);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    updateUsers();
  }, []);

  const paginatedUsers = useMemo(
    () =>
      users.filter(
        (_, index) =>
          index >= PAGE_SIZE * page && index < PAGE_SIZE * (page + 1),
      ),
    [users, page],
  );

  const data = {
    users: paginatedUsers,
    page,
    totalUsers: users.length,
    isLoading,
    PAGE_SIZE,
    handlePageChange,
    updateUsers,
  };

  return {
    status,
    ...data,
  };
}
