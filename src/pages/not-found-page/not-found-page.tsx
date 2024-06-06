import { useState } from 'react';
import { ButtonSiderToggle } from '@components/button-sider-toggle';
import { Sider } from '@components/sider';
import { Button, Layout, Result } from 'antd';

import './not-found-page.css';

export const NotFoundPage = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleCollapsed = () => setCollapsed(!collapsed);

    return (
        <Layout className='main-page'>
            <Sider collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
            <Layout className='site_layout'>
                <ButtonSiderToggle collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
                <Result
                    className='not-found-page'
                    status='404'
                    title='Такой страницы нет'
                    subTitle='Извините, страница не найдена, возможно, она была удалена или перемещена.'
                    extra={
                        <Button type='primary' size='large' className='btn-result'>
                            На главную
                        </Button>
                    }
                />
            </Layout>
        </Layout>
    );
};
