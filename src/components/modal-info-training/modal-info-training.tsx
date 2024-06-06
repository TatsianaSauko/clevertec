import { useSelector } from 'react-redux';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ContentInfoTraining } from '@components/content-info-training';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useWindowSize } from '@hooks/use-window-size';
import { setTraining, trainingSelector } from '@redux/slices/training-slice';
import { getColorForName } from '@utils/get-color-for-name';
import { Button, Divider } from 'antd';

import { ModalInfoTrainingProps } from '../../types/props';

import './modal-info-training.css';

export const ModalInfoTraining = ({ backClick, position, onClick }: ModalInfoTrainingProps) => {
    const dispatch = useAppDispatch();
    const { training } = useSelector(trainingSelector);
    const windowSize = useWindowSize();
    let positionLeft;

    if (windowSize > 1023) {
        positionLeft = position.left - 213;
    } else if (windowSize > 767) {
        positionLeft = position.left - 180;
    } else {
        positionLeft = position.left - 84;
    }

    const handleButtonAddTraining = () => {
        dispatch(setTraining({ training }));
        onClick('Редактирование');
        backClick();
    };

    return (
        <div
            className='modal-training-edit'
            data-test-id='modal-create-exercise'
            style={{
                top: position.top - 5,
                left: positionLeft,
            }}
        >
            <div className='info-training__header'>
                <ArrowLeftOutlined onClick={backClick} />
                <div>{training.name}</div>
            </div>

            <Divider style={{ background: getColorForName(training.name), height: '2px' }} />

            <ContentInfoTraining />
            <Divider />
            <div className='btn-wrapper'>
                <Button
                    className='btn__add-training'
                    block={true}
                    onClick={handleButtonAddTraining}
                >
                    Добавить упражнения
                </Button>
            </div>
        </div>
    );
};
