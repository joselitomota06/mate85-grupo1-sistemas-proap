import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProfiles, Profile } from '../../../services/profileService';

export const loadProfiles = createAsyncThunk('profile/list', async () => {
  const profiles = await fetchProfiles();
  return profiles;
});

const profileSlice = createSlice({
  name: 'profiles',
  initialState: {
    profiles: [] as Profile[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadProfiles.fulfilled, (state, action) => {
      state.profiles = action.payload.data;
    });
  },
});

export default profileSlice;
