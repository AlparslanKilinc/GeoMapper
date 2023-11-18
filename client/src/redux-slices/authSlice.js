import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../auth-request-api/index';

const initialState = {
  user: null,
  loggedIn: false,
  message: null,
  isLoading: false
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    { userName, firstName, lastName, email, password, passwordVerify },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.registerUser(
        userName,
        firstName,
        lastName,
        email,
        password,
        passwordVerify
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ userName, password }, { rejectWithValue }) => {
    try {
      const response = await api.loginUser(userName, password);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getLoggedIn = createAsyncThunk('auth/getLoggedIn', async () => {
  const response = await api.getLoggedIn();
  return response.data;
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async () => {
  const response = await api.logoutUser();
  return response.data;
});

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({ firstName, lastName, userName, bio, id }) => {
    const response = await api.updateUser(firstName, lastName, userName, bio, id);
    return response.data;
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ newPassword, id }) => {
    const response = await api.changePassword(newPassword, id);
    return response.data;
  }
);

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async ({ email, id }) => {
  const response = await api.forgotPassword(email, id);
  return response.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetErrorMessage: (state) => {
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loggedIn = action.payload.loggedIn;
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loggedIn = action.payload.loggedIn;
        state.isLoading = false;
      })
      .addCase(getLoggedIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loggedIn = action.payload.loggedIn;
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loggedIn = false;
        state.user = null;
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loggedIn = action.payload.loggedIn;
        state.isLoading = false;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.message = action.payload?.errorMessage || 'An error occurred';
          state.isLoading = false;
        }
      );
  }
});

export const { resetErrorMessage } = authSlice.actions;
export default authSlice.reducer;
