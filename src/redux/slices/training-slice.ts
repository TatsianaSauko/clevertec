import { RootState } from '@redux/configure-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ActivityData, Exercise, TrainingList } from '../../types/types';

type InitialState = {
    trainingList: TrainingList;
    activitiesData: ActivityData[];
    training: ActivityData;
    flag: boolean;
    loadingTraining: boolean;
    isModal: boolean;
    getTrainingListError: boolean;
};

const initialState: InitialState = {
    trainingList: [],
    activitiesData: [],
    training: {
        _id: crypto.randomUUID(),
        name: '',
        date: '',
        exercises: [
            {
                _id: crypto.randomUUID(),
                name: '',
                replays: undefined,
                weight: undefined,
                approaches: undefined,
                isImplementation: false,
                checked: false,
            },
        ],
        parameters: {
            period: null,
            jointTraining: false,
            repeat: false,
        },
    },
    flag: false,
    loadingTraining: false,
    isModal: false,
    getTrainingListError: false,
};

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        setTrainingList(state, action: PayloadAction<{ trainingList: TrainingList }>) {
            state.trainingList = action.payload.trainingList;
        },

        setLoading(state, action: PayloadAction<{ loadingTraining: boolean }>) {
            state.loadingTraining = action.payload.loadingTraining;
        },
        setRepeat(state, action: PayloadAction<{ repeat: boolean }>) {
            if (state.training.parameters) {
                state.training.parameters.repeat = action.payload.repeat;
            }
        },

        setActivitiesData(state, action: PayloadAction<{ activitiesData: ActivityData[] }>) {
            state.activitiesData = action.payload.activitiesData;
        },

        setNameTraining(state, action: PayloadAction<{ value: string }>) {
            state.training.name = action.payload.value;
        },

        setDateTraining(state, action: PayloadAction<{ date: string }>) {
            state.training.date = action.payload.date;
        },

        setTraining(state, action: PayloadAction<{ training: ActivityData }>) {
            state.training = action.payload.training;
        },

        setPeriod(state, action: PayloadAction<{ period: number }>) {
            if (state.training.parameters) {
                state.training.parameters.period = action.payload.period;
            }
        },

        setJointTraining(state, action: PayloadAction<{ jointTraining: boolean }>) {
            if (state.training.parameters) {
                state.training.parameters.jointTraining = action.payload.jointTraining;
            }
        },

        setFlag(state, action: PayloadAction<{ flag: boolean }>) {
            state.flag = action.payload.flag;
        },

        setIisModal(state, action: PayloadAction<{ isModal: boolean }>) {
            state.isModal = action.payload.isModal;
        },
        setGetTrainingListError(state, action: PayloadAction<{ getTrainingListError: boolean }>) {
            state.getTrainingListError = action.payload.getTrainingListError;
        },

        setTrainingFull(state) {
            state.training.exercises = [
                {
                    _id: crypto.randomUUID(),
                    name: '',
                    replays: undefined,
                    weight: undefined,
                    approaches: undefined,
                    isImplementation: false,
                },
            ];
        },

        setExercises(state, action: PayloadAction<{ exercise: Exercise; index: number }>) {
            const { exercise, index } = action.payload;
            const updatedExercises = [...state.training.exercises];

            updatedExercises[index] = exercise;
            state.training.exercises = updatedExercises;
        },

        cleanTraining(state) {
            state.training = {
                _id: crypto.randomUUID(),
                name: '',
                date: state.training.date,
                exercises: [
                    {
                        _id: crypto.randomUUID(),
                        name: '',
                        replays: undefined,
                        weight: undefined,
                        approaches: undefined,
                        isImplementation: false,
                        checked: false,
                    },
                ],
                parameters: {
                    period: null,
                    jointTraining: false,
                    repeat: false,
                },
            };
        },

        createExercise(state) {
            state.training.exercises.push({
                _id: crypto.randomUUID(),
                name: '',
                replays: undefined,
                weight: undefined,
                approaches: undefined,
                isImplementation: false,
            });
        },
    },
});

export const {
    setTrainingList,
    setActivitiesData,
    setTrainingFull,
    setLoading,
    setFlag,
    setNameTraining,
    setExercises,
    setTraining,
    cleanTraining,
    createExercise,
    setDateTraining,
    setIisModal,
    setGetTrainingListError,
    setPeriod,
    setJointTraining,
    setRepeat,
} = trainingSlice.actions;

export const trainingSelector = (state: RootState) => state.training;

export default trainingSlice.reducer;
