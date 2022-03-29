import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/allAuth/authSliceUser';

export const store = configureStore({
  reducer: {
     auth : authReducer
  },
});
