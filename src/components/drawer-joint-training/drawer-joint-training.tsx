import { useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import { CloseButton } from '@components/close-button';
import { FormAddTraining } from '@components/form-add-training';
import { TrainingForm } from '@components/training-form';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useResponsiveWidth } from '@hooks/use-responsive-width';
import { createExercise, setTraining, trainingSelector } from '@redux/slices/training-slice';
import { filterUncheckedExercises } from '@utils/filter-unchecked-exercises';
import { getTrainingColor } from '@utils/get-color-for-name';
import { Avatar, Badge, Button, Drawer } from 'antd';

import { DrawerJointTrainingProps } from '../../types/props';

import './drawer-joint-training.css';

export const DrawerJointTraining = ({
    onClose,
    isDrawer,
    user,
    handleButtonSave,
}: DrawerJointTrainingProps) => {
    const dispatch = useAppDispatch();
    const { training } = useSelector(trainingSelector);
    const modalWidth = useResponsiveWidth(360, 408);

    const addForm = () => dispatch(createExercise());

    const deleteForm = () => {
        const resFilter = filterUncheckedExercises(training);

        dispatch(setTraining({ training: resFilter }));
    };

    const hasCheckedExercise = training.exercises.some((exercise) => exercise.checked);
    const buttonDisabled = !hasCheckedExercise;

    const color = getTrainingColor(user.trainingType);

    return (
        <Drawer
            data-test-id='modal-drawer-right'
            title='+ Совместная тренировка'
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
                    onClick={handleButtonSave}
                    disabled={!training.exercises[0].name || !training.date}
                >
                    Отправить приглашение
                </Button>
            }
        >
            <div className='drawer-info-user'>
                <div className='modal-card-partner__header'>
                    {user.imageSrc ? (
                        <Avatar
                            src={user.imageSrc}
                            size='large'
                            style={{ width: '42px', height: '42px' }}
                        />
                    ) : (
                        <Avatar
                            icon={<UserOutlined />}
                            size='large'
                            style={{ width: '42px', height: '42px' }}
                        />
                    )}
                    <div className='fullName'>{user.name}</div>
                </div>
                <Badge color={color} text={user.trainingType} />
            </div>

            <TrainingForm flag={true} />
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
                        Добавить ещё
                    </Button>
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
                </div>
            </div>
        </Drawer>
    );
};
