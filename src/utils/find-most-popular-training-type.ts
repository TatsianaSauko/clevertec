import { ActivityData, Exercise, TrainingList } from '../types/types';

export const findMostPopularTrainingType = (
    activitiesData: ActivityData[],
    trainingList: TrainingList,
) => {
    const calculateLoad = (exercises: Exercise[]) =>
        exercises.reduce(
            (total, exercise) =>
                total +
                (exercise.replays || 0) * (exercise.weight || 0) * (exercise.approaches || 0),
            0,
        );

    const trainingNameToKey = trainingList.reduce((acc: { [key: string]: string }, training) => {
        acc[training.name] = training.key;

        return acc;
    }, {} as { [key: string]: string });

    const loadByTrainingType = activitiesData.reduce((acc: { [key: string]: number }, activity) => {
        const load = calculateLoad(activity.exercises);

        if (acc[activity.name]) {
            acc[activity.name] += load;
        } else {
            acc[activity.name] = load;
        }

        return acc;
    }, {} as { [key: string]: number });

    let maxLoad = 0;
    let mostPopularTrainingType = '';

    Object.entries(loadByTrainingType).forEach(([trainingType, load]) => {
        if (load > maxLoad) {
            maxLoad = load;
            mostPopularTrainingType = trainingType;
        }
    });

    return trainingNameToKey[mostPopularTrainingType];
};
