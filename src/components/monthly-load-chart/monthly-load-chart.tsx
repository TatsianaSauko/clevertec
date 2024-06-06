import { Column } from '@ant-design/charts';
import { useResponsiveVisibility } from '@hooks/use-responsive-visibility';

import { DataCart } from '../../types/types';

export const MonthlyLoadChart = ({ dataCart }: { dataCart: DataCart[] }) => {
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
        scrollbar: {
            x: {
                ratio: isDesktopView ? 0.55 : 0.25,
            },
        },
        height: isDesktopView ? 374 : 236,
        sizeField: isDesktopView ? 30 : 18.92,
        style: {
            fill: '#85A5FF',
        },
    };

    return <Column {...config} />;
};
