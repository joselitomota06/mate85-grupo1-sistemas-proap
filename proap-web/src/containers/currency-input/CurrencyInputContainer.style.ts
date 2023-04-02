import styled from '@emotion/styled';
import { TextField } from '@mui/material';

const StyledTextField = styled(TextField)`
  max-width: 800px;

  div {
    padding: 0 !important;
  }

  label {
    max-width: none;
  }
`;

export { StyledTextField };
