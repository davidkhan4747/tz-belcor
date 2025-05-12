import { configureStore } from '@reduxjs/toolkit';
import manipulatorReducer from './manipulatorSlice';
import authReducer from './authSlice';
import historyReducer from './historySlice';

export const store = configureStore({
  reducer: {
    manipulator: manipulatorReducer,
    auth: authReducer,
    history: historyReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
