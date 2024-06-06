import { BaseUrl, Endpoints } from '@constants/api';
import { Path } from '@constants/paths';
import { StatusCodes } from '@constants/status-codes';
import { sortUsers } from '@utils/sort-users';
import { transformedData } from '@utils/transformed-data';
import { RcFile } from 'antd/es/upload';
import axios from 'axios';

import {
    ActivityData,
    AxiosError,
    Feedback,
    FormFeedback,
    FormUser,
    IChangePassword,
    ICheckEmail,
    IConfirmEmail,
    IGetFeedback,
    ILogin,
    IRegister,
    PutInvite,
    TariffPayment,
    TrainingInvitation,
} from '../types/types';

import { authFetching, loginSuccess, logout } from './slices/auth-slice';
import { setFeedback } from './slices/feedback-slice';
import {
    setInviteList,
    setTrainingPals,
    setUserJointTrainingList,
    setUserJointTrainingListWitchTrainingType,
} from './slices/joint-training';
import { setTariffList } from './slices/tariff-slice';
import { setActivitiesData, setLoading, setTrainingList } from './slices/training-slice';
import { setUserData } from './slices/user-slice';
import { AppDispatch, history } from './configure-store';

export const register = (data: IRegister) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authFetching({ loading: true }));
        await axios.post(`${BaseUrl}${Endpoints.Registration}`, data, {
            withCredentials: true,
        });
        dispatch(authFetching({ loading: false }));
        history.push(Path.Success);
    } catch (error) {
        dispatch(authFetching({ loading: false }));
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === StatusCodes.CONFLICT) {
            history.push(Path.ErrorUserExist);
        } else {
            history.push(Path.Error);
        }
    }
};

export const getUserMe = (data: string) => async (dispatch: AppDispatch) => {
    try {
        const headers = {
            Authorization: `Bearer ${data}`,
            'Content-Type': 'application/json',
        };
        const response = await axios.get(`${BaseUrl}${Endpoints.UserMe}`, {
            headers,
        });

        dispatch(setUserData({ user: response.data }));
    } catch (err) {
        throw Error();
    }
};

export const login = (data: ILogin) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authFetching({ loading: true }));
        const response = await axios.post(
            `${BaseUrl}${Endpoints.Login}`,
            { email: data.email, password: data.password },
            { withCredentials: true },
        );

        dispatch(
            loginSuccess({
                remember: data.remember,
                token: response.data.accessToken,
            }),
        );

        history.push(Path.Main);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        dispatch(getUserMe(response.data.accessToken));

        dispatch(authFetching({ loading: false }));
    } catch {
        dispatch(authFetching({ loading: false }));
        history.push(Path.ErrorLogin);
    }
};

export const checkEmail = (dataForm: ICheckEmail) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authFetching({ loading: true }));
        await axios.post(
            `${BaseUrl}${Endpoints.CheckEmail}`,
            { email: dataForm.email },
            { withCredentials: true },
        );
        dispatch(authFetching({ loading: false }));
        history.push(Path.ConfirmEmail);
    } catch (error) {
        dispatch(authFetching({ loading: false }));
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            const { status, data } = axiosError.response;

            if (status === StatusCodes.NOT_FOUND && data && data.message === 'Email не найден') {
                history.push(Path.ErrorCheckEmailNoExist);
            } else {
                history.push(Path.ErrorCheckEmail);
            }
        }
    }
};

export const confirmEmail = (data: IConfirmEmail) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authFetching({ loading: true }));
        await axios.post(
            `${BaseUrl}${Endpoints.ConfirmEmail}`,
            { email: data.email, code: data.code },
            { withCredentials: true },
        );
        dispatch(authFetching({ loading: false }));
        history.push(Path.ChangePassword);
    } catch (error) {
        dispatch(authFetching({ loading: false }));
        throw Error();
    }
};

export const changePassword = (data: IChangePassword) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authFetching({ loading: true }));
        await axios.post(
            `${BaseUrl}${Endpoints.ChangePassword}`,
            { password: data.password, confirmPassword: data.confirmPassword },
            { withCredentials: true },
        );
        dispatch(authFetching({ loading: false }));
        history.push(Path.SuccessChangePassword);
    } catch (error) {
        dispatch(authFetching({ loading: false }));
        history.push(Path.ErrorChangePassword);
    }
};

