import { CloseCircleOutlined } from '@ant-design/icons';
import { useResponsiveWidth } from '@hooks/use-responsive-width';
import { Button, Modal, Typography } from 'antd';

import { FileSizeExceedModalProps } from '../../types/props';

import './file-size-exceed-modal.css';

const { Title, Text } = Typography;

export const FileSizeExceedModal = ({ visible, onClose }: FileSizeExceedModalProps) => {
    const modalWidth = useResponsiveWidth(328, 416);

    return (
        <Modal
            className='modal-file-error'
            footer={false}
            centered={true}
            open={visible}
            onCancel={onClose}
            closable={false}
            width={modalWidth}
        >
            <div className='result-file-error'>
                <div className='block-title__wrapper'>
                    <CloseCircleOutlined
                        className='icon-result'
                        style={{ color: 'var(--character-light-error)', fontSize: '24px' }}
                    />
                    <div className='block-title'>
                        <Title level={5} className='title'>
                            Файл слишком большой
                        </Title>
                        <Text type='secondary' className='subtitle'>
                            Выбирите файл размером [......] МБ.
                        </Text>
                    </div>
                </div>
                <Button
                    data-test-id='big-file-error-close'
                    type='primary'
                    className='btn-close'
                    onClick={onClose}
                    size='large'
                >
                    Закрыть
                </Button>
            </div>
        </Modal>
    );
};
