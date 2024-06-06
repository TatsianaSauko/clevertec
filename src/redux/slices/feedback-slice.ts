import { RootState } from '@redux/configure-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Feedback, UserFeedback } from '../../types/types';

type InitialState = {
    feedbacks: Feedback[];
    userFeedback: UserFeedback;
};

const initialState: InitialState = {
    feedbacks: [],
    userFeedback: { message: '', rating: 0 },
};

export const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        setFeedback(state, action: PayloadAction<{ feedbacks: Feedback[] }>) {
            state.feedbacks = action.payload.feedbacks;
        },
        setUserFeedback(state, action: PayloadAction<UserFeedback>) {
            state.userFeedback.message = action.payload.message;
            state.userFeedback.rating = action.payload.rating;
        },
    },
});

export const { setFeedback, setUserFeedback } = feedbackSlice.actions;

export const feedbackSelector = (state: RootState) => state.feedback;

export default feedbackSlice.reducer;
