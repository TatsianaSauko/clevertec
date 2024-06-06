import { ActivityData } from '../types/types';

export function filterEmptyExercises(training: ActivityData) {
    const filteredExercises = training.exercises.filter((exercise) => exercise.name.trim() !== '');

    return { ...training, exercises: filteredExercises };
}
