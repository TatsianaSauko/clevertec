import { useState } from 'react';
import { useSelector } from 'react-redux';
import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { ModalInfoTraining } from '@components/modal-info-training';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useResponsiveVisibility } from '@hooks/use-responsive-visibility';
import { useWindowSize } from '@hooks/use-window-size';
import { cleanTraining, setTraining, trainingSelector } from '@redux/slices/training-slice';
import { getTrainingColor } from '@utils/get-color-for-name';
import { Badge, Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { TableTrainingsProps } from '../../types/props';
import { ActivityData, Parameters } from '../../types/types';

import './table-trainings.css';

export const TableTrainings = ({ onClick }: TableTrainingsProps) => {
    const dispatch = useAppDispatch();
    const { activitiesData } = useSelector(trainingSelector);
    const [isModal, setIsModal] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const defaultVisibility = !(window.innerWidth < 576);
    const isDesktopView = useResponsiveVisibility(defaultVisibility);
    const windowSize = useWindowSize();
    let column1Width;

    if (windowSize > 1024) {
        column1Width = 259;
    } else if (windowSize > 768) {
        column1Width = 234;
    } else {
        column1Width = 116;
    }

    const handleButtonEdit = (record: ActivityData) => {
        dispatch(setTraining({ training: record }));
        onClick('Редактирование');
    };

    const handleButtonNewTraining = () => {
        dispatch(cleanTraining());
        onClick('Добавление упражнений');
    };

    const columns: ColumnsType<ActivityData> = [
        {
            title: 'Тип тренировки',
            dataIndex: 'name',
            key: 'name',
            width: column1Width,
            render: (text: string, record: ActivityData) => {
                const color = getTrainingColor(text);
                const handleButtonClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                    const rect = event.currentTarget.getBoundingClientRect();

                    dispatch(setTraining({ training: record }));
                    setModalPosition({
                        top: rect.top,
                        left: rect.left,
                    });
                    setIsModal(true);
                };

                return (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: `${isDesktopView}px`,
                        }}
                    >
                        <Badge color={color} text={text} />
                        <Button
                            type='text'
                            onClick={handleButtonClick}
                            icon={<DownOutlined style={{ fontSize: '12px' }} />}
                        />
                    </div>
                );
            },
        },
        {
            title: '',
            dataIndex: 'spacerColumn2',
            key: 'spacerColumn2',
            width: 12,
            render: () => <div style={{ border: 'none', width: '12px' }} />,
        },
        {
            title: 'Периодичность',
            dataIndex: 'parameters',
            key: 'period',
            width: isDesktopView ? 240 : 134,

            render: (parameters: Parameters) => {
                let periodText;

                if (parameters.period === null) periodText = '';
                else if (parameters.period === 7) periodText = '1 раз в неделю';
                else
                    switch (parameters.period) {
                        case 1:
                            periodText = 'Через 1 день';
                            break;
                        case 2:
                        case 3:
                        case 4:
                            periodText = `Через ${parameters.period} дня`;
                            break;
                        default:
                            periodText = `Через ${parameters.period} дней`;
                    }

                return <div style={{ width: isDesktopView ? '240px' : '134px' }}>{periodText}</div>;
            },
            sorter: (a: ActivityData, b: ActivityData) => {
                const periodA = a.parameters?.period ?? 8;
                const periodB = b.parameters?.period ?? 8;

                if (periodA === null) return -1;
                if (periodB === null) return 1;
                if (periodA === 7) return 1;
                if (periodB === 7) return -1;

                return periodB - periodA;
            },
        },
        {
            title: '',
            dataIndex: 'spacerColumn4',
            key: 'spacerColumn4',
            width: 12,
            render: () => <div style={{ width: '12px' }} />,
        },
        {
            title: '',
            dataIndex: 'spacerColumn5',
            key: 'action',
            width: 32,
            render: (_: string, record: ActivityData, index: number) => (
                <Button
                    data-test-id={`update-my-training-table-icon${index}`}
                    className='table-edit'
                    onClick={() => handleButtonEdit(record)}
                    icon={
                        <EditOutlined
                            style={{
                                color: record.isImplementation
                                    ? 'var(--character-light-secondary-25)'
                                    : 'var(--primary-light-6)',
                                fontSize: '25px',
                            }}
                        />
                    }
                    disabled={record.isImplementation}
                    style={{ width: '32px' }}
                />
            ),
        },
    ];

    const handleButtonBack = () => setIsModal(false);

    return (
        <div className='table-training__wrapper'>
            {isModal && (
                <ModalInfoTraining
                    backClick={handleButtonBack}
                    position={modalPosition}
                    // onDrawer={() => setIsModal(false)}
                    onClick={() => onClick('Редактирование')}
                />
            )}
            <Table
                data-test-id='my-trainings-table'
                rowKey={(record) => record._id || 'default'}
                dataSource={activitiesData}
                columns={columns}
                pagination={{ pageSize: 10 }}
                size='small'
                className='table-training'
            />
            <Button
                size='large'
                type='primary'
                className='btn-create'
                onClick={handleButtonNewTraining}
                data-test-id='create-new-training-button'
            >
                + Новая тренировка
            </Button>
        </div>
    );
};
