import { PickerLocale } from 'antd/lib/date-picker/generatePicker';
import TimePickerLocale from 'antd/lib/time-picker/locale/ru_RU';
import moment from 'moment';
import CalendarLocale from 'rc-picker/lib/locale/ru_RU';

moment.locale('ru', {
    week: {
        dow: 1,
    },
});

export const locale: PickerLocale = {
    lang: {
        placeholder: 'Выберите дату',
        yearPlaceholder: 'Выберите год',
        quarterPlaceholder: 'Выберите квартал',
        monthPlaceholder: 'Выберите месяц',
        weekPlaceholder: 'Выберите неделю',
        rangePlaceholder: ['Начальная дата', 'Конечная дата'],
        rangeYearPlaceholder: ['Начальный год', 'Год окончания'],
        rangeMonthPlaceholder: ['Начальный месяц', 'Конечный месяц'],
        rangeWeekPlaceholder: ['Начальная неделя', 'Конечная неделя'],
        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        shortMonths: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт',
            'Ноя',
            'Дек',
        ],
        yearFormat: '',
        dayFormat: '',
        dateFormat: '',
        dateTimeFormat: '',
        ...CalendarLocale,
    },
    timePickerLocale: {
        ...TimePickerLocale,
    },
};
