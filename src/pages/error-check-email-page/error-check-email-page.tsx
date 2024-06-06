import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { checkEmail } from '@redux/action-creators';
import { history } from '@redux/configure-store';
import { authSelector } from '@redux/slices/auth-slice';
import { Button, Typography } from 'antd';

import './error-check-email-page.css';

import errorCheckEmail from '/png/errorCheckEmail.png';

const { Title, Text } = Typography;

export const ErrorCheckEmailPage = () => {
    const dispatch = useAppDispatch();
    const { email } = useSelector(authSelector);

    const onClick = async () => {
        history.back();
        await dispatch(checkEmail({ email }));
    };

    return (
        <div className='error-check-email'>
            <img src={errorCheckEmail} alt='Error' className='icon-error' />
            <div className='block-title'>
                <Title level={3} className='title'>
                    Что-то пошло не так
                </Title>
                <Text type='secondary'>Произошла ошибка, попробуйте отправить форму ещё раз.</Text>
            </div>
            <Button
                type='primary'
                size='large'
                className='button'
                onClick={onClick}
                data-test-id='check-back-button'
            >
                Назад
            </Button>
        </div>
    );
};
