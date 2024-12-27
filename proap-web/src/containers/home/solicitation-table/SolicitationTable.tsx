import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
  getAssistanceRequests,
  removeAssistanceRequestById,
} from '../../../services/assistanceRequestService';
import { IRootState, useAppDispatch } from '../../../store';

import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Visibility from '@mui/icons-material/Visibility';
import { CheckCircle } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import { IconButton } from '@mui/material';
import { useAuth } from '../../../hooks';
import { toast, ToastOptions } from 'react-toastify';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

// Modal inports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {
  deleteExtraAssistanceRequest,
  getExtraAssistanceRequests,
} from '../../../services/extraAssistanceRequestService';
import assistanceRequestSlice, {
  AssistanceRequest,
} from '../../../store/slices/assistance-request-slice/assistanceRequestSlice';
import usePrevious from '../../../helpers/usePrevious';
import SolicitationTableRequests from './SolicitationTableRequests';
import SolicitationTableExtraRequests from './SolicitationTableExtraRequests';

export default function SolicitationTable() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [currentTab, setCurrentTab] = React.useState(0);

  return (
    <>
      <Tabs value={currentTab} onChange={(e, value) => setCurrentTab(value)}>
        <Tab label="Apoio a Publicação Científica" />
        <Tab label="Demanda Extra" />
      </Tabs>

      {currentTab == 0 && <SolicitationTableRequests />}
      {currentTab == 1 && <SolicitationTableExtraRequests />}
    </>
  );
}
