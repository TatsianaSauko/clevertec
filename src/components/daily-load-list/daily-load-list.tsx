import { Badge } from 'antd';

import { DailyLoadListProps } from '../../types/types';

import './daily-load-list.css';

export const DailyLoadList = ({ title, dataCart }: DailyLoadListProps) => (
    <div className='daily-load-list'>
        <div className='title'>{title}</div>
        <div className='table-column'>
            {dataCart.map((item, index) => (
                <div className='table-row ' key={`${item.day}-${index}`}>
                    <Badge
                        count={index + 1}
                        color={item.weight ? 'var(--primary-light-6)' : 'var(--primary-light-1)'}
                        style={{
                            color: item.weight
                                ? 'var(--primary-light-1)'
                                : 'var(--primary-light-6)',
                            transform: 'scale(0.8)',
                        }}
                    />
                    <div className='day'>{item.day}</div>
                    <div className='value'>{item.weight ? `${item.weight} кг` : ''}</div>
                </div>
            ))}
        </div>
    </div>
);
