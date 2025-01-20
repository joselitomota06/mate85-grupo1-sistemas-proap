import styled from '@emotion/styled';
import {
  Button,
  CircularProgress,
  FormLabel,
  IconButton,
  TextField,
} from '@mui/material';
import { Field } from 'formik';

export const RegisterButton = styled(Button)`
  width: 100%;
`;

export const RegisterCircularProgress = styled(CircularProgress)`
  margin-right: 4px;
`;

export const StyledTextField = styled(TextField)`
  max-width: 800px;

  div {
    padding: 0 !important;
  }

  label {
    max-width: none;
  }
`;

export const StyledDataInput = styled(Button)`
  max-width: 300px;
  text-transform: none;
  font-weight: bold;
  color: darkblue;
  background-color: lightblue;
  border-radius: 5px;
  font-size: 0.9rem;
  box-shadow: none;
  &:hover {
    background-color: lightblue;
  }
`;

export const StyledFormLabel = styled(FormLabel)`
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
`;

export const StyledIconButton = styled(IconButton)`
  color: #184a7f;
`;
