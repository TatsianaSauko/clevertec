import { Pie } from '@ant-design/plots';
import {
    useResponsiveVisibility,
    useResponsiveVisibility900,
} from '@hooks/use-responsive-visibility';

import { ResItem } from '../../types/types';

export const ExercisePercentageChart = ({ data }: { data: ResItem[] }) => {
    const defaultDesktopVisibility = !(window.innerWidth < 900);
    const isDesktopView = useResponsiveVisibility900(defaultDesktopVisibility);

    const defaultMobileVisibility = !(window.innerWidth < 576);
    const isMobileView = useResponsiveVisibility(defaultMobileVisibility);

    const config = {
        data,
        angleField: 'value',
        colorField: 'type',
        innerRadius: 0.7,

        label: {
            text: 'type',
            position: 'outside',
            style: {
                fontSize: isDesktopView ? 14 : 12,
            },
            connector: false,
        },

        width: isMobileView ? 520 : 328,
        height: isDesktopView ? 185 : 190,
        style: {
            textAlign: 'center',
        },
        legend: false,
    };

    return <Pie {...config} />;
};
