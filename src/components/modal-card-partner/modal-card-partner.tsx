import { useSelector } from 'react-redux';
import { CheckCircleFilled, CloseOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { deleteInvite } from '@redux/action-creators';
import { authSelector } from '@redux/slices/auth-slice';
import {
    removeInvite,
    removeTrainingPal,
    setIsTrainingPartnerFinderComponent,
} from '@redux/slices/joint-training';
import { Avatar, Button } from 'antd';

import { ModalCardPartnerProps } from '../../types/props';

import './modal-card-partner.css';

export const ModalCardPartner = ({ item, onClose }: ModalCardPartnerProps) => {
    const dispatch = useAppDispatch();
    const { token } = useSelector(authSelector);

    const handleButtonCancel = async () => {
        dispatch(setIsTrainingPartnerFinderComponent({ isTrainingPartnerFinderComponent: true }));
        await dispatch(deleteInvite(token, item.inviteId));
        dispatch(removeInvite({ inviteId: item.inviteId }));
        dispatch(removeTrainingPal({ palId: item.id }));
        onClose();
    };

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        onClose();
    };

    return (
        <div className='modal-card-partner' data-test-id='partner-modal'>
            <div className='modal-card-partner__content'>
                <Button
                    type='text'
                    style={{ position: 'absolute', top: '16px', right: '10px' }}
                    onClick={handleClick}
                >
                    <CloseOutlined style={{ color: 'var(--character-light-secondary-45)' }} />
                </Button>

                <div className='wrapper'>
                    <div className='modal-card-partner__header'>
                        <Avatar
                            src={item.imageSrc}
                            size='large'
                            style={{ width: '42px', height: '42px' }}
                        />
                        <div className='name'>{item.name}</div>
                    </div>
                    <div className='modal-card-partner__details'>
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

                <div className='wrapper'>
                    <div className='message'>
                        тренировка одобрена
                        <CheckCircleFilled
                            style={{
                                color: 'var(--character-light-success)',
                                fontSize: '14px',
                                paddingLeft: '9px',
                            }}
                        />
                    </div>
                    <Button
                        size='large'
                        className='btn__cancel-training'
                        onClick={handleButtonCancel}
                    >
                        Отменить тренировку
                    </Button>
                </div>
            </div>
        </div>
    );
};
