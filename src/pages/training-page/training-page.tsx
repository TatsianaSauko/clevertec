import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { JointTrainingsComponent } from '@components/joint-trainings-component';
import { MarathonComponent } from '@components/marathon-component';
import { ModalTrainingListError } from '@components/modal-training-list-error';
import { MyTrainingsComponent } from '@components/my-trainings-component';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { getInvite, getTrainingList, getTrainingPals } from '@redux/action-creators';
import { authSelector } from '@redux/slices/auth-slice';
import { jointTrainingSelector } from '@redux/slices/joint-training';
import {
    setGetTrainingListError,
    setIisModal,
    trainingSelector,
} from '@redux/slices/training-slice';
import type { MenuProps } from 'antd';
import { Badge, Menu } from 'antd';
import { Content } from 'antd/lib/layout/layout';

import './training-page.css';

export const TrainingPage = () => {
    const dispatch = useAppDispatch();
    const { token } = useSelector(authSelector);
    const { isModal } = useSelector(trainingSelector);
    const { inviteList } = useSelector(jointTrainingSelector);
    const [isModalTrainingList, setIsModalTrainingList] = useState<boolean>(isModal);
    const [current, setCurrent] = useState('Мои тренировки');

    const items: MenuProps['items'] = [
        {
            label: 'Мои тренировки',
            key: 'Мои тренировки',
            style: { order: 'inherit' },
        },
        {
            label: (
                <React.Fragment>
                    Совместные тренировки
                    <Badge count={inviteList.length} offset={[4, -5]} />
                </React.Fragment>
            ),
            key: 'Совместные тренировки',
            style: { order: 'inherit' },
        },
        {
            label: 'Марафон',
            key: 'Марафон',
            style: { order: 'inherit' },
        },
    ];

    const update = async () => {
        dispatch(setIisModal({ isModal: false }));
        try {
            await dispatch(getTrainingList(token));
        } catch {
            setIsModalTrainingList(true);
            dispatch(setIisModal({ isModal: true }));
        }
    };

    const onClick: MenuProps['onClick'] = async (e) => {
        setCurrent(e.key);
        if (e.key === 'Совместные тренировки') {
            await dispatch(getInvite(token));
            await dispatch(getTrainingPals(token));
        }
    };

    let ComponentToRender: () => JSX.Element | null = () => null;

    switch (current) {
        case 'Мои тренировки':
            ComponentToRender = MyTrainingsComponent;
            break;
        case 'Совместные тренировки':
            ComponentToRender = JointTrainingsComponent;
            break;
        case 'Марафон':
            ComponentToRender = MarathonComponent;
            break;
    }

    const handleModalToggle = () => {
        setIsModalTrainingList(false);
        dispatch(setIisModal({ isModal: false }));
        dispatch(setGetTrainingListError({ getTrainingListError: true }));
    };

    return (
        <Content className='main main-training'>
            <ModalTrainingListError
                isModalTrainingList={isModalTrainingList}
                handleModalToggle={handleModalToggle}
                update={update}
            />
            <div className='training-page'>
                <Menu
                    className='menu-training'
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
