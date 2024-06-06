import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CheckOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { DrawerTariffs } from '@components/drawer-tariffs';
import { ModalFeedback } from '@components/modal-feedback';
import { ModalFeedbackError } from '@components/modal-feedback-error';
import { ModalFeedbackSuccess } from '@components/modal-feedback-success';
import { PaymentCheckModal } from '@components/payment-check-modal';
import { Path } from '@constants/paths';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useResponsiveVisibility } from '@hooks/use-responsive-visibility';
import { feedback, getFeedback, putUser } from '@redux/action-creators';
import { history } from '@redux/configure-store';
import { authSelector, logout } from '@redux/slices/auth-slice';
import { userSelector } from '@redux/slices/user-slice';
import { Button, Row, Switch, Tooltip, Typography } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import moment from 'moment';

import { FormFeedback } from '../../types/types';

import './settings-page.css';

import free from '/png/free.png';
import proActive from '/png/pro-able.png';
import proDisable from '/png/pro-disable.png';

const { Title } = Typography;

export const SettingsPage = () => {
    const dispatch = useAppDispatch();
    const { user } = useSelector(userSelector);
    const { token } = useSelector(authSelector);
    const [switchReadyForJointTraining, setSwitchReadyForJointTraining] = useState(
        user.readyForJointTraining,
    );
    const [switchSendNotification, setSwitchSendNotification] = useState(user.sendNotification);
    const [switchTheme, setSwitchTheme] = useState(false);
    const [isDrawer, setIsDrawer] = useState(false);
    const [isModalPayment, setIsModalPayment] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [isModalGetData, setIsModalGetData] = useState(false);
    const [isModalSuccess, setIsModalSuccess] = useState(false);
    const [isModalError, setIsModalError] = useState(false);
    const defaultVisibility = !(window.innerWidth < 576);
    const isWidth = useResponsiveVisibility(defaultVisibility);

    const switchData = [
        {
            title: 'Открыт для совместных тренировок',
            tooltip: 'включеная функция позволит участвовать в совместных тренировках',
            checked: switchReadyForJointTraining,
            disabled: false,
            switchDataTestId: 'tariff-trainings',
            iconDataTestId: 'tariff-trainings-icon',
        },
        {
            title: 'Уведомления',
            tooltip: 'включеная функция позволит получать уведомления об активностях',
            checked: switchSendNotification,
            disabled: false,
            switchDataTestId: 'tariff-notifications',
            iconDataTestId: 'tariff-notifications-icon',
        },
        {
            title: 'Тёмная тема',
            tooltip: 'темная тема доступна для PRO tarif',
            checked: switchTheme,
            disabled: !user.tariff?.tariffId,
            switchDataTestId: 'tariff-theme',
            iconDataTestId: 'tariff-theme-icon',
        },
    ];

    const onChange = async (checked: boolean, switchName: string) => {
        switch (switchName) {
            case 'Открыт для совместных тренировок': {
                setSwitchReadyForJointTraining(checked);
                const newUser1 = {
                    ...user,
                    readyForJointTraining: checked,
                };

                dispatch(putUser(newUser1, token));
                break;
            }
            case 'Уведомления': {
                setSwitchSendNotification(checked);
                const newUser2 = {
                    ...user,
                    sendNotification: checked,
                };

                dispatch(putUser(newUser2, token));
                break;
            }
            case 'Тёмная тема': {
                setSwitchTheme(checked);
                break;
            }
            default:
                break;
        }
    };

    const handleButtonClose = () => {
        setIsModalPayment(false);
        dispatch(logout());
    };

    const handleFeedbackSubmit = async (formData: FormFeedback) => {
        try {
            await dispatch(feedback(formData, token));
            setIsModalSuccess(true);
        } catch {
            setIsModalError(true);
        }
    };

    const handleModalToggle = () => {
        setIsModal(false);
        setIsModalError(false);
        if (isModalGetData) {
            setIsModalGetData(false);
            history.back();
        }
        if (isModalSuccess) {
            setIsModalSuccess(false);
            dispatch(getFeedback({ token }));
        }
    };

    const handleCreateFeedback = () => setIsModal(true);

    return (
        <Content className='main main-settings'>
            {isModal && (
                <ModalFeedback
                    isModal={isModal}
                    handleModalToggle={handleModalToggle}
                    handleFeedbackSubmit={handleFeedbackSubmit}
                />
            )}
            {isModalError && (
                <ModalFeedbackError
                    isModalError={isModalError}
                    handleModalToggle={handleModalToggle}
                    handleCreateFeedback={handleCreateFeedback}
                />
            )}
            {isModalSuccess && (
                <ModalFeedbackSuccess
                    isModalSuccess={isModalSuccess}
                    handleModalToggle={handleModalToggle}
                />
            )}
            <DrawerTariffs
                onClose={() => setIsDrawer(false)}
                isDrawer={isDrawer}
                onModalPayment={() => setIsModalPayment(true)}
            />
            <PaymentCheckModal visible={isModalPayment} onClose={handleButtonClose} />
            <div className='settings-page'>
                <div>
                    <Title level={4} className='title'>
                        Мой тариф
                    </Title>
                    <div className='tariff__wrapper'>
                        <div className='tariff-card'>
                            <div className='title-card__wrapper'>
                                <Title level={5} className='title-card'>
                                    FREE tarif
                                </Title>
                                <Button
                                    type='link'
                                    className='link'
                                    onClick={() => setIsDrawer(true)}
                                >
                                    Подробнее
                                </Button>
                            </div>
                            <img src={free} alt='tariff' className='icon-tariff' />
                            <div className='status-tariff'>
                                активен
                                <CheckOutlined style={{ paddingLeft: '9.14px' }} />
                            </div>
                        </div>
                        <div className='tariff-card' data-test-id='pro-tariff-card'>
                            <div className='title-card__wrapper'>
                                <Title level={5} className='title-card'>
                                    PRO tarif
                                </Title>
                                <Button
                                    type='link'
                                    className='link'
                                    onClick={() => setIsDrawer(true)}
                                >
                                    Подробнее
                                </Button>
                            </div>
                            <img
                                src={user.tariff?.tariffId ? proActive : proDisable}
                                alt='tariff'
                                className='icon-tariff'
                            />
                            {user.tariff?.tariffId ? (
                                <div className='status-tariff'>
                                    активен
                                    <br />
                                    до {moment(user.tariff?.expired).format('DD.MM')}
                                </div>
                            ) : (
                                <Button
                                    data-test-id='activate-tariff-btn'
                                    size='large'
                                    type='primary'
                                    className='btn-activate'
                                >
                                    Активировать
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className='switch__wrapper'>
                    {switchData.map((data) => (
                        <Row key={data.title} justify='space-between' align='middle'>
                            <div className={`switch-title ${data.disabled ? 'disabled' : ''}`}>
                                {data.title}
                                <Tooltip placement='bottomLeft' title={data.tooltip}>
                                    <ExclamationCircleOutlined
                                        data-test-id={data.iconDataTestId}
                                        style={{
                                            paddingLeft: '4px',
                                            color: 'var(--character-light-secondary-45)',
                                            fontSize: '16px',
                                        }}
                                    />
                                </Tooltip>
                            </div>
                            <Switch
                                data-test-id={data.switchDataTestId}
                                onChange={(checked) => onChange(checked, data.title)}
                                size={isWidth ? undefined : 'small'}
                                checked={data.checked}
                                disabled={data.disabled}
                            />
                        </Row>
                    ))}
                </div>
                <div className='settings-button__wrapper'>
                    <Button
                        type='primary'
                        size='large'
                        className='btn-feedback'
                        onClick={handleCreateFeedback}
                    >
                        Написать отзыв
                    </Button>
                    <Button
                        type='link'
                        size='large'
                        className='btn-collapse'
                        onClick={() => history.push(Path.Feedbacks)}
                    >
                        Смотреть все отзывы
                    </Button>
                </div>
            </div>
        </Content>
    );
};
