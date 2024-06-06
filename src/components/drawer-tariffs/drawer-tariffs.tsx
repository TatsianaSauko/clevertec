import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    CheckCircleFilled,
    CheckCircleOutlined,
    CloseCircleOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { tariffData } from '@constants/tariff-data';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useResponsiveWidth } from '@hooks/use-responsive-width';
import { createTariff } from '@redux/action-creators';
import { authSelector } from '@redux/slices/auth-slice';
import { tariffSelector } from '@redux/slices/tariff-slice';
import { userSelector } from '@redux/slices/user-slice';
import type { RadioChangeEvent } from 'antd';
import { Button, Drawer, Radio, Row, Space } from 'antd';
import moment from 'moment';

import { DrawerTariffProps } from '../../types/props';

import './drawer-tariffs.css';

export const DrawerTariffs = ({ onClose, isDrawer, onModalPayment }: DrawerTariffProps) => {
    const dispatch = useAppDispatch();
    const { tariffList } = useSelector(tariffSelector);
    const { token } = useSelector(authSelector);
    const { user } = useSelector(userSelector);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isDestroyOnClose, setIsDestroyOnClose] = useState(false);
    const [value, setValue] = useState(undefined);
    const userTariffId = user.tariff?.tariffId;
    const modalWidth = useResponsiveWidth(360, 408);

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
        setIsDisabled(false);
    };

    const handleButtonPay = () => {
        onClose();
        if (value) {
            onModalPayment();
            setIsDestroyOnClose(true);
            dispatch(createTariff({ tariffId: tariffList._id, days: value }, token));
        }
    };

    return (
        <Drawer
            data-test-id='tariff-sider'
            title='Сравнить тарифы'
            mask={false}
            placement='right'
            className='drawer-tariff'
            onClose={onClose}
            open={isDrawer}
            closable={false}
            width={modalWidth}
            destroyOnClose={isDestroyOnClose}
            extra={
                <Space>
                    <Button
                        icon={
                            <CloseOutlined
                                style={{
                                    color: 'var(--character-light-secondary-45)',
                                    fontSize: '12px',
                                }}
                            />
                        }
                        className='btn-close'
                        onClick={onClose}
                    />
                </Space>
            }
        >
            <div className='drawer-tariff__wrapper'>
                {user.tariff?.tariffId && (
                    <div className='pro-tariff'>
                        Ваш PRO tarif активен до {moment(user.tariff?.expired).format('DD.MM')}
                    </div>
                )}
                <div className='tariff-info'>
                    <div className='tariff-info__title'>
                        <div className='title-free'>FREE</div>
                        <div className='title-pro'>
                            PRO
                            {userTariffId && (
                                <CheckCircleOutlined
                                    style={{
                                        color: 'var(--character-light-success)',
                                        fontSize: '14px',
                                        paddingLeft: '4px',
                                    }}
                                />
                            )}
                        </div>
                    </div>

                    <div className='tariff-row__wrapper'>
                        {tariffData.map((data) => (
                            <Row
                                key={data.title}
                                justify='space-between'
                                align='middle'
                                style={{ lineHeight: '18.2px' }}
                            >
                                <div className='tariff-row__title'>{data.title}</div>
                                <div className='tariff-row__buttons'>
                                    {data.isAvailableFree ? (
                                        <CheckCircleFilled style={{ fontSize: '18px' }} />
                                    ) : (
                                        <CloseCircleOutlined
                                            style={{
                                                color: 'var(--character-light-disable-25)',
                                                fontSize: '18px',
                                            }}
                                        />
                                    )}
                                    {data.isAvailablePro ? (
                                        <CheckCircleFilled style={{ fontSize: '18px' }} />
                                    ) : (
                                        <CloseCircleOutlined
                                            style={{
                                                color: 'var(--character-light-disable-25)',
                                                fontSize: '18px',
                                            }}
                                        />
                                    )}
                                </div>
                            </Row>
                        ))}
                    </div>
                </div>
                <div>
                    {!userTariffId && (
                        <div data-test-id='tariff-cost'>
                            <div className='tariff-price__title'>Стоимость тарифа</div>
                            <div className='tariff-price__wrapper'>
                                <Radio.Group onChange={onChange}>
                                    {tariffList.periods.map((period) => (
                                        <Row
                                            key={period.days}
                                            justify='space-between'
                                            align='middle'
                                            style={{ paddingTop: '5px', paddingBottom: '5px' }}
                                        >
                                            <div className='tariff-price__period'>
                                                {period.text}
                                            </div>
                                            <div className='tariff-price__info'>
                                                <div className='price'>
                                                    {period.cost.toLocaleString('ru-RU')} $
                                                </div>
                                                <Radio
                                                    data-test-id={`tariff-${period.cost}`}
                                                    value={period.days}
                                                />
                                            </div>
                                        </Row>
                                    ))}
                                </Radio.Group>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {!userTariffId && (
                <div className='drawer-footer'>
                    <Button
                        size='large'
                        data-test-id='tariff-submit'
                        disabled={isDisabled}
                        block={true}
                        onClick={handleButtonPay}
                    >
                        Выбрать и оплатить
                    </Button>
                </div>
            )}
        </Drawer>
    );
};
