import { RootState } from '@redux/configure-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DataLoad } from '../../types/types';

type InitialState = {
    selectedTags: string;
    dataLoad: DataLoad[];
};

const initialState: InitialState = {
    selectedTags: 'Все',
    dataLoad: [],
};

export const achievementSlice = createSlice({
    name: 'achievement',
    initialState,
    reducers: {
        setSelectedTags(state, action: PayloadAction<string>) {
            state.selectedTags = action.payload;
        },
        setDataLoad(state, action: PayloadAction<DataLoad[]>) {
            state.dataLoad = action.payload;
        },
    },
});

export const { setSelectedTags, setDataLoad } = achievementSlice.actions;

export const achievementSelector = (state: RootState) => state.achievement;

export default achievementSlice.reducer;
