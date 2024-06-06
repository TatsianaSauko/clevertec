import { ActivityData } from '../types/types';

import { sortPeriod } from './sort-period';

export const transformedData = (originalData: ActivityData[]) => {
    const mappedData = originalData.map(
        ({ _id, name, date, exercises, isImplementation, parameters }) => ({
            _id,
            name,
            date,
            isImplementation,
            exercises: exercises.map(
                ({
                    _id: innerId,
                    name: exerciseName,
                    replays,
                    weight,
                    approaches,
                    isImplementation: exerciseIsImplementation,
                }) => ({
                    _id: innerId,
                    name: exerciseName,
                    replays,
                    weight,
                    approaches,
                    isImplementation: exerciseIsImplementation,
                }),
            ),
            parameters: {
                period: parameters?.period,
                jointTraining: parameters?.jointTraining,
                repeat: parameters?.repeat,
            },
        }),
    );

    const sortedData = sortPeriod(mappedData);

    return sortedData;
};
