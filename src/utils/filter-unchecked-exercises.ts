import { ActivityData } from '../types/types';

export function filterUncheckedExercises(training: ActivityData) {
    const filteredExercises = training.exercises.filter((exercise) => !exercise.checked);

    return { ...training, exercises: filteredExercises };
}
