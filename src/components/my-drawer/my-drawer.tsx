import { useSelector } from 'react-redux';
import { CloseButton } from '@components/close-button';
import { FormAddTraining } from '@components/form-add-training';
import { DATE_FORMAT } from '@constants/app-constants';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useResponsiveWidth } from '@hooks/use-responsive-width';
import { createExercise, setTraining, trainingSelector } from '@redux/slices/training-slice';
import { filterUncheckedExercises } from '@utils/filter-unchecked-exercises';
import { getColorForName } from '@utils/get-color-for-name';
import { getDataForDate } from '@utils/get-data-for-date';
import { Button, Drawer } from 'antd';
import moment from 'moment';

import { DrawerProps } from '../../types/props';

import './my-drawer.css';

export const MyDrawer = ({ onClose, isDrawer }: DrawerProps) => {
    const dispatch = useAppDispatch();
    const { training, activitiesData } = useSelector(trainingSelector);
    const dataForDate = getDataForDate(activitiesData, training.date);
    const itemWithName = dataForDate.find((item) => item.name === training.name);
    const modalWidth = useResponsiveWidth(360, 408);

    const addForm = () => dispatch(createExercise());

    const deleteForm = () => {
        const resFilter = filterUncheckedExercises(training);

        dispatch(setTraining({ training: resFilter }));
    };

    const hasCheckedExercise = training.exercises.some((exercise) => exercise.checked);
    const buttonDisabled = !hasCheckedExercise;

    return (
        <Drawer
            data-test-id='modal-drawer-right'
            title={itemWithName ? '+ Редактирование' : '+ Добавление упражнений'}
            className='drawer-edit-training'
            placement='right'
            onClose={onClose}
            open={isDrawer}
            closable={false}
            width={modalWidth}
            extra={<CloseButton onClose={onClose} />}
        >
            <div className='drawer-data__wrapper'>
                <div className='name-training'>
                    <span
                        className='marker'
                        style={{ backgroundColor: getColorForName(training.name) }}
                    />
                    {training.name}
                </div>
                <div className='drawer-data'>{moment(training.date).format(DATE_FORMAT)}</div>
            </div>
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
