import { ActivityData } from '../types/types';

import { getDataForDate } from './get-data-for-date';

export const containsElement = (
    activitiesData: ActivityData[],
    date: string | number,
    name: string,
) => {
    const dataForDate = getDataForDate(activitiesData, date);
    const itemWithName = dataForDate.find((item) => item.name === name);

    return itemWithName;
};
