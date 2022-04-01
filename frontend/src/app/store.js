import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/allAuth/authSliceUser'
import goalReducer from '../features/allAuth/goalSlice'

export const store = configureStore({
  reducer: {
     auth : authReducer,
     goals : goalReducer,
  },
});
