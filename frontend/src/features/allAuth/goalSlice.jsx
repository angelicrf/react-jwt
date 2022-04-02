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
  (_, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.tooken;
      const thisDlId = goalService.thisDeleteId[0] ;
      console.log("thisDlId " + JSON.stringify(thisDlId))
      return goalService.deleteGoal(thisDlId,token);
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
        goalState.goals.push(action.payload);
        //goalState.goalSuccess = true;
        goalState.goalLoading = false;      
      })
      .addCase(assignGoal.rejected, (goalState, action) => {
        //goalState.goalSuccess = false;
        goalState.goalLoading = false;
        goalState.goalError = true;
        goalState.msg = action.payload;
      }) //get Goals
      .addCase(getAllGoals.pending, (goalState) => {
        goalState.goalLoading = true;
      })
      .addCase(getAllGoals.fulfilled, (goalState, action) => {      
        goalState.goalLoading = false;
        goalState.goalSuccess = true;
        goalState.goals = action.payload;
      })
      .addCase(getAllGoals.rejected, (goalState, action) => {
        goalState.goalSuccess = false;
        goalState.goalLoading = false;
        goalState.goalError = true;
        goalState.msg = action.payload;
        goalState.goals = [];
      })//delete
      .addCase(deleteGoals.pending, (goalState) => {
        goalState.goalLoading = true;
      })
      .addCase(deleteGoals.fulfilled, (goalState, action) => { 
        goalState.goals.filter((data) => data.id !== action.payload.originalId._id);
        goalState.goalLoading = false;
        //goalState.goalSuccess = true;
        goalService.thisDeleteId = []  
      })
      .addCase(deleteGoals.rejected, (goalState, action) => {
        //goalState.goalSuccess = false;
        goalState.goalLoading = false;
        goalState.goalError = true;
        goalState.msg = action.payload;
        goalState.goals = [];
      });
  },
});
export const { reset } = goalSliceFunc.actions;
export default goalSliceFunc.reducer;
