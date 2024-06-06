import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Path } from '@constants/paths';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { getTariffList } from '@redux/action-creators';
import { history } from '@redux/configure-store';
import { authSelector } from '@redux/slices/auth-slice';
import { Button, Layout as AntLayout, PageHeader, Typography } from 'antd';

import { SettingsIcon } from '../../icons';

import './header.css';

const { Header: AntHeader } = AntLayout;

const { Title } = Typography;

interface BreadcrumbRoute {
    path: string;
    breadcrumbName: string;
}

export const Header = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { token } = useSelector(authSelector);
    const [isTitleHeader, setIsTitleHeader] = useState(false);
    const [isWrapperTitleHeader, setIsWrapperIsTitleHeader] = useState(false);
    const [isButtonBack, setIsButtonBack] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const [isTraining, setIsTraining] = useState(false);
    const [breadcrumbRoutes, setBreadcrumbRoutes] = useState<BreadcrumbRoute[]>([]);

    useEffect(() => {
        switch (location.pathname) {
            case Path.Main:
                setIsTitleHeader(true);
                setIsWrapperIsTitleHeader(true);
                setIsButtonBack(false);
                setIsProfile(false);
                setIsTraining(false);
                setBreadcrumbRoutes([
                    {
                        path: Path.Main,
                        breadcrumbName: 'Главная',
                    },
                ]);
                break;
            case Path.Feedbacks:
                setIsWrapperIsTitleHeader(false);
                setIsButtonBack(false);
                setIsProfile(false);
                setIsTraining(false);
                setBreadcrumbRoutes([
                    {
                        path: Path.Main,
                        breadcrumbName: 'Главная',
                    },
                    {
                        path: Path.Feedbacks,
                        breadcrumbName: 'Отзывы пользователей',
                    },
                ]);
                break;
            case Path.Calendar:
                setIsWrapperIsTitleHeader(true);
                setIsTitleHeader(false);
                setIsButtonBack(false);
                setIsTraining(false);
                setBreadcrumbRoutes([
                    {
                        path: Path.Main,
                        breadcrumbName: 'Главная',
                    },
                    {
                        path: Path.Calendar,
                        breadcrumbName: 'Календарь',
                    },
                ]);
                break;
            case Path.Profile:
                setIsTitleHeader(false);
                setIsWrapperIsTitleHeader(true);
                setIsButtonBack(false);
                setIsProfile(true);
                setIsTraining(false);
                setBreadcrumbRoutes([
                    {
                        path: Path.Profile,
                        breadcrumbName: 'Профиль',
                    },
                ]);
                break;
            case Path.Settings:
                setIsTitleHeader(false);
                setIsWrapperIsTitleHeader(false);
                setIsButtonBack(true);
                setIsProfile(false);
                setIsTraining(false);
                setBreadcrumbRoutes([]);
                break;
            case Path.Training:
                setIsWrapperIsTitleHeader(true);
                setIsTitleHeader(false);
                setIsButtonBack(false);
                setIsProfile(false);
                setIsTraining(true);
                setBreadcrumbRoutes([
                    {
                        path: Path.Main,
                        breadcrumbName: 'Главная',
                    },
                    {
                        path: Path.Calendar,
                        breadcrumbName: 'Тренировки',
                    },
                ]);
                break;
            case Path.Achievements:
                setIsWrapperIsTitleHeader(true);
                setIsTitleHeader(false);
                setIsButtonBack(false);
                setIsProfile(false);
                setIsTraining(true);
                setBreadcrumbRoutes([
                    {
                        path: Path.Main,
                        breadcrumbName: 'Главная',
                    },
                    {
                        path: Path.Achievements,
                        breadcrumbName: 'Достижения',
                    },
                ]);
                break;
            default:
                break;
        }
    }, [location.pathname]);

    const handleBreadcrumbClick = (route: BreadcrumbRoute) => {
        if (route.path === Path.Main) {
            history.push(Path.Main);
        }
    };

    const handleButtonSettings = () => {
        dispatch(getTariffList(token));
        history.push(Path.Settings);
    };

    const handleBackClick = () => history.back();

    let className = 'btn-settings';

    if (isProfile) {
        className = 'btn-settings btn-settings__profile';
    } else if (isTraining) {
        className = 'btn-settings btn-settings__training';
    }

    return (
        <AntHeader className={isProfile ? 'header header-profile' : 'header'}>
            {isButtonBack ? (
                <PageHeader
                    className='site-page-header'
                    onBack={handleBackClick}
                    title={
                        <div
                            data-test-id='settings-back'
                            onClick={handleBackClick}
                            className='title-back'
                            onKeyDown={handleBackClick}
                            role='button'
                            tabIndex={0}
                        >
                            Настройки
                        </div>
                    }
                />
            ) : (
                <PageHeader
                    className='site-page-header'
                    breadcrumb={{
                        routes: breadcrumbRoutes,
                        itemRender: (route) => (
                            <span onClick={() => handleBreadcrumbClick(route)}>
                                {route.breadcrumbName}
                            </span>
                        ),
                    }}
                />
            )}
            <div className={isWrapperTitleHeader ? 'header__wrapper' : 'header__wrapper_hidden'}>
                <Title className={isTitleHeader ? 'title' : 'hidden'}>
                    Приветствуем тебя в CleverFit — приложении,
                    <br /> которое поможет тебе добиться своей мечты!
                </Title>
                <Button
                    data-test-id='header-settings'
                    icon={<SettingsIcon style={isProfile ? { fontSize: '14px' } : {}} />}
                    size={isProfile ? undefined : 'large'}
                    className={className}
                    onClick={handleButtonSettings}
                >
                    Настройки
                </Button>
            </div>
        </AntHeader>
    );
};
