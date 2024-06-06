import { DATE_FORMAT } from '@constants/app-constants';
import moment from 'moment';

import { ActivityData } from '../types/types';

export function getDataForDate(activitiesData: ActivityData[], value: string | number) {
    return activitiesData.filter(
        (activity) =>
            moment(activity.date).format(DATE_FORMAT) === moment(value).format(DATE_FORMAT),
    );
}
