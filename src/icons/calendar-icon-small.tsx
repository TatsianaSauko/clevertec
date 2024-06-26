import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';

const CalendarSmallSvg = () => (
    <svg
        viewBox='64 64 896 896'
        focusable='false'
        data-icon='calendar'
        width='12px'
        height='12px'
        fill='currentColor'
        aria-hidden='true'
        style={{ color: 'var(--primary-light-6, #2f54eb)' }}
    >
        <path
            d='M712 304c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8v-48H384v48c0 4.4-3.6 8-8 8h-56c-4.4 0-8-3.6-8-8v-48H184v136h656V256H712v48z'
            fill='currentColor'
        />
        <path
            d='M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zm0-448H184V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136z'
            fill='currentColor'
        />
    </svg>
);

export const CalendarIconSmall = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={CalendarSmallSvg} {...props} />
);
