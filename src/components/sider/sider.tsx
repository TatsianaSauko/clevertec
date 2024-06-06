import { useState } from 'react';
import { useSelector } from 'react-redux';
import { ModalGetDataError } from '@components/modal-get-data-error';
import { Path } from '@constants/paths';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { getTrainingList, getTrainingUser } from '@redux/action-creators';
import { history } from '@redux/configure-store';
import { authSelector, logout } from '@redux/slices/auth-slice';
import { jointTrainingSelector } from '@redux/slices/joint-training';
import { setIisModal } from '@redux/slices/training-slice';
import { Badge, Layout as AntLayout, Menu } from 'antd';

import { CalendarIcon, HeartIcon, IdCardIcon, LogoutIcon, TrophyIcon } from '../../icons';

import './sider.css';

import cleverFit from '/png/cleverFit.png';
import fit from '/png/fit.png';
import logoMobile from '/png/logoMobile.png';

const { Sider: AntSider } = AntLayout;

export const Sider = ({
    collapsed,
    toggleCollapsed,
}: {
    collapsed: boolean;
    toggleCollapsed: () => void;
}) => {
    const dispatch = useAppDispatch();
    const { token } = useSelector(authSelector);
    const { inviteList } = useSelector(jointTrainingSelector);
    const [isModalGetData, setIsModalGetData] = useState(false);
    const [collapsedWidth, setCollapsedWidth] = useState(64);
    const [width, setWidth] = useState(208);

    const handleButtonExit = () => {
        dispatch(logout());
        history.push(Path.Auth);
    };

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

    const menuItems = [
        {
            icon: <CalendarIcon />,
            link: '/calendar',
            text: 'Календарь',
            onClick: () => handleNavigation(Path.Calendar),
        },
        {
            icon: (
                <Badge
                    count={inviteList.length}
                    offset={[2, -4]}
                    data-test-id='notification-about-joint-training'
                >
                    <HeartIcon />
                </Badge>
            ),
            link: '/training',
            text: 'Тренировки',
            onClick: () => handleNavigation(Path.Training),
        },
        {
            icon: <TrophyIcon />,
            link: '/achievements',
            text: 'Достижения',
            onClick: () => handleNavigation(Path.Achievements),
        },
        {
            icon: <IdCardIcon />,
            link: '/profile',
            text: 'Профиль',
            onClick: () => history.push(Path.Profile),
        },
        {
            icon: <LogoutIcon className={collapsed ? 'icon_exit' : 'icon_exit__padding'} />,
            link: '',
            text: 'Выход',
            onClick: handleButtonExit,
        },
    ];

    return (
        <AntSider
            breakpoint='sm'
            width={width}
            collapsedWidth={collapsedWidth}
            trigger={null}
            collapsible={true}
            collapsed={collapsed}
            className='aside'
            onBreakpoint={(broken) => {
                setCollapsedWidth(broken ? 0 : 64);
                setWidth(broken ? 106 : 208);
            }}
            onCollapse={toggleCollapsed}
            {...(width === 208 ? {} : { style: { position: 'fixed', zIndex: '3' } })}
        >
            <ModalGetDataError
                isModalGetData={isModalGetData}
                handleModalToggle={() => setIsModalGetData(false)}
            />
            <div className='logo'>
                {collapsed ? (
                    <img src={fit} alt='Fit' className='logo_small' />
                ) : (
                    <img src={cleverFit} alt='CleverFit' className='logo_large' />
                )}
                <img src={logoMobile} alt='CleverFit' className='logo_mobile' />
            </div>
            <Menu className='menu' mode='inline'>
                {menuItems.map((item) => (
                    <Menu.Item
                        key={item.text}
                        icon={item.icon}
                        style={{
                            ...(collapsed && width === 208 ? {} : { paddingLeft: '16px' }),
                            ...(width === 208 ? {} : { paddingLeft: '0', paddingRight: '0' }),
                        }}
                        onClick={item.onClick}
                        data-test-id={`sidebar-${item.link.slice(1)}`}
                    >
                        <div className='link'>{item.text}</div>
                    </Menu.Item>
                ))}
            </Menu>
        </AntSider>
    );
};
