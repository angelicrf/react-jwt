import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  haveError: false,
  haveSuccess: false,
  haveLoading: false,
  msg: "",
};
export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkApi) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        error.response & error.response.data & error.data.message ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const authSliceFunc = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    reset: (thisState) => {
      thisState.haveError = false;
      thisState.haveSuccess = false;
      thisState.haveLoading = false;
      thisState.msg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (thisState) => {
        thisState.haveLoading = true;
      })
      .addCase(registerUser.fulfilled, (thisState, action) => {
        thisState.haveSuccess = true;
        thisState.haveLoading = false;
        thisState.user = action.payload;
      })
      .addCase(registerUser.rejected, (thisState, action) => {
        thisState.haveSuccess = false;
        thisState.haveLoading = false;
        thisState.haveError = true;
        thisState.msg = action.payload;
        thisState.user = null;
      });
  },
});
export const { reset } = authSliceFunc.actions;
export default authSliceFunc.reducer;
