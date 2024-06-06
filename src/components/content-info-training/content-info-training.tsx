import { useSelector } from 'react-redux';
import { trainingSelector } from '@redux/slices/training-slice';

import './content-info-training.css';

export const ContentInfoTraining = () => {
    const { training } = useSelector(trainingSelector);

    return (
        <ul className='training-edit-content'>
            {training.exercises.map((item) => (
                <li key={item._id}>{item.name}</li>
            ))}
        </ul>
    );
};
