export const getColorForName = (name: string) => {
    switch (name) {
        case 'Силовая':
            return 'var(--tranie-green)';
        case 'Ноги':
            return ' var(--tranie-red)';
        case 'Руки':
            return 'var(--tranie-cyan)';
        case 'Спина':
            return ' var(--tranie-orange)';
        default:
            return 'gray';
    }
};

export const getTrainingColor = (trainingType: string) => {
    switch (trainingType) {
        case 'Ноги':
            return 'red';
        case 'Силовая':
            return 'green';
        case 'Руки':
            return 'cyan';
        case 'Спина':
            return 'orange';
        default:
            return 'gray';
    }
};
