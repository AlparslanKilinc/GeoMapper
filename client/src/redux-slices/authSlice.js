import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../auth-request-api/index";

const initialState = {
  user: null,
  loggedIn: false,
  message: "",
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({userName, firstName, lastName, email, password, passwordVerify}) => {
    const response = await api.registerUser(userName, firstName, lastName, email, password, passwordVerify);
    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({userName, password}) => {
    const response = await api.loginUser(userName, password);
    return response.data;
  }
);

export const getLoggedIn = createAsyncThunk(
  "auth/getLoggedIn",
  async () => {
    const response = await api.getLoggedIn();
    return response.data;
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async () => {
    const response = await api.logoutUser();
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loggedIn = action.payload.loggedIn;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.loggedIn = action.payload.loggedIn;
      })
      .addCase(getLoggedIn.fulfilled, (state, action) => {
        state.loggedIn = action.payload.loggedIn;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loggedIn = false;
        state.user = null;
      })
      .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
        state.message = action.payload ? action.payload.errorMessage : "An error occurred";
      });
  }
});

export default authSlice.reducer;