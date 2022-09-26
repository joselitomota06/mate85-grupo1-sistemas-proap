import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getAssistanceRequests } from '../../../services/assistanceRequestService'
import { IRootState, useAppDispatch } from '../../../store'

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Box } from '@mui/system'

export default function SolicitationTable() {
  const dispatch = useAppDispatch()

  const { requests } = useSelector(
    (state: IRootState) => state.assistanceRequestSlice
  )

  useEffect(() => {
    dispatch(getAssistanceRequests())
  }, [dispatch])

  return (
    <TableContainer sx={{ maxHeight: '500px' }}>
      <Table stickyHeader>
        <TableHead>
          <TableCell>Solicitante</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Valor aprovado (integral)</TableCell>
          <TableCell>Data de solicitação</TableCell>
          <TableCell />
        </TableHead>
        <TableBody>
          {requests.length === 0 && (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography align='center' color='gray'>
                  Nenhuma solicitação de auxílio encontrada
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {requests.length > 0 &&
            requests.map(({ id, doi }) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>
                  <Box>
                    <RemoveRedEyeIcon />
                    <ModeEditIcon />
                    <DeleteIcon />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
