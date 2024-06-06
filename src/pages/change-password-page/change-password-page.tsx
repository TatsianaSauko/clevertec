import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Loader } from '@components/loader';
import { Path } from '@constants/paths';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { changePassword } from '@redux/action-creators';
import { history } from '@redux/configure-store';
import { authSelector, setPassword } from '@redux/slices/auth-slice';
import { confirmPasswordRules } from '@utils/confirm-password-rules';
import { passwordRules } from '@utils/password-rules';
import { Button, Form, Input, Typography } from 'antd';

import { IChangePassword } from '../../types/types';

import './change-password-page.css';

const { Title } = Typography;

export const ChangePasswordPage = () => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const { loading } = useSelector(authSelector);

    const onFinish = async (values: IChangePassword) => {
        dispatch(setPassword({ password: values.password }));
        await dispatch(
            changePassword({ password: values.password, confirmPassword: values.confirmPassword }),
        );
    };

    useEffect(() => {
        if (location.key === 'default') {
            history.push(Path.Auth);
        }
    }, [location.key]);

    return (
        <div className='change-password'>
            {loading && <Loader />}
            <div className='change-password__content'>
                <Title level={3} className='title'>
                    Восстановление аккауанта
                </Title>
                <Form name='change-password' className='change-password-form' onFinish={onFinish}>
                    <Form.Item
                        name='password'
                        help='Пароль не менее 8 символов, c заглавной буквой и цифрой'
                        rules={passwordRules}
                        hasFeedback={true}
                    >
                        <Input.Password placeholder='Новый пароль' data-test-id='change-password' />
                    </Form.Item>
                    <Form.Item
                        name='confirmPassword'
                        dependencies={['password']}
                        hasFeedback={true}
                        rules={confirmPasswordRules}
                    >
                        <Input.Password
                            placeholder='Повторить пароль'
                            data-test-id='change-confirm-password'
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type='primary'
                            size='large'
                            block={true}
                            className='btn-save'
                            htmlType='submit'
                            data-test-id='change-submit-button'
                        >
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
