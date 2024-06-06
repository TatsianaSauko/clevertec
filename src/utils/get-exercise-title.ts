export const getExerciseTitle = (exerciseName: string) => {
    switch (exerciseName) {
        case 'Ноги':
            return 'Самое частое упражнение для ног';
        case 'Руки':
            return 'Самое частое упражнение для рук';
        case 'Силовая':
            return 'Самое частое упражнение силовой';
        case 'Спина':
            return 'Самое частое упражнение для спины';
        case 'Грудь':
            return 'Самое частое упражнение для груди';
        default:
            return 'Самое частое упражнение';
    }
};
