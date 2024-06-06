import { UserTrainingList } from '../types/types';

export const sortUsers = (userJointTrainingList: UserTrainingList[]) =>
    userJointTrainingList.sort((a, b) => {
        if (a.status === 'accepted' && b.status !== 'accepted') {
            return -1;
        }
        if (b.status === 'accepted' && a.status !== 'accepted') {
            return 1;
        }
        if (a.status === 'pending' && b.status === 'rejected') {
            return -1;
        }
        if (b.status === 'pending' && a.status === 'rejected') {
            return 1;
        }

        return a.name.localeCompare(b.name);
    });
