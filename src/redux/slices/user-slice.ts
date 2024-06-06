import { RootState } from '@redux/configure-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../types/types';

type InitialState = {
    user: User;
};

const initialState: InitialState = {
    user: {
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        birthday: '',
        imgSrc: '',
        readyForJointTraining: true,
        sendNotification: false,
        tariff: {
            tariffId: '',
            expired: '',
        },
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<{ user: User }>) {
            state.user = action.payload.user;
        },
    },
});

export const { setUserData } = userSlice.actions;

export const userSelector = (state: RootState) => state.user;

export default userSlice.reducer;
