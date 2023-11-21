import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../interfaces/user.interface';

export type IUserRole = 'serviceProvider' | null;
export type IBoostType = 'BSP' | 'MBS' | 'BSL' | 'IW' | null;

interface IAuth {
  userRole: IUserRole;
  boostType: IBoostType;
  user: IUser | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: IAuth = {
  userRole: null,
  boostType: null,
  user: null,
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setuserRole: (state, action: PayloadAction<IUserRole>) => {
      state.userRole = action.payload;
    },
    setBoostType: (state, action: PayloadAction<IBoostType>) => {
      state.boostType = action.payload;
    },
    setAuthentication: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
  },
});

export const {
  setuserRole,
  setBoostType,
  setAuthentication,
  setAccessToken,
  setRefreshToken,
} = authSlice.actions;

export default authSlice.reducer;
