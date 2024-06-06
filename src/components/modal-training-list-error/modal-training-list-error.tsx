import { useSelector } from 'react-redux';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useResponsiveWidth } from '@hooks/use-responsive-width';
import { trainingSelector } from '@redux/slices/training-slice';
import { Button, Modal, Typography } from 'antd';

import { ModalTrainingListErrorProps } from '../../types/props';

import './modal-training-list-error.css';

const { Title, Text } = Typography;

export const ModalTrainingListError = ({
    isModalTrainingList,
    handleModalToggle,
    update,
}: ModalTrainingListErrorProps) => {
    const { isModal } = useSelector(trainingSelector);
    const modalWidth = useResponsiveWidth(328, 384);

    return (
        <Modal
            className='modal-training-list-error'
            footer={false}
            centered={true}
            open={isModalTrainingList}
            onCancel={isModal ? handleModalToggle : undefined}
            closable={isModal}
            width={modalWidth}
            closeIcon={
                isModal ? (
                    <CloseOutlined data-test-id='modal-error-user-training-button-close' />
                ) : null
            }
        >
            <div className='result-training-list-error'>
                <div className='block-title__wrapper'>
                    <CloseCircleOutlined
                        className='icon-result'
                        style={
                            isModal
                                ? { color: 'var(--primary-light-6)', fontSize: '24px' }
                                : { color: 'var(--character-dark-error)', fontSize: '24px' }
                        }
                    />
                    <div className='block-title'>
                        <Title
                            level={5}
                            className='title'
                            data-test-id='modal-error-user-training-title'
                        >
                            При {isModal ? 'открытии' : 'сохранении'} данных <br /> произошла ошибка
                        </Title>
                        <Text
                            type='secondary'
                            className='subtitle'
                            data-test-id='modal-error-user-training-subtitle'
                        >
                            {isModal ? 'Попробуйте ещё раз.' : 'Придётся попробовать ещё раз'}
                        </Text>
                    </div>
                </div>
                <Button
                    type='primary'
                    className='btn-update'
                    onClick={isModal ? update : handleModalToggle}
                    data-test-id='modal-error-user-training-button'
                >
                    {isModal ? 'Обновить' : 'Закрыть'}
                </Button>
            </div>
        </Modal>
    );
};
