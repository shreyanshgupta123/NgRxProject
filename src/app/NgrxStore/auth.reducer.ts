// src/store/auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure } from './auth.actions';

export interface AuthState {
  user: any;
  error: string | null;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  loading: false
};

const _authReducer = createReducer(
  initialState,
  on(login, (state, { username, password }) => {
    if (username === 'aman' && password === 'aman') {
      return { ...state, loading: false, user: { username }, error: null };
    } else {
      return { ...state, loading: false, error: 'Invalid credentials' };
    }
  }),
  on(loginSuccess, (state, { message }) => {
    console.log(message);
    return { ...state, loading: false, error: null };
  }),
  on(loginFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
