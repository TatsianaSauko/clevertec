import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CheckCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { DrawerJointTraining } from '@components/drawer-joint-training';
import { ModalErrorSaveData } from '@components/modal-error-save-data';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import {
    createTraining,
    deleteInvite,
    getInvite,
    getTrainingUser,
    postInvite,
} from '@redux/action-creators';
import { authSelector } from '@redux/slices/auth-slice';
import {
    jointTrainingSelector,
    setUserJointTrainingListStatus,
    setUserJointTrainingListWitchTrainingTypeStatus,
} from '@redux/slices/joint-training';
import { cleanTraining, trainingSelector } from '@redux/slices/training-slice';
import { Avatar, Button } from 'antd';

import { TrainingPals } from '../../types/types';

import './card-user-joint-training.css';

export const CardUserJointTraining = ({
    item,
    searchQuery,
    dataTestId,
}: {
    item: TrainingPals;
    searchQuery: string;
    dataTestId: string;
}) => {
    const dispatch = useAppDispatch();
    const { training } = useSelector(trainingSelector);
    const { userJointTrainingList } = useSelector(jointTrainingSelector);
    const { token } = useSelector(authSelector);
    const [isDrawer, setIsDrawer] = useState(false);
    const [IsModalErrorSaveTraining, setIsModalErrorSaveTraining] = useState(false);

    let statusMessage;

    if (item.status === 'accepted') {
        statusMessage = (
            <div className='message'>
                тренировка одобрена
                <CheckCircleFilled
                    style={{
                        color: 'var(--character-light-success)',
                        fontSize: '14px',
                        paddingLeft: '9px',
                    }}
                />
            </div>
        );
    } else if (item.status === 'pending') {
        statusMessage = <div className='message'>ожидает подтверждения</div>;
    } else if (item.status === 'rejected') {
        statusMessage = (
            <div className='message'>
                тренировка отклонена
                <ExclamationCircleOutlined
                    style={{
                        color: 'var(--character-light-secondary-45)',
                        fontSize: '14px',
                        paddingLeft: '9px',
                    }}
                />
            </div>
        );
    } else {
        statusMessage = <div className='message hidden'>hidden</div>;
    }

    const handleButtonCancel = async () => {
        await dispatch(deleteInvite(token, item.inviteId));
        await dispatch(getInvite(token));
    };

    const onClose = () => setIsDrawer(false);

    const handleButtonCreate = () => setIsDrawer(true);

    const handleButtonSave = async () => {
        setIsDrawer(false);
        const { _id: id, ...newTraining } = training;
        const cleanExercises = training.exercises.map(({ _id: exerciseId, ...rest }) => rest);
        const cleanTrainingObject = { ...newTraining, exercises: cleanExercises };

        cleanTrainingObject.name = item.trainingType;
        try {
            const trainingId = await dispatch(createTraining(token, cleanTrainingObject));

            const data = {
                to: item.id,
                trainingId,
            };

            await dispatch(postInvite(token, data));
            if (userJointTrainingList.length > 0) {
                dispatch(setUserJointTrainingListStatus({ userId: item.id, status: 'pending' }));
            } else {
                dispatch(
                    setUserJointTrainingListWitchTrainingTypeStatus({
                        userId: item.id,
                        status: 'pending',
                    }),
                );
            }
            await dispatch(getTrainingUser(token));
        } catch {
            setIsModalErrorSaveTraining(true);
        }
        dispatch(cleanTraining());
    };

    const closeModalErrorSaveData = () => {
        setIsModalErrorSaveTraining(false);
        dispatch(cleanTraining());
    };
    const wordParts = item.name.split(new RegExp(`(${searchQuery})`, 'gi'));

    return (
        <div
            className={
                item.status === 'rejected'
                    ? 'card-user-joint-training color'
                    : 'card-user-joint-training'
            }
            data-test-id={dataTestId}
        >
            <ModalErrorSaveData
                visible={IsModalErrorSaveTraining}
                onClose={closeModalErrorSaveData}
            />
            <DrawerJointTraining
                onClose={onClose}
                isDrawer={isDrawer}
                user={item}
                handleButtonSave={handleButtonSave}
            />
            <div className='card-user-joint-training__header'>
                <Avatar
                    src={item.imageSrc}
                    size='large'
                    style={{ width: '42px', height: '42px' }}
                />
                <div className='name'>
                    <div key={crypto.randomUUID()}>
                        {wordParts.map((part, partIndex) =>
                            part.toLowerCase() === searchQuery.toLowerCase() ? (
                                <span
                                    key={`${part}-${partIndex}`}
                                    style={{ color: 'var(--character-light-red-4)' }}
                                >
                                    {part}
                                </span>
                            ) : (
                                <span key={`${part}-${partIndex}`}>{part}</span>
                            ),
                        )}
                    </div>
                </div>
            </div>
            <div className='card-user-joint-training__details'>
                <div className='type__wrapper'>
                    <div className='type'>Тип тренировки:</div>
                    <div className='type'>Средняя нагрузка:</div>
                </div>
                <div className='value__wrapper'>
                    <div className='value'>{item.trainingType}</div>
                    <div className='value'>{item.avgWeightInWeek} кг/нед</div>
                </div>
            </div>
            {item.status === 'accepted' ? (
                <Button
                    block={true}
                    size='small'
                    className='btn__create-training'
                    onClick={handleButtonCancel}
                >
                    Отменить тренировку
                </Button>
            ) : (
                <Button
                    block={true}
                    type='primary'
                    size='small'
                    className='btn__create-training'
                    disabled={item.status === 'pending' || item.status === 'rejected'}
                    onClick={handleButtonCreate}
                >
                    Создать тренировку
                </Button>
            )}
            {statusMessage}
        </div>
    );
};
