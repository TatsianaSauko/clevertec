import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { DailyLoadList } from '@components/daily-load-list';
import { useResponsiveVisibility } from '@hooks/use-responsive-visibility';
import { groupByWeeks } from '@utils/loadсalculations';
import { Collapse } from 'antd';

import { DataCart } from '../../types/types';

import './monthly-load-list.css';

const { Panel } = Collapse;

type WeeksData = Map<string, DataCart[]>;

const customExpandIcon = ({ isActive }: { isActive: boolean }) =>
    isActive ? <UpOutlined style={{ right: 2 }} /> : <DownOutlined style={{ right: 2 }} />;

export const MonthlyLoadList = ({ averageLoadList }: { averageLoadList: DataCart[] }) => {
    const defaultVisibility = !(window.innerWidth < 576);
    const isDesktopView = useResponsiveVisibility(defaultVisibility);
    const groupedData: WeeksData = groupByWeeks(averageLoadList);

    return (
        <div className='monthly-load-list'>
            {Array.from(groupedData).map(([weekRange, dataCart], index) => (
                <Collapse
                    key={weekRange}
                    expandIcon={({ isActive }) => customExpandIcon({ isActive: isActive ?? false })}
                    ghost={true}
                    expandIconPosition='end'
                    defaultActiveKey={isDesktopView ? [index.toString()] : undefined}
                >
                    <Panel
                        header={weekRange}
                        key={index}
                        style={{ width: 168 }}
                        showArrow={!isDesktopView}
                    >
                        <DailyLoadList dataCart={dataCart} />
                    </Panel>
                </Collapse>
            ))}
        </div>
    );
};
