import { useSelector } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import { ModalTrainingContent } from '@components/modal-training-content';
import { DATE_FORMAT } from '@constants/app-constants';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import {
    cleanTraining,
    setNameTraining,
    setTraining,
    trainingSelector,
} from '@redux/slices/training-slice';
import { getDataForDate } from '@utils/get-data-for-date';
import { Button, Divider, Empty, Typography } from 'antd';
import moment from 'moment';

import { ModalTrainingProps } from '../../types/props';

import './modal-training.css';

import empty from '/png/empty-image.png';

const { Title, Text } = Typography;

export const ModalTraining = ({ onCancel, position, click }: ModalTrainingProps) => {
    const dispatch = useAppDispatch();
    const { activitiesData, trainingList, training, flag } = useSelector(trainingSelector);
    const dataForDate = getDataForDate(activitiesData, training.date);

    const handleEditTraining = (value: string) => {
        dispatch(setNameTraining({ value }));
        const filteredActivities = dataForDate.filter((item) => item.name === value);

        dispatch(setTraining({ training: filteredActivities[0] }));
        onCancel();
        click();
    };

    const handleCreateTraining = () => {
        click();
        onCancel();
        dispatch(cleanTraining());
    };

    return (
        <div
            className='modal-training'
            data-test-id='modal-create-training'
            style={{
                top: position.top - 24,
                right: moment(training.date).day() === 0 ? 29 : undefined,
                left: moment(training.date).day() === 0 ? undefined : position.left - 8,
            }}
        >
            <Button
                type='text'
                className='btn-close'
                onClick={onCancel}
                data-test-id='modal-create-training-button-close'
            >
                <CloseOutlined />
            </Button>
            <div className='block-title'>
                <Title level={5} className='title'>
                    {`Тренировки на ${moment(training.date).format(DATE_FORMAT)}`}
                </Title>
                {dataForDate.length ? null : (
                    <Text type='secondary' className='subtitle'>
                        Нет активных тренировок
                    </Text>
                )}
            </div>
            {dataForDate.length ? (
                <ModalTrainingContent value={dataForDate} onClick={handleEditTraining} />
            ) : (
                <Empty
                    image={empty}
                    imageStyle={{
                        height: 32,
                        width: 32,
                    }}
                    className='empty'
                    description={false}
                />
            )}
            <Divider />
            <div className='btn-wrapper'>
                <Button
                    type='primary'
                    className='btn-create'
                    size='large'
                    block={true}
                    onClick={handleCreateTraining}
                    disabled={trainingList.length === dataForDate.length || flag === true}
                >
                    Создать тренировку
                </Button>
            </div>
        </div>
    );
};
