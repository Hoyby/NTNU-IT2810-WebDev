import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from '@reduxjs/toolkit';
import AuthService from "../services/auth.service";

export interface AuthState {
  token?: string,
  userName?: string | null;
  password?: string | null;
  email?: string | null;
  authenticated?: boolean;
  error?: SerializedError;
}

const initialState: AuthState = {
  token: undefined,
  userName: undefined,
  email: undefined,
  authenticated: undefined,
  error: undefined,
};

interface PayLoad {
  userName?: string | null;
  email?: string | null;
}

export const register = createAsyncThunk(
  "register",
  async ({ userName, email, password }:AuthState, thunkAPI) => {
    try {
      const response = await AuthService.register(userName, email, password);
      return response as PayLoad
      // return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);


export const login = createAsyncThunk<AuthState, PayLoad>(
  'login',
  async ({ email, password }:AuthState, thunkAPI) => {
    try {
      const response = await AuthService.login(email, password);
      return response as PayLoad
        // const displayName = response.user?.displayName;
        // const email = response.user?.email;
        // return { userName: displayName, email } as PayLoad;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const logout = createAsyncThunk(
  'logout', 
  async (_, thunkAPI) => {
  try {
    await AuthService.logout();
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.authenticated = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.authenticated = false;
      state.error = action.error;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.authenticated = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(logout.fulfilled, state => {
      state.authenticated = false;
      state.userName = initialState.userName;
      state.email = initialState.email;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.error;
    });
  },
});