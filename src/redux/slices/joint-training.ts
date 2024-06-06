import { RootState } from '@redux/configure-store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Invite, TrainingPals, UserTrainingList } from '../../types/types';

type InitialState = {
    trainingPals: TrainingPals[];
    userJointTrainingList: UserTrainingList[];
    userJointTrainingListWitchTrainingType: UserTrainingList[];
    isUserList: boolean;
    inviteList: Invite[];
    isTrainingPartnerFinderComponent: boolean;
};

const initialState: InitialState = {
    trainingPals: [],
    userJointTrainingList: [],
    userJointTrainingListWitchTrainingType: [],
    isUserList: false,
    inviteList: [],
    isTrainingPartnerFinderComponent: true,
};

export const jointTrainingSlice = createSlice({
    name: 'jointTraining',
    initialState,
    reducers: {
        setTrainingPals(state, action: PayloadAction<{ trainingPals: TrainingPals[] }>) {
            state.trainingPals = action.payload.trainingPals;
        },
        setUserJointTrainingList(
            state,
            action: PayloadAction<{ userJointTrainingList: UserTrainingList[] }>,
        ) {
            state.userJointTrainingList = action.payload.userJointTrainingList;
        },
        setUserJointTrainingListWitchTrainingType(
            state,
            action: PayloadAction<{ userJointTrainingListWitchTrainingType: UserTrainingList[] }>,
        ) {
            state.userJointTrainingListWitchTrainingType =
                action.payload.userJointTrainingListWitchTrainingType;
        },
        setIsUserList(state, action: PayloadAction<{ isUserList: boolean }>) {
            state.isUserList = action.payload.isUserList;
        },

        setInviteList(state, action: PayloadAction<{ inviteList: Invite[] }>) {
            state.inviteList = action.payload.inviteList;
        },
        setIsTrainingPartnerFinderComponent(
            state,
            action: PayloadAction<{ isTrainingPartnerFinderComponent: boolean }>,
        ) {
            state.isTrainingPartnerFinderComponent =
                action.payload.isTrainingPartnerFinderComponent;
        },
        setUserJointTrainingListStatus(
            state,
            action: PayloadAction<{ userId: string; status: string }>,
        ) {
            const { userId, status } = action.payload;
            const userTraining = state.userJointTrainingList.find((user) => user.id === userId);

            if (userTraining) {
                userTraining.status = status;
            }
        },
        setUserJointTrainingListWitchTrainingTypeStatus(
            state,
            action: PayloadAction<{ userId: string; status: string }>,
        ) {
            const { userId, status } = action.payload;
            const userTraining = state.userJointTrainingListWitchTrainingType.find(
                (user) => user.id === userId,
            );

            if (userTraining) {
                userTraining.status = status;
            }
        },
        removeInvite(state, action: PayloadAction<{ inviteId: string }>) {
            const { inviteId } = action.payload;

            state.inviteList = state.inviteList.filter((invite) => invite._id !== inviteId);
        },
        removeTrainingPal(state, action: PayloadAction<{ palId: string }>) {
            const { palId } = action.payload;

            state.trainingPals = state.trainingPals.filter((pal) => pal.id !== palId);
        },
    },
});

export const {
    setTrainingPals,
    setUserJointTrainingList,
    setIsUserList,
    setInviteList,
    setUserJointTrainingListWitchTrainingType,
    setIsTrainingPartnerFinderComponent,
    setUserJointTrainingListStatus,
    setUserJointTrainingListWitchTrainingTypeStatus,
    removeInvite,
    removeTrainingPal,
} = jointTrainingSlice.actions;

export const jointTrainingSelector = (state: RootState): InitialState => state.jointTraining;

export default jointTrainingSlice.reducer;
