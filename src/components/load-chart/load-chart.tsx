import { Column } from '@ant-design/charts';
import { useResponsiveVisibility } from '@hooks/use-responsive-visibility';

import { DataCart } from '../../types/types';

import './load-chart.css';

export const LoadChart = ({ dataCart }: { dataCart: DataCart[] }) => {
    const defaultVisibility = !(window.innerWidth < 576);
    const isDesktopView = useResponsiveVisibility(defaultVisibility);

    const config = {
        data: dataCart,
        xField: 'day',
        yField: 'weight',
        axis: {
            x: {
                title: 'Нагрузка, кг',
                style: { titleFontSize: isDesktopView ? 14 : 8.83 },
                tick: false,
                labelSpacing: 15.75,
                labelFontSize: isDesktopView ? 12 : 7.57,
            },
            y: {
                labelFormatter: (v: number) => `${v} кг`,
                tick: false,
                labelFontSize: isDesktopView ? 12 : 7.57,
            },
        },
        width: isDesktopView ? 520 : 328,
        height: isDesktopView ? 367 : 236,
        sizeField: isDesktopView ? 30 : 18.92,
        style: {
            fill: '#85A5FF',
        },
    };

    return <Column {...config} className='load-chart' />;
};
