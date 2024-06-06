import { useState } from 'react';
import { useSelector } from 'react-redux';
import { LoadingOutlined } from '@ant-design/icons';
import { ModalEditContent } from '@components/modal-edit-content';
import { ModalTrainingListError } from '@components/modal-training-list-error';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { createTraining, getTrainingUser, putTraining } from '@redux/action-creators';
import { authSelector } from '@redux/slices/auth-slice';
import { cleanTraining, setNameTraining, trainingSelector } from '@redux/slices/training-slice';
import { getDataForDate } from '@utils/get-data-for-date';
import { Button, Divider, Select, Spin } from 'antd';
import moment from 'moment';

import { ModalEditTrainingProps } from '../../types/props';

import './modal-edit.css';

import back from '/png/icon-back.png';

const antIcon = <LoadingOutlined style={{ fontSize: 14, color: '#1D39C4' }} spin={true} />;

export const ModalEdit = ({
    backClick,
    position,
    modalAddTraining,
    closeModals,
}: ModalEditTrainingProps) => {
    const dispatch = useAppDispatch();
    const { token } = useSelector(authSelector);
    const { activitiesData, trainingList, training, flag, loadingTraining } =
        useSelector(trainingSelector);
    const [selectedValue, setSelectedValue] = useState(
        training.name ? training.name : 'Выбор типа тренировки',
    );
    const [IsModalErrorSaveTraining, setIsModalErrorSaveTraining] = useState(false);
    const dataForDate = getDataForDate(activitiesData, training.date);

    const itemWithName = dataForDate.find((item) => item.name === training.name);

    const handleChange = (value: string) => {
        setSelectedValue(value);
        dispatch(cleanTraining());
        dispatch(setNameTraining({ value }));
    };

    const filteredOptions = trainingList.filter(
        (item) => !dataForDate.some((activity) => activity.name === item.name),
    );

    const handleSaveButton = async () => {
        const { _id: id, ...newTraining } = training;
        const cleanExercises = training.exercises.map(({ _id: exerciseId, ...rest }) => rest);
        const cleanTrainingObject = { ...newTraining, exercises: cleanExercises };

        if (itemWithName && itemWithName._id) {
            if (flag) {
                cleanTrainingObject.isImplementation = true;
            }
            try {
                await dispatch(putTraining(token, cleanTrainingObject, itemWithName._id));
                await dispatch(getTrainingUser(token));
                dispatch(cleanTraining());
                backClick();
            } catch {
                setIsModalErrorSaveTraining(true);
            }
        } else {
            try {
                await dispatch(createTraining(token, cleanTrainingObject));
                await dispatch(getTrainingUser(token));
                dispatch(cleanTraining());
                backClick();
            } catch {
                setIsModalErrorSaveTraining(true);
            }
        }
    };

    const handleModalToggle = () => {
        setIsModalErrorSaveTraining(false);
        closeModals();
    };

    return (
        <div
            className='modal-training-edit'
            data-test-id='modal-create-exercise'
            style={{
                top: position.top - 24,
                right: moment(training.date).day() === 0 ? 29 : undefined,
                left: moment(training.date).day() === 0 ? undefined : position.left - 8,
            }}
        >
            <ModalTrainingListError
                isModalTrainingList={IsModalErrorSaveTraining}
                handleModalToggle={handleModalToggle}
            />
            <button
                className='btn-back'
                onClick={backClick}
                onKeyDown={backClick}
                data-test-id='modal-exercise-training-button-close'
                type='button'
            >
                <img src={back} alt='back' />
            </button>
            <Select
                className='select-training'
                data-test-id='modal-create-exercise-select'
                value={selectedValue}
                onChange={handleChange}
                options={filteredOptions.map((item) => ({
                    value: item.name,
                    label: item.name,
                }))}
            />
            <ModalEditContent onClick={modalAddTraining} />
            <Divider />
            <div className='btn-wrapper'>
                <Button
                    className='btn__add-training'
                    block={true}
                    disabled={selectedValue === 'Выбор типа тренировки'}
                    onClick={modalAddTraining}
                >
                    Добавить упражнения
                </Button>
                <Button
                    type='text'
                    className='btn-save'
                    block={true}
                    onClick={handleSaveButton}
                    disabled={training.exercises.length === 0 || training.exercises[0].name === ''}
                >
                    {loadingTraining ? <Spin indicator={antIcon} className='spin' /> : null}
                    {itemWithName ? 'Сохранить изменения' : 'Сохранить'}
                </Button>
            </div>
        </div>
    );
};
