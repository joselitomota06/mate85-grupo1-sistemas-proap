import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { listUsers, User } from '../../services/authService';

const PAGE_SIZE = 10;

export default function useUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(0);

  const handlePageChange = useCallback((e: any, newPage: number) => {
    setPage(newPage);
  }, []);

  const updateUsers = useCallback(() => {
    setIsLoading(true);
    listUsers()
      .then(({ data }) => {
        setUsers(data);
        setPage(0);
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
          index >= PAGE_SIZE * page && index < PAGE_SIZE * (page + 1)
      ),
    [users, page]
  );

  return {
    users: paginatedUsers,
    page,
    totalUsers: users.length,
    isLoading,
    PAGE_SIZE,
    handlePageChange,
    updateUsers,
  };
}
