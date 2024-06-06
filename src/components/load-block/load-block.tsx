import { DailyLoadList } from '@components/daily-load-list';
import { LoadChart } from '@components/load-chart';
import { formatDate, sortAndFormatDays, sortDataByDate } from '@utils/loadсalculations';

import { DataLoad } from '../../types/types';

import './load-block.css';

export const LoadBlock = ({ dataLoad }: { dataLoad: DataLoad[] }) => {
    const dailyLoadList = sortAndFormatDays(dataLoad);
    let dataCart = sortDataByDate(dataLoad);

    dataCart = formatDate(dataLoad);

    return (
        <div className='load-block'>
            <LoadChart dataCart={dataCart} />
            <DailyLoadList title='Средняя нагрузка по дням недели' dataCart={dailyLoadList} />
        </div>
    );
};
