import React from 'react';
import { useSelector } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';
import { CloseButton } from '@components/close-button';
import { FormAddTraining } from '@components/form-add-training';
import { TrainingForm } from '@components/training-form';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useResponsiveWidth } from '@hooks/use-responsive-width';
import { createExercise, setTraining, trainingSelector } from '@redux/slices/training-slice';
import { containsElement } from '@utils/contains-element';
import { filterUncheckedExercises } from '@utils/filter-unchecked-exercises';
import { Button, Drawer } from 'antd';

import { DrawerTrainingsProps } from '../../types/props';

import './drawer-trainings.css';

export const DrawerTrainings = ({
    onClose,
    isDrawer,
    handleButtonSave,
    title,
}: DrawerTrainingsProps) => {
    const dispatch = useAppDispatch();
    const { training, activitiesData, flag } = useSelector(trainingSelector);
    const itemWithName = containsElement(activitiesData, training.date, training.name);
    const modalWidth = useResponsiveWidth(360, 408);

    const addForm = () => dispatch(createExercise());

    const deleteForm = () => {
        const resFilter = filterUncheckedExercises(training);

        dispatch(setTraining({ training: resFilter }));
    };

    const hasCheckedExercise = training.exercises.some((exercise) => exercise.checked);
    const buttonDisabled = !hasCheckedExercise;

    const handleButtonClick = () => {
        onClose();
        handleButtonSave();
    };

    return (
        <Drawer
            data-test-id='modal-drawer-right'
            title={
                title === 'Редактирование' ? (
                    <React.Fragment>
                        <EditOutlined style={{ fontSize: '14px' }} /> {title}
                    </React.Fragment>
                ) : (
                    title
                )
            }
            className='drawer-trainings'
            placement='right'
            onClose={onClose}
            open={isDrawer}
            closable={false}
            width={modalWidth}
            mask={false}
            extra={<CloseButton onClose={onClose} />}
            footer={
                <Button
                    block={true}
                    type='primary'
                    size='large'
                    onClick={handleButtonClick}
                    disabled={!training.name || !training.exercises[0].name || !training.date}
                >
                    Сохранить
                </Button>
            }
        >
            <TrainingForm flag={false} />
            <div className='drawer__wrapper'>
                {training.exercises.length &&
                    training.exercises.map((item, index) => (
                        <FormAddTraining key={item._id} item={item} index={index} />
                    ))}
                <div className='buttons__wrapper'>
                    <Button
                        type='link'
                        size='large'
                        className='btn__add-more'
                        onClick={addForm}
                        block={true}
                    >
                        {itemWithName ? 'Добавить ещё' : 'Добавить ещё упражнение'}
                    </Button>
                    {itemWithName ? (
                        <Button
                            block={true}
                            type='text'
                            size='large'
                            className='btn__delete'
                            onClick={deleteForm}
                            disabled={buttonDisabled}
                        >
                            Удалить
                        </Button>
                    ) : null}
                </div>
            </div>
            {flag ? (
                <div className='footer-drawer-subtitle'>
                    После сохранения внесенных изменений отредактировать проведенную тренировку
                    будет невозможно
                </div>
            ) : null}
        </Drawer>
    );
};
