import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AssistanceRequestListResponse,
  ExtraRequestListResponse,
} from '../../../types';

interface AssistanceRequestSliceState {
  requests: AssistanceRequestListResponse;
  extraRequests: ExtraRequestListResponse;
}

const INITIAL_STATE: AssistanceRequestSliceState = {
  requests: {
    list: [],
    total: 0,
  },
  extraRequests: {
    list: [],
    total: 0,
  },
};

const assistanceRequestSlice = createSlice({
  name: 'solicitation',
  initialState: INITIAL_STATE,
  reducers: {
    updateSolicitations: (
      state,
      action: PayloadAction<AssistanceRequestListResponse>,
    ) => {
      state.requests = action.payload;
    },
    updateExtraSolicitations: (
      state,
      action: PayloadAction<ExtraRequestListResponse>,
    ) => {
      state.extraRequests = action.payload;
    },
  },
});

export const { updateSolicitations, updateExtraSolicitations } =
  assistanceRequestSlice.actions;
export default assistanceRequestSlice;
export { INITIAL_STATE as ASSISTANCE_REQUEST_INITIAL_STATE };