export const getFeedback = (data: IGetFeedback) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authFetching({ loading: true }));
        const headers = {
            Authorization: `Bearer ${data.token}`,
            'Content-Type': 'application/json',
        };
        const response = await axios.get(`${BaseUrl}${Endpoints.Feedback}`, { headers });
        const feedbackSort = response.data.sort(
            (a: Feedback, b: Feedback) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );

        dispatch(setFeedback({ feedbacks: feedbackSort }));
        dispatch(authFetching({ loading: false }));
    } catch (error) {
        dispatch(authFetching({ loading: false }));
        const axiosError = error as AxiosError;

        if (axiosError.response) {
            const { status } = axiosError.response;

            if (status === StatusCodes.FORBIDDEN) {
                dispatch(logout());
                history.push(Path.Auth);
            } else {
                throw Error();
            }
        }
    }
};

export const feedback = (data: FormFeedback, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authFetching({ loading: true }));
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        await axios.post(
            `${BaseUrl}${Endpoints.Feedback}`,
            { message: data.message, rating: data.rating },
            { headers },
        );
        dispatch(authFetching({ loading: false }));
    } catch {
        dispatch(authFetching({ loading: false }));
        throw Error();
    }
};

export const getTrainingUser = (data: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authFetching({ loading: true }));
        const headers = {
            Authorization: `Bearer ${data}`,
            'Content-Type': 'application/json',
        };
        const response = await axios.get(`${BaseUrl}${Endpoints.Training}`, { headers });
        const transform = transformedData(response.data);
        // const sort = sortPeriod(transform)

        dispatch(setActivitiesData({ activitiesData: transform }));
        dispatch(authFetching({ loading: false }));
    } catch {
        dispatch(authFetching({ loading: false }));
        throw Error();
    }
};

export const getTrainingList = (data: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authFetching({ loading: true }));
        const headers = {
            Authorization: `Bearer ${data}`,
            'Content-Type': 'application/json',
        };
        const response = await axios.get(`${BaseUrl}${Endpoints.CatalogsTrainingList}`, {
            headers,
        });

        dispatch(setTrainingList({ trainingList: response.data }));
        dispatch(authFetching({ loading: false }));
    } catch {
        dispatch(authFetching({ loading: false }));
        throw Error();
    }
};

