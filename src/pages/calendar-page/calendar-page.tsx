import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CalendarCell } from '@components/calendar-cell';
import { ModalEdit } from '@components/modal-edit';
import { ModalTraining } from '@components/modal-training';
import { ModalTrainingListError } from '@components/modal-training-list-error';
import { MyDrawer } from '@components/my-drawer';
import { locale } from '@constants/calendar-locale';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useResponsiveVisibility } from '@hooks/use-responsive-visibility';
import { getTrainingList } from '@redux/action-creators';
import { authSelector } from '@redux/slices/auth-slice';
import {
    cleanTraining,
    setActivitiesData,
    setDateTraining,
    setFlag,
    setIisModal,
    setTraining,
    setTrainingFull,
    trainingSelector,
} from '@redux/slices/training-slice';
import { filterEmptyExercises } from '@utils/filter-eprty-exercises';
import { isPastDate } from '@utils/past-date';
import { Calendar } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import type { Moment } from 'moment';
import moment from 'moment';

import './calendar-page.css';

export const CalendarPage = () => {
    const dispatch = useAppDispatch();
    const { token } = useSelector(authSelector);
    const { training, isModal } = useSelector(trainingSelector);
    const [isModalTrainingList, setIsModalTrainingList] = useState<boolean>(isModal);
    const [isDrawer, setIsDrawer] = useState(false);
    const [modalTraining, setModalTraining] = useState(false);
    const [modalTrainingEdit, setModalTrainingEdit] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const defaultVisibility = !(window.innerWidth < 576);
    const modalVisible = useResponsiveVisibility(defaultVisibility);

    const update = async () => {
        dispatch(setIisModal({ isModal: false }));
        try {
            await dispatch(getTrainingList(token));
        } catch {
            setIsModalTrainingList(true);
            dispatch(setIisModal({ isModal: true }));
        }
    };

    const handleDateClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const cellRect = e.currentTarget.getBoundingClientRect();

        setModalPosition({
            top: cellRect.top,
            left: cellRect.left,
        });
        setModalTraining(true);
    };

    const handleSelectClick = (data: Moment) => {
        dispatch(setDateTraining({ date: data.toISOString() }));
        dispatch(cleanTraining());
        const isCurrentMonth = moment(data).isSame(moment(), 'month');

        dispatch(setFlag({ flag: isPastDate(data) }));
        if (!modalVisible && isCurrentMonth) {
            setModalPosition({
                top: 265,
                left: 24 + 8,
            });
            setModalTraining(true);
        }
    };

    const handleModalToggle = () => {
        setIsModalTrainingList(false);
        dispatch(setIisModal({ isModal: false }));
        dispatch(setActivitiesData({ activitiesData: [] }));
    };

    const closeModals = () => {
        setModalTrainingEdit(false);
        setModalTraining(false);
    };

    const closeDrawer = () => {
        setIsDrawer(false);
        if (training.exercises.length !== 1) {
            const resFilter = filterEmptyExercises(training);

            if (resFilter.exercises.length === 0) {
                dispatch(setTrainingFull());
            } else {
                dispatch(setTraining({ training: resFilter }));
            }
        }
    };

    const handleButtonBack = () => {
        setModalTrainingEdit(false);
        setModalTraining(true);
    };

    return (
        <Content className='main calendar-page'>
            <MyDrawer onClose={closeDrawer} isDrawer={isDrawer} />
            <ModalTrainingListError
                isModalTrainingList={isModalTrainingList}
                handleModalToggle={handleModalToggle}
                update={update}
            />

            <Calendar
                fullscreen={modalVisible}
                locale={locale}
                onSelect={handleSelectClick}
                dateCellRender={(value) => (
                    <div onClick={handleDateClick} className='cell'>
                        <CalendarCell value={value} />
                    </div>
                )}
            />
            {modalTraining ? (
                <ModalTraining
                    onCancel={() => setModalTraining(false)}
                    position={modalPosition}
                    click={() => setModalTrainingEdit(true)}
                />
            ) : null}
            {modalTrainingEdit ? (
                <ModalEdit
                    backClick={handleButtonBack}
                    position={modalPosition}
                    modalAddTraining={() => setIsDrawer(true)}
                    closeModals={closeModals}
                />
            ) : null}
        </Content>
    );
};
