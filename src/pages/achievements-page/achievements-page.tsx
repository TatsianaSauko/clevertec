import { useState } from 'react';
import { MonthlyTraining } from '@components/monthly-training';
import { WeeklyTraining } from '@components/weekly-training';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import './achievements-page.css';

export const AchievementsPage = () => {
    const [current, setCurrent] = useState('За неделю');

    let ComponentToRender: () => JSX.Element | null = () => null;

    switch (current) {
        case 'За неделю':
            ComponentToRender = WeeklyTraining;
            break;
        case 'За месяц':
            ComponentToRender = MonthlyTraining;
            break;
    }

    const items: MenuProps['items'] = [
        {
            label: 'За неделю',
            key: 'За неделю',
            style: { order: 'inherit' },
        },
        {
            label: 'За месяц',
            key: 'За месяц',
            style: { order: 'inherit' },
        },
        {
            label: 'За всё время (PRO)',
            key: 'За всё время (PRO)',
            style: { order: 'inherit', color: 'var(--character-light-disable-25)' },
        },
    ];

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return (
        <Content className='main main-achievements'>
            <div className='achievements-page'>
                <Menu
                    className='menu-achievements'
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode='horizontal'
                    items={items}
                />
                <ComponentToRender />
            </div>
        </Content>
    );
};
