import { useResponsiveWidth } from '@hooks/use-responsive-width';
import { Button, Modal, Typography } from 'antd';

import { ModalErrorProps } from '../../types/props';

import './modal-get-data-error.css';

import errorCheckEmail from '/png/errorCheckEmail.png';

const { Title, Text } = Typography;

export const ModalGetDataError = ({ isModalGetData, handleModalToggle }: ModalErrorProps) => {
    const modalWidth = useResponsiveWidth(328, 539);

    return (
        <Modal
            className='modal-error'
            data-test-id='modal-no-review'
            centered={true}
            open={isModalGetData}
            width={modalWidth}
        >
            <div className='result-error'>
                <img src={errorCheckEmail} alt='Error' className='icon-result' />
                <div className='block-title'>
                    <Title level={3} className='title'>
                        Что-то пошло не так
                    </Title>
                    <Text type='secondary' className='subtitle'>
                        Произошла ошибка, попробуйте ещё раз.
                    </Text>
                </div>
                <Button
                    type='primary'
                    size='large'
                    className='btn-back'
                    onClick={handleModalToggle}
                >
                    Назад
                </Button>
            </div>
        </Modal>
    );
};
