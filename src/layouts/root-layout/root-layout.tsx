import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { ButtonSiderToggle } from '@components/button-sider-toggle';
import { Header } from '@components/header';
import { Loader } from '@components/loader';
import { Sider } from '@components/sider';
import { Path } from '@constants/paths';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { getUserMe } from '@redux/action-creators';
import { history } from '@redux/configure-store';
import { authSelector, loginSuccess, logout } from '@redux/slices/auth-slice';
import { userSelector } from '@redux/slices/user-slice';
import { Layout } from 'antd';

import './root-layout.css';

const { Footer } = Layout;

export const RootLayout: React.FC = () => {
    const dispatch = useAppDispatch();
    const { token, loading } = useSelector(authSelector);
    const { user } = useSelector(userSelector);
    const [collapsed, setCollapsed] = useState(false);
    const [isPageSettings, setIsPageSettings] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fetchUser = async () => {
            if (location?.search) {
                const searchString = location.search.split('=');

                if (searchString[0] === '?accessToken') {
                    await dispatch(getUserMe(searchString[1]));
                    dispatch(
                        loginSuccess({
                            remember: true,
                            token: searchString[1],
                        }),
                    );
                }
            }
        };

        fetchUser();
    }, [location, dispatch]);

    useEffect(() => {
        if (!token) {
            history.push(Path.Auth);
            dispatch(logout());
        }
    }, [token, dispatch]);

    useEffect(() => {
        const fetchUser = async () => {
            if (token && user.email === '') {
                await dispatch(getUserMe(token));
            }
        };

        fetchUser();
    }, [token, dispatch, user.email]);

    useEffect(() => {
        setIsPageSettings(location.pathname === '/settings');
    }, [location]);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <Layout className={isPageSettings ? 'main-settings' : 'main-page'}>
            {loading && <Loader />}
            <Sider collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
            <Layout className='site_layout'>
                <ButtonSiderToggle collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
                <Header />
                <Outlet />
                <Footer className='footer' />
            </Layout>
        </Layout>
    );
};
