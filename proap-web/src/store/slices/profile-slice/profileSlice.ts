import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchProfileByName,
  fetchProfiles,
  Profile,
} from '../../../services/profileService';
import { saveState } from '../..';

export const loadProfile = createAsyncThunk(
  'profiles/fetchByName',
  async (name: string) => {
    const profiles = await fetchProfileByName(name);
    if (profiles.status === 'error') console.error('Error loading profiles');
    return profiles;
  },
);

const profileSlice = createSlice({
  name: 'profiles',
  initialState: [] as Profile[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadProfile.fulfilled, (state, action) => {
      state = action.payload.data;
      saveState({ profileSlice: state });
    });
  },
});

export default profileSlice;
