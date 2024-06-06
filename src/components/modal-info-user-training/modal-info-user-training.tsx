import { CloseOutlined } from '@ant-design/icons';
import { DATE_FORMAT } from '@constants/app-constants';
import { periodOptions } from '@constants/period-options';
import { getTrainingColor } from '@utils/get-color-for-name';
import { Badge, Divider } from 'antd';
import moment from 'moment';

import { ModalInfoUserTrainingProps } from '../../types/props';

import './modal-info-user-training.css';

export const ModalInfoUserTraining = ({
    closeClick,
    position,
    item,
}: ModalInfoUserTrainingProps) => {
    const period = periodOptions.find(
        (option) => option.value === item.training.parameters?.period,
    );

    const color = getTrainingColor(item.training.name);

    return (
        <div
            data-test-id='joint-training-review-card'
            className='modal-info-user-training'
            style={{
                top: position.top,
                left: position.left,
            }}
        >
            <div className='info-user-training__header'>
                <Badge color={color} text={item.training.name} />
                <CloseOutlined onClick={closeClick} />
            </div>
            <Divider />
            <div className='info-user-training__content'>
                <div className='title__wrapper'>
                    <div className='type__repeat'>{period ? period.name : ''}</div>
                    <div className='value__date'>
                        {moment(item.training.date).format(DATE_FORMAT)}
                    </div>
                </div>
                <div className='wrapper'>
                    <div className='type__wrapper'>
                        {item.training.exercises.map((exercise) => (
                            <div className='type' key={exercise.name}>
                                {exercise.name}
                            </div>
                        ))}
                    </div>
                    <div className='value__wrapper'>
                        {item.training.exercises.map((value) => (
                            <div className='value' key={value._id}>
                                {value.replays} x
                                {value.weight && value.approaches
                                    ? `(${value.weight * value.approaches} кг)`
                                    : value.approaches || ''}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
