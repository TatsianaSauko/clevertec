import { CloseCircleOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useResponsiveWidth } from '@hooks/use-responsive-width';
import { setIsTrainingPartnerFinderComponent } from '@redux/slices/joint-training';
import { Button, Modal, Typography } from 'antd';

import { ModalErrorSaveDataProps } from '../../types/props';

import './modal-error-save-data.css';

const { Title, Text } = Typography;

export const ModalErrorSaveData = ({ visible, onClose }: ModalErrorSaveDataProps) => {
    const dispatch = useAppDispatch();
    const modalWidth = useResponsiveWidth(328, 416);

    const handleCloseButton = () => {
        dispatch(setIsTrainingPartnerFinderComponent({ isTrainingPartnerFinderComponent: true }));
        onClose();
    };

    return (
        <Modal
            className='modal-save-data-error'
            footer={false}
            centered={true}
            open={visible}
            onCancel={onClose}
            closable={false}
            width={modalWidth}
        >
            <div className='result-save-data-error'>
                <div className='block-title__wrapper'>
                    <CloseCircleOutlined
                        className='icon-result'
                        style={{ color: 'var(--character-light-error)', fontSize: '24px' }}
                    />
                    <div className='block-title'>
                        <Title level={5} className='title'>
                            При сохранении данных произошла ошибка
                        </Title>
                        <Text type='secondary' className='subtitle'>
                            Придётся попробовать ещё раз
                        </Text>
                    </div>
                </div>
                <Button
                    type='primary'
                    className='btn-close'
                    onClick={handleCloseButton}
                    size='large'
                >
                    Закрыть
                </Button>
            </div>
        </Modal>
    );
};
