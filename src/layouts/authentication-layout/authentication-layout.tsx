import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Loader } from '@components/loader';
import { Path } from '@constants/paths';
import { history } from '@redux/configure-store';
import { authSelector } from '@redux/slices/auth-slice';
import { Menu } from 'antd';

import './authentication-layout.css';

import formLogo from '/png/formLogo.png';
import formLogoMobile from '/png/formLogoMobile.png';

export const AuthenticationLayout: React.FC = () => {
    const { loading, token } = useSelector(authSelector);

    useEffect(() => {
        if (token) {
            history.push(Path.Main);
        }
    }, [token]);

    return (
        <div className='auth-wrapper'>
            {loading && <Loader />}
            <div className='auth-wrapper__content'>
                <div className='auth-wrapper__logo'>
                    <img src={formLogo} alt='CleverFit' className='auth-logo auth-logo_hidden' />
                    <img src={formLogoMobile} alt='CleverFit' className='auth-logo-mobile' />
                </div>
                <div
                    className='auth-wrapper__buttons'
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <Menu
                        mode='horizontal'
                        defaultSelectedKeys={['login']}
                        style={{ display: 'flex', flex: '1' }}
                    >
                        <Menu.Item
                            key='login'
                            style={{ flex: '0.7', textAlign: 'center' }}
                            onClick={() => history.push('/auth')}
                        >
                            Вход
                        </Menu.Item>
                        <Menu.Item
                            key='register'
                            style={{ flex: '1', textAlign: 'center' }}
                            onClick={() => history.push('/auth/registration')}
                        >
                            Регистрация
                        </Menu.Item>
                    </Menu>
                </div>
                <Outlet />
            </div>
        </div>
    );
};
