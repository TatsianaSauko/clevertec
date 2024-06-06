import { useState } from 'react';
import { useSelector } from 'react-redux';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { CardMessage } from '@components/card-message';
import { jointTrainingSelector } from '@redux/slices/joint-training';
import { Button } from 'antd';

import './messages-component.css';

export const MessagesComponent = () => {
    const { inviteList } = useSelector(jointTrainingSelector);
    const [showAll, setShowAll] = useState(false);

    const handleShowAllClick = () => setShowAll(true);

    const handleHiddenAllClick = () => setShowAll(false);

    return (
        <div className='messages-component'>
            <div className='title'>Новое сообщение ({inviteList.length})</div>
            <div className='cards-message__wrapper'>
                {(showAll ? inviteList : [inviteList[0]]).map((item) => (
                    <CardMessage item={item} key={item._id} />
                ))}
            </div>

            {inviteList.length > 1 &&
                (showAll ? (
                    <Button type='link' onClick={handleHiddenAllClick} className='btn_show-message'>
                        <UpOutlined style={{ fontSize: '8px', paddingRight: '2px' }} />
                        Скрыть все сообщения
                    </Button>
                ) : (
                    <Button type='link' onClick={handleShowAllClick} className='btn_show-message'>
                        <DownOutlined style={{ fontSize: '8px', paddingRight: '2px' }} />
                        Показать все сообщения
                    </Button>
                ))}
        </div>
    );
};
