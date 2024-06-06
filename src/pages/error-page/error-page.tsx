import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { register } from '@redux/action-creators';
import { history } from '@redux/configure-store';
import { authSelector } from '@redux/slices/auth-slice';
import { Button, Typography } from 'antd';

import './error-page.css';

import error from '/png/error.png';

const { Title, Text } = Typography;

export const ErrorPage = () => {
    const dispatch = useAppDispatch();
    const { email, password } = useSelector(authSelector);

    const onClick = async () => {
        history.back();
        await dispatch(register({ email, password }));
    };

    return (
        <div className='error-page'>
            <img src={error} alt='Error' className='icon-error' />
            <div className='block-title'>
                <Title level={3} className='title'>
                    Данные не сохранились
                </Title>
                <Text type='secondary'>
                    Что-то пошло не так и ваша регистрация <br /> не завершилась. Попробуйте ещё
                    раз.
                </Text>
            </div>

            <Button
                block={true}
                type='primary'
                size='large'
                className='button'
                onClick={onClick}
                data-test-id='registration-retry-button'
            >
                Повторить
            </Button>
        </div>
    );
};
