import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card } from '@components/card';
import { ModalGetDataError } from '@components/modal-get-data-error';
import { Path } from '@constants/paths';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { getTrainingList, getTrainingUser } from '@redux/action-creators';
import { history } from '@redux/configure-store';
import { authSelector } from '@redux/slices/auth-slice';
import { setIisModal } from '@redux/slices/training-slice';
import { Button, Divider, Layout } from 'antd';

import {
    AndroidIcon,
    AppleIcon,
    CalendarIconSmall,
    HeartIconSmall,
    IdCardIconSmall,
} from '../../icons';

import './main-page.css';

const { Content } = Layout;

export const MainPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { token } = useSelector(authSelector);
    const [isModalGetData, setIsModalGetData] = useState(false);

    const handleNavigation = async (path: string) => {
        try {
            await dispatch(getTrainingUser(token));
            try {
                await dispatch(getTrainingList(token));
            } catch {
                dispatch(setIisModal({ isModal: true }));
            } finally {
                history.push(path);
            }
        } catch {
            setIsModalGetData(true);
        }
    };

    const CARDS_DATA = [
        {
            key: '1',
            title: 'Расписать тренировки',
            link: 'Тренировки',
            icon: <HeartIconSmall />,
            onClick: () => handleNavigation(Path.Training),
        },
        {
            key: '2',
            title: 'Назначить календарь',
            link: 'Календарь',
            icon: <CalendarIconSmall />,
            onClick: () => handleNavigation(Path.Calendar),
        },
        {
            key: '3',
            title: 'Заполнить профиль',
            link: 'Профиль',
            icon: <IdCardIconSmall />,
            onClick: () => history.push(Path.Profile),
        },
    ];

    return (
        <Content className='main'>
            <ModalGetDataError
                isModalGetData={isModalGetData}
                handleModalToggle={() => setIsModalGetData(false)}
            />
            <div className='main__skills'>
                C CleverFit ты сможешь: <br />— планировать свои тренировки на календаре, выбирая
                тип и уровень нагрузки;
                <br /> — отслеживать свои достижения в разделе статистики, сравнивая свои результаты
                c нормами и рекордами; <br />— создавать свой профиль, где ты можешь загружать свои
                фото, видео и отзывы o тренировках; <br />— выполнять расписанные тренировки для
                разных частей тела, следуя подробным инструкциям и советам профессиональных
                тренеров.
            </div>
            <div className='main__subtitle'>
                CleverFit — это не просто приложение, a твой личный помощник в мире фитнеса. He
                откладывай на завтра — начни тренироваться уже сегодня!
            </div>
            <div className='main__cards'>
                <div className='cards__wrapper'>
                    {CARDS_DATA.map((card) => (
                        <Card
                            title={card.title}
                            link={card.link}
                            icon={card.icon}
                            key={card.key}
                            onClick={card.onClick}
                        />
                    ))}
                </div>
            </div>
            <div className='main-bottom'>
                <div
                    className='review__btn'
                    onClick={() => history.push(Path.Feedbacks)}
                    data-test-id='see-reviews'
                    onKeyDown={() => history.push(Path.Feedbacks)}
                    tabIndex={0}
                    role='button'
                >
                    Смотреть отзывы
                </div>
                <div className='block-download'>
                    <div className='block-download__info'>
                        <div className='info__title'>Скачать на телефон</div>
                        <div className='info__subtitle'>Доступно в PRO-тарифе</div>
                    </div>
                    <Divider className='divider' />
                    <div className='block-download__buttons'>
                        <Button icon={<AndroidIcon />} block={true} className='btn-download'>
                            Android OS
                        </Button>
                        <Button icon={<AppleIcon />} block={true} className='btn-download'>
                            Apple iOS
                        </Button>
                    </div>
                </div>
            </div>
        </Content>
    );
};
