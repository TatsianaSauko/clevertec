import { DateRenderProps } from '../../types/types';

export const DateRender = ({ current, activityDates }: DateRenderProps) => {
    const formattedDate = current.format('YYYY-MM-DD');

    if (activityDates.includes(formattedDate)) {
        return <div style={{ backgroundColor: 'var(--primary-light-1)' }}>{current.date()}</div>;
    }

    return <div>{current.date()}</div>;
};
