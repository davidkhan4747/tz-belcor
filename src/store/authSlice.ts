import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, AUTH_CREDENTIALS } from '../types';

interface AuthState {
  user: User;
  error: string | null;
}

const initialState: AuthState = {
  user: {
    username: '',
    isAuthenticated: false,
  },
  error: null,
};

interface LoginPayload {
  username: string;
  password: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginPayload>) => {
      const { username, password } = action.payload;
      
      if (username === AUTH_CREDENTIALS.username && password === AUTH_CREDENTIALS.password) {
        state.user = {
          username,
          isAuthenticated: true,
        };
        state.error = null;
      } else {
        state.error = 'Неверное имя пользователя или пароль';
      }
    },
    logout: (state) => {
      state.user = {
        username: '',
        isAuthenticated: false,
      };
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
