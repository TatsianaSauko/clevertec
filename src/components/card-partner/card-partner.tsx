import { useState } from 'react';
import { ModalCardPartner } from '@components/modal-card-partner';
import { Avatar } from 'antd';

import { TrainingPals } from '../../types/types';

import './card-partner.css';

export const CardPartner = ({ item, dataTestId }: { item: TrainingPals; dataTestId: string }) => {
    const [isModal, setIsModal] = useState(false);

    const handleCardClick = () => setIsModal(true);

    const onClose = () => setIsModal(false);

    return (
        <div
            className='card-partner'
            data-test-id={dataTestId}
            onClick={handleCardClick}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    handleCardClick();
                }
            }}
            role='button'
            tabIndex={0}
        >
            {isModal && <ModalCardPartner item={item} onClose={onClose} />}
            <div className='card-partner__header'>
                <Avatar
                    src={item.imageSrc}
                    size='large'
                    style={{ width: '42px', height: '42px' }}
                />
                <div className='name'>{item.name}</div>
            </div>
            <div className='card-partner__details'>
                <div className='type__wrapper'>
                    <div className='type'>Тип тренировки:</div>
                    <div className='type'>Средняя нагрузка:</div>
                </div>
                <div className='value__wrapper'>
                    <div className='value'>{item.trainingType}</div>
                    <div className='value'>{item.avgWeightInWeek} кг/нед</div>
                </div>
            </div>
        </div>
    );
};
