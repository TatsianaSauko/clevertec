import { Badge } from 'antd';

import { DataItem } from '../../types/types';

import './weekly-frequent-exercises.css';

export const WeeklyFrequentExercises = ({ data, title }: { data: DataItem[]; title: string }) => (
    <div className='weekly-frequent-exercises'>
        <div className='title'>{title}</div>
        <div className='table-column'>
            {data.map((item, index) => (
                <div className='table-row ' key={item.week}>
                    <Badge
                        count={index + 1}
                        color={item.value ? 'var(--character-light-error)' : '#ffb2b3'}
                        style={{
                            transform: 'scale(0.8)',
                        }}
                    />
                    <div className='week'>{item.week}</div>
                    <div className='value'>{item.value ? item.value : ''}</div>
                </div>
            ))}
        </div>
    </div>
);
