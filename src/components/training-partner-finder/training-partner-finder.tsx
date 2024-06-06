import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ModalTrainingListError } from '@components/modal-training-list-error';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import {
    getUserJointTrainingList,
    getUserJointTrainingListByTrainingType,
} from '@redux/action-creators';
import { authSelector } from '@redux/slices/auth-slice';
import { setIsUserList } from '@redux/slices/joint-training';
import { setIisModal, trainingSelector } from '@redux/slices/training-slice';
import { findMostPopularTrainingType } from '@utils/find-most-popular-training-type';
import { Button, Typography } from 'antd';

import './training-partner-finder.css';

const { Title } = Typography;

export const TrainingPartnerFinder = () => {
    const dispatch = useAppDispatch();
    const { token } = useSelector(authSelector);
    const { activitiesData, trainingList } = useSelector(trainingSelector);
    const [isModalTrainingList, setIsModalTrainingList] = useState(false);
    const trainingType = findMostPopularTrainingType(activitiesData, trainingList);

    const handleButtonByTrainingType = async () => {
        dispatch(setIisModal({ isModal: true }));
        try {
            await dispatch(getUserJointTrainingListByTrainingType(token, trainingType));
            setIsModalTrainingList(false);
            dispatch(setIsUserList({ isUserList: true }));
        } catch {
            setIsModalTrainingList(true);
        }
    };

    const handleButtonRandom = async () => {
        dispatch(setIisModal({ isModal: true }));
        try {
            await dispatch(getUserJointTrainingList(token));
            setIsModalTrainingList(false);
            dispatch(setIsUserList({ isUserList: true }));
        } catch {
            setIsModalTrainingList(true);
        }
    };

    const handleModalToggle = () => setIsModalTrainingList(false);

    return (
        <div className='training-partner-finder'>
            <ModalTrainingListError
                isModalTrainingList={isModalTrainingList}
                handleModalToggle={handleModalToggle}
                update={handleButtonRandom}
            />
            <Title level={4} className='title'>
                Хочешь тренироваться с тем, кто разделяет твои цели и темп?
                <br />
                Можешь найти друга для совместных тренировок среди других пользователей.
            </Title>
            <div className='subtitle'>
                Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой уровень
                и вид тренировки, и мы найдем тебе идеального спортивного друга.
            </div>
            <div className='buttons__wrapper'>
                <Button
                    type='link'
                    className='btn__selection_random'
                    size='middle'
                    onClick={handleButtonRandom}
                >
                    Случайный выбор
                </Button>
                <Button
                    type='text'
                    className='btn__selection'
                    size='middle'
                    onClick={handleButtonByTrainingType}
                >
                    Выбор друга по моим тренировкам
                </Button>
            </div>
        </div>
    );
};
