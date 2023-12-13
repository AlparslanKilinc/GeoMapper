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

export const updateUserData = createAsyncThunk(
  'auth/updateUserData',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.updateUserData(formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.forgotPassword({ email });
      return response.data;
    } catch (error) {
      console.log(error);
      throw rejectWithValue(error.response.data);
    }
  }
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ newPassword, id }) => {
    const response = await api.changePassword(newPassword, id);
    return response.data;
  }
);

export const updatePassword = createAsyncThunk(
  'auth/updatePassword',
  async ({ id, token, newPassword, confirmNewPassword }) => {
    try {
      console.log(id + ' ' + newPassword + ' ' + token + ' ' + confirmNewPassword);
      const response = await api.updatePassword({ id, token, newPassword, confirmNewPassword });

      if (response.status === 200) {
        return { success: true };
      } else {
        const errorData = response.data;
        return { success: false, error: errorData.errorMessage };
      }
    } catch (error) {
      console.error('An error occurred:', error);
      return { success: false, error: 'Internal Server Error' };
    }
  }
);

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async ({ idToken }, { rejectWithValue }) => {
    try {
      const response = await api.googleLogin({ idToken });
      return response.data;
    } catch (error) {
      console.error('Google login failed:', error);
      if (error.response.status === 500) {
        console.log('Internal Server Error');
      }
      return rejectWithValue(error.response.data);
    }
  }
);

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
      .addCase(googleLogin.fulfilled, (state, action) => {
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
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loggedIn = action.payload.loggedIn;
        state.isLoading = false;
      })
      .addCase(updateUserData.pending, (state) => {
        state.isLoading = true;
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
