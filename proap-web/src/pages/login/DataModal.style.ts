import styled from "@emotion/styled";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

export const CloseIconModal = styled(Grid)`
  display: flex;
  justify-content: flex-end;
`;

export const DataModal = styled(Modal)``;

export const BoxModal = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  background-color: #fff;
  padding: 1.5rem 8rem;
  border-radius: 5px;
  box-shadow: 5px 7px 9px -8px #194d33;

  .title {
    color: #000;
    font-size: 0.9rem;
  }
  .sub {
    color: #6c6f74;
    font-size: 0.8rem;
  }
`;

export const GridButtonsModal = styled(Grid)`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

export const ModalDates = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;
