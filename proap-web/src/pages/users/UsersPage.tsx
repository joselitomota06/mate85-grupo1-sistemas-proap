import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { maskCpf, maskPhone } from "../../helpers/masks";
import useUsers from "../../hooks/auth/useUsers";

export default function UsersPage() {
  const { users, page, totalUsers, PAGE_SIZE, handlePageChange } = useUsers();

  return (
    <>
      <Typography
        variant="h4"
        color="primary"
        fontWeight="bold"
        paddingBottom={2}
        marginTop={2}
      >
        Usuários cadastrados
      </Typography>
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">E-mail</TableCell>
              <TableCell align="right">CPF</TableCell>
              <TableCell align="right">Telefone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(({ name, cpf, email, phone }) => (
              <TableRow
                key={cpf}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell align="right">{email}</TableCell>
                <TableCell align="right">{maskCpf(cpf)}</TableCell>
                <TableCell align="right">{maskPhone(phone)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TablePagination
            count={totalUsers}
            page={page}
            rowsPerPage={PAGE_SIZE}
            rowsPerPageOptions={[PAGE_SIZE]}
            onPageChange={handlePageChange}
            labelRowsPerPage=""
          />
        </Table>
      </TableContainer>
    </>
  );
}
