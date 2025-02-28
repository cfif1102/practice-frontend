import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authMe, signIn, signOut, signUp } from '@thunks';

import { Employee, Thunk, ThunkInit } from '@@types';

interface AuthState {
  login: string;
  password: string;
  name: string;
  surname: string;
  middlename: string;
  user: Employee | null;
  authMeThunk: Thunk;
  signInThunk: Thunk;
  signUpThunk: Thunk;
  signOutThunk: Thunk;
}

const authState: AuthState = {
  login: '',
  password: '',
  name: '',
  surname: '',
  middlename: '',
  user: null,
  authMeThunk: ThunkInit(),
  signInThunk: ThunkInit(),
  signUpThunk: ThunkInit(),
  signOutThunk: ThunkInit(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    setLogin(state, action: PayloadAction<string>) {
      state.login = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setSurname(state, action: PayloadAction<string>) {
      state.surname = action.payload;
    },
    setMiddlename(state, action: PayloadAction<string>) {
      state.middlename = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.signInThunk.status = 'pending';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.signInThunk.status = 'succeeded';

        const result = action.payload;

        state.user = result;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.signInThunk.status = 'rejected';
        state.signInThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(signUp.pending, (state) => {
        state.signUpThunk.status = 'pending';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.signUpThunk.status = 'succeeded';

        const result = action.payload;

        state.user = result;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUpThunk.status = 'rejected';
        state.signUpThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(authMe.pending, (state) => {
        state.authMeThunk.status = 'pending';
      })
      .addCase(authMe.fulfilled, (state, action) => {
        state.authMeThunk.status = 'succeeded';

        const result = action.payload;

        state.user = result;
      })
      .addCase(authMe.rejected, (state, action) => {
        state.authMeThunk.status = 'rejected';
        state.authMeThunk.error = action.error.message ?? 'Unknown Error';
      })

      .addCase(signOut.pending, (state) => {
        state.signOutThunk.status = 'pending';
      })
      .addCase(signOut.fulfilled, (state, action) => {
        state.signOutThunk.status = 'succeeded';

        state.user = null;
      })
      .addCase(signOut.rejected, (state, action) => {
        state.signOutThunk.status = 'rejected';
        state.signOutThunk.error = action.error.message ?? 'Unknown Error';
      });
  },
});

export const { setLogin, setPassword, setName, setSurname, setMiddlename } = authSlice.actions;
