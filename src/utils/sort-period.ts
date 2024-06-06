import { ActivityData } from '../types/types';

export const sortPeriod = (originalData: ActivityData[]) => {
    const sortedData = originalData.sort((a, b) => {
        const periodA = a.parameters?.period ?? 8;
        const periodB = b.parameters?.period ?? 8;

        if (periodA === null) return -1;
        if (periodB === null) return 1;
        if (periodA === 7) return 1;
        if (periodB === 7) return -1;

        return periodA - periodB;
    });

    return sortedData;
};
