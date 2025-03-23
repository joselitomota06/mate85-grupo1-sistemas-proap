import { ASSISTANCE_REQUEST_INITIAL_STATE } from './assistance-request-slice/assistanceRequestSlice';
import { AUTH_INITIAL_STATE } from './auth-slice/authSlice';
import { SYSTEM_CONFIG_INITIAL_STATE } from './system-config-slice/systemConfigSlice';
import { USER_PROFILE_INITIAL_STATE } from './user-profile-slice/userProfileSlice';

export const SLICES_INITIAL_STATE = {
  auth: AUTH_INITIAL_STATE,
  assistanceRequestSlice: ASSISTANCE_REQUEST_INITIAL_STATE,
  userProfileSlice: USER_PROFILE_INITIAL_STATE,
  systemConfigSlice: SYSTEM_CONFIG_INITIAL_STATE,
};
