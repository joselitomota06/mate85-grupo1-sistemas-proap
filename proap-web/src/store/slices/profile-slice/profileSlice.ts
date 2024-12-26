import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProfiles, Profile } from '../../../services/profileService';
import { saveState } from '../..';

export const loadProfiles = createAsyncThunk('profile/list', async () => {
  const profiles = await fetchProfiles();
  if (profiles.status === 'error') console.error('Error loading profiles');
  return profiles;
});

const profileSlice = createSlice({
  name: 'profiles',
  initialState: [] as Profile[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadProfiles.fulfilled, (state, action) => {
      state = action.payload.data;
      saveState({ profileSlice: state });
    });
  },
});

export default profileSlice;
