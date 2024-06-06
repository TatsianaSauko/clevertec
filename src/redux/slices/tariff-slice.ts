import { RootState } from '@redux/configure-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TariffList } from '../../types/types';

type InitialState = {
    tariffList: TariffList;
};

const initialState: InitialState = {
    tariffList: {
        _id: '',
        name: '',
        periods: [
            {
                text: '',
                cost: 0,
                days: 0,
            },
        ],
    },
};

export const tariffSlice = createSlice({
    name: 'tariff',
    initialState,
    reducers: {
        setTariffList(state, action: PayloadAction<{ tariffList: TariffList }>) {
            state.tariffList = action.payload.tariffList;
        },
    },
});

export const { setTariffList } = tariffSlice.actions;

export const tariffSelector = (state: RootState) => state.tariff;

export default tariffSlice.reducer;
