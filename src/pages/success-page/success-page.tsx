import { Path } from '@constants/paths';
import { history } from '@redux/configure-store';
import { Button, Typography } from 'antd';

import './success-page.css';

import success from '/png/success.png';

const { Title, Text } = Typography;

export const SuccessPage = () => {
    const handleButtonClick = () => history.push(Path.Auth);

    return (
        <div className='success-page'>
            <img src={success} alt='Error' className='icon-success' />
            <div className='block-title'>
                <Title level={3} className='title'>
                    Регистрация успешна
                </Title>
                <Text type='secondary'>
                    Регистрация прошла успешно. Зайдите <br /> в приложение, используя свои e-mail и
                    пароль.
                </Text>
            </div>
            <Button
                block={true}
                type='primary'
                size='large'
                className='button'
                onClick={handleButtonClick}
                data-test-id='registration-enter-button'
            >
                Войти
            </Button>
        </div>
    );
};
