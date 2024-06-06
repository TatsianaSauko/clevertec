import moment, { Moment } from 'moment';

export const isPastDate = (date: Moment): boolean => {
    const today = moment().startOf('day');

    return date.isSameOrBefore(today, 'day');
};
