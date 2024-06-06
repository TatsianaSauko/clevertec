import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';
import { Path } from '@constants/paths';
import { AchievementsPage } from '@pages/achievements-page';
import { CalendarPage } from '@pages/calendar-page';
import { FeedbacksPage } from '@pages/feedbacks-page';
import { NotFoundPage } from '@pages/not-found-page';
import { ProfilePage } from '@pages/profile-page';
import { SettingsPage } from '@pages/settings-page';
import { history, store } from '@redux/configure-store';

import { AuthenticationLayout } from './layouts/authentication-layout';
import { ErrorLayout } from './layouts/error-layout';
import { RootLayout } from './layouts/root-layout';
import {
    ChangePasswordPage,
    ConfirmEmailPage,
    ErrorChangePasswordPage,
    ErrorCheckEmailNoExistPage,
    ErrorCheckEmailPage,
    ErrorLoginPage,
    ErrorPage,
    ErrorUserExistPage,
    LoginPage,
    MainPage,
    RegisterPage,
    SuccessChangePasswordPage,
    SuccessPage,
    TrainingPage,
} from './pages';

import 'antd/dist/antd.css';
import 'normalize.css';
import './index.css';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history}>
                <Routes>
                    <Route path={Path.Root} element={<RootLayout />}>
                        <Route
                            path={Path.Root}
                            element={<Navigate to={Path.Main} replace={true} />}
                        />
                        <Route path={Path.Main} element={<MainPage />} />
                        <Route path={Path.Feedbacks} element={<FeedbacksPage />} />
                        <Route path={Path.Calendar} element={<CalendarPage />} />
                        <Route path={Path.Profile} element={<ProfilePage />} />
                        <Route path={Path.Settings} element={<SettingsPage />} />
                        <Route path={Path.Training} element={<TrainingPage />} />
                        <Route path={Path.Achievements} element={<AchievementsPage />} />
                    </Route>

                    <Route path={Path.Auth} element={<AuthenticationLayout />}>
                        <Route index={true} element={<LoginPage />} />
                        <Route path={Path.Registration} element={<RegisterPage />} />
                    </Route>
                    <Route path={Path.Result} element={<ErrorLayout />}>
                        <Route path={Path.ErrorLogin} element={<ErrorLoginPage />} />
                        <Route path={Path.Success} element={<SuccessPage />} />
                        <Route path={Path.ErrorUserExist} element={<ErrorUserExistPage />} />
                        <Route path={Path.Error} element={<ErrorPage />} />
                        <Route
                            path={Path.ErrorCheckEmailNoExist}
                            element={<ErrorCheckEmailNoExistPage />}
                        />
                        <Route path={Path.ErrorCheckEmail} element={<ErrorCheckEmailPage />} />
                        <Route
                            path={Path.ErrorChangePassword}
                            element={<ErrorChangePasswordPage />}
                        />
                        <Route
                            path={Path.SuccessChangePassword}
                            element={<SuccessChangePasswordPage />}
                        />
                    </Route>
                    <Route path={Path.ConfirmEmail} element={<ConfirmEmailPage />} />
                    <Route path={Path.ChangePassword} element={<ChangePasswordPage />} />
                    <Route path='*' element={<NotFoundPage />} />
                </Routes>
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
);
