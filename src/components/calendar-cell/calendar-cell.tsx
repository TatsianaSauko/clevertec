import { useSelector } from 'react-redux';
import { trainingSelector } from '@redux/slices/training-slice';
import { getColorForName } from '@utils/get-color-for-name';
import { getDataForDate } from '@utils/get-data-for-date';
import moment from 'moment';

import { CalendarCellProps } from '../../types/props';

import './calendar-cell.css';

export const CalendarCell = ({ value }: CalendarCellProps) => {
    const { activitiesData } = useSelector(trainingSelector);
    const dataForDate = getDataForDate(activitiesData, moment(value).toISOString());

    return (
        <ul className='events'>
            {dataForDate.map((activity) => (
                <li key={activity._id}>
                    <span
                        className='marker'
                        style={{ backgroundColor: getColorForName(activity.name) }}
                    />
                    {activity.name}
                </li>
            ))}
        </ul>
    );
};