export const createTraining =
    (data: string, training: ActivityData) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading({ loadingTraining: true }));
            const headers = {
                Authorization: `Bearer ${data}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.post(`${BaseUrl}${Endpoints.Training}`, training, {
                headers,
            });

            dispatch(setLoading({ loadingTraining: false }));

            return response.data._id;
        } catch {
            dispatch(setLoading({ loadingTraining: false }));
            throw Error();
        }
    };

export const putTraining =
    (data: string, training: ActivityData, id: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(setLoading({ loadingTraining: true }));
            const headers = {
                Authorization: `Bearer ${data}`,
                'Content-Type': 'application/json',
            };

            await axios.put(`${BaseUrl}${Endpoints.Training}/${id}`, training, {
                headers,
            });
            dispatch(setLoading({ loadingTraining: false }));
        } catch {
            dispatch(setLoading({ loadingTraining: false }));
            throw Error();
        }
    };

export const uploadImg = async (file: string | RcFile | Blob, token: string) => {
    try {
        const formData = new FormData();

        formData.append('file', file);
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        };
        const response = await axios.post(`${BaseUrl}${Endpoints.UploadImage}`, formData, {
            headers,
        });

        return response;
    } catch (err) {
        throw Error();
    }
};

export const putUser = (data: FormUser, token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authFetching({ loading: true }));
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        await axios.put(`${BaseUrl}${Endpoints.User}`, data, {
            headers,
        });
        await dispatch(getUserMe(token));
        dispatch(authFetching({ loading: false }));
    } catch {
        dispatch(authFetching({ loading: false }));
        throw Error();
    }
};

export const getTariffList = (token: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authFetching({ loading: true }));
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
        const response = await axios.get(`${BaseUrl}${Endpoints.TariffList}`, {
            headers,
        });

        dispatch(setTariffList({ tariffList: response.data[0] }));
        dispatch(authFetching({ loading: false }));
    } catch (err) {
        dispatch(authFetching({ loading: false }));
    }
};

export const createTariff =
    (data: TariffPayment, token: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(authFetching({ loading: true }));
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            await axios.post(`${BaseUrl}${Endpoints.Tariff}`, data, { headers });
            dispatch(authFetching({ loading: false }));
        } catch (err) {
            dispatch(authFetching({ loading: false }));
        }
    };

export const getTrainingPals = (data: string) => async (dispatch: AppDispatch) => {
    try {
        const headers = {
            Authorization: `Bearer ${data}`,
            'Content-Type': 'application/json',
        };
        const response = await axios.get(`${BaseUrl}${Endpoints.TrainingPals}`, {
            headers,
        });

        dispatch(setTrainingPals({ trainingPals: response.data }));
    } catch {
        dispatch(setTrainingPals({ trainingPals: [] }));
    }
};

export const getUserJointTrainingList = (data: string) => async (dispatch: AppDispatch) => {
    try {
        const headers = {
            Authorization: `Bearer ${data}`,
            'Content-Type': 'application/json',
        };

        const response = await axios.get(`${BaseUrl}${Endpoints.UserJointTrainingList}`, {
            headers,
        });
        const sortResponse = sortUsers(response.data);

        dispatch(setUserJointTrainingList({ userJointTrainingList: sortResponse }));
        dispatch(
            setUserJointTrainingListWitchTrainingType({
                userJointTrainingListWitchTrainingType: [],
            }),
        );
    } catch {
        throw Error();
    }
};
export const getUserJointTrainingListByTrainingType =
    (data: string, trainingType: string) => async (dispatch: AppDispatch) => {
        try {
            const headers = {
                Authorization: `Bearer ${data}`,
                'Content-Type': 'application/json',
            };
            const params = { trainingType };
            const response = await axios.get(`${BaseUrl}${Endpoints.UserJointTrainingList}`, {
                headers,
                params,
            });
            const sortResponse = sortUsers(response.data);

            dispatch(setUserJointTrainingList({ userJointTrainingList: [] }));
            dispatch(
                setUserJointTrainingListWitchTrainingType({
                    userJointTrainingListWitchTrainingType: sortResponse,
                }),
            );
        } catch {
            throw Error();
        }
    };

export const getInvite = (data: string) => async (dispatch: AppDispatch) => {
    try {
        const headers = {
            Authorization: `Bearer ${data}`,
            'Content-Type': 'application/json',
        };

        const response = await axios.get(`${BaseUrl}${Endpoints.Invite}`, {
            headers,
        });

        dispatch(setInviteList({ inviteList: response.data }));
    } catch {
        dispatch(setInviteList({ inviteList: [] }));
    }
};

export const postInvite =
    (token: string, data: TrainingInvitation) => async (dispatch: AppDispatch) => {
        try {
            dispatch(authFetching({ loading: true }));
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };

            await axios.post(`${BaseUrl}${Endpoints.Invite}`, data, {
                headers,
            });

            dispatch(authFetching({ loading: false }));
        } catch {
            dispatch(authFetching({ loading: false }));
            throw Error();
        }
    };

export const putInvite = (token: string, data: PutInvite) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authFetching({ loading: true }));
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        await axios.put(`${BaseUrl}${Endpoints.Invite}`, data, {
            headers,
        });
        dispatch(authFetching({ loading: false }));
    } catch {
        dispatch(authFetching({ loading: false }));
        throw Error();
    }
};

export const deleteInvite = (token: string, inviteId: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(authFetching({ loading: true }));
        const headers = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        await axios.delete(`${BaseUrl}${Endpoints.Invite}/${inviteId}`, {
            headers,
        });
        dispatch(authFetching({ loading: false }));
    } catch {
        dispatch(authFetching({ loading: false }));
    }
};
