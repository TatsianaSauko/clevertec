import { RootState } from '@redux/configure-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    EmailPayload,
    InitialState,
    LoadingPayload,
    LoginSuccessPayload,
    PasswordPayload,
} from '../../types/types';

const TOKEN = 'token';

const initialState: InitialState = {
    email: '',
    password: '',
    token: localStorage.getItem(TOKEN) ?? '',
    remember: false,
    loading: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authFetching(state, action: PayloadAction<LoadingPayload>) {
            state.loading = action.payload.loading;
        },
        logout(state) {
            state.token = '';
            localStorage.removeItem(TOKEN);
        },
        loginSuccess(state, action: PayloadAction<LoginSuccessPayload>) {
            state.token = action.payload.token;
            state.remember = action.payload.remember;
            if (state.remember) {
                localStorage.setItem(TOKEN, action.payload.token);
            }
        },
        setEmail(state, action: PayloadAction<EmailPayload>) {
            state.email = action.payload.email;
        },
        setPassword(state, action: PayloadAction<PasswordPayload>) {
            state.password = action.payload.password;
        },
    },
});

export const { logout, loginSuccess, setEmail, setPassword, authFetching } = authSlice.actions;

export const authSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
