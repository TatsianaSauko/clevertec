import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';
import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';

import achievementReducer from './slices/achievements-slice';
import authReducer from './slices/auth-slice';
import feedbackReducer from './slices/feedback-slice';
import jointTriningReducer from './slices/joint-training';
import tariffReducer from './slices/tariff-slice';
import trainingReducer from './slices/training-slice';
import userReducer from './slices/user-slice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

const rootReducer = combineReducers({
    auth: authReducer,
    feedback: feedbackReducer,
    training: trainingReducer,
    user: userReducer,
    router: routerReducer,
    tariff: tariffReducer,
    jointTraining: jointTriningReducer,
    achievement: achievementReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
