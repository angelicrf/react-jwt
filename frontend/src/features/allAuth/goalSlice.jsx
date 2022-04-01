import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  goals: [],
  goalError: false,
  goalSuccess: false,
  goalLoading: false,
  msg: "",
};
export const assignGoal = createAsyncThunk(
  "goal/addGoal",
  async (data, thunkApi) => {
    try {
      const testToken = thunkApi.getState().auth.user;
      const token = thunkApi.getState().auth.user.tooken;
      return await goalService.newGoal(token,data);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const getAllGoals = createAsyncThunk(
  "goal/getGoals",
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.tooken;
      return await goalService.getGoals( token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const deleteGoals = createAsyncThunk(
  "goal/deleteGoal",
  (g_id, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.tooken;
      return goalService.deleteGoal(g_id,token);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.data.message) ||
        error.message ||
        error.toString();
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const goalSliceFunc = createSlice({
  name: "allGoals",
  initialState,
  reducers: {
    reset: (goalState) => {
      goalState.goals = [];
      goalState.goalError = false;
      goalState.goalLoading = false;
      goalState.goalSuccess = false;
      goalState.msg = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(assignGoal.pending, (goalState) => {
        goalState.goalLoading = true;
      })
      .addCase(assignGoal.fulfilled, (goalState, action) => {
        goalState.goalSuccess = true;
        goalState.goalLoading = false;
        goalState.goals.push(action.payload);
      })
      .addCase(assignGoal.rejected, (goalState, action) => {
        goalState.goalSuccess = false;
        goalState.goalLoading = false;
        goalState.goalError = true;
        goalState.msg = action.payload;
      }) //get Goals
      .addCase(getAllGoals.pending, (goalState) => {
        goalState.goalLoading = true;
      })
      .addCase(getAllGoals.fulfilled, (goalState, action) => {    
        goalState.goals.push(action.payload);
        goalState.goalLoading = false;
        goalState.goalSuccess = true;
      })
      .addCase(deleteGoals.rejected, (goalState, action) => {
        goalState.goalSuccess = false;
        goalState.goalLoading = false;
        goalState.goalError = true;
        goalState.msg = action.payload;
        goalState.goals.filter((data) => data.id !== action.payload.id);
      });
  },
});
export const { reset } = goalSliceFunc.actions;
export default goalSliceFunc.reducer;
