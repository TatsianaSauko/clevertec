import { formattedDate } from '@utils/formatted-date';
import { Rate } from 'antd';

import { StarFillIcon, StarIcon } from '../../icons';
import { CommentItemProps } from '../../types/props';

import './comment-item.css';

import avatar from '/png/avatar.png';

export const CommentItem = ({ data }: CommentItemProps) => (
    <div className='comment'>
        <div className='comment__info-author'>
            <img src={data.imageSrc ? data.imageSrc : avatar} alt='avatar' className='avatar' />
            <div className='fullName'>
                <div className='name'>
                    {data.fullName ? data.fullName.split(' ')[0] : 'Пользователь'}
                </div>
                <div className='surname'>{data.fullName && data.fullName.split(' ')[1]}</div>
            </div>
        </div>
        <div className='comment__content'>
            <div className='comment__metadata'>
                <Rate
                    value={data.rating}
                    disabled={true}
                    character={({ index }) => {
                        if (typeof index !== 'undefined') {
                            return data.rating !== 0 && index < data.rating ? (
                                <StarFillIcon />
                            ) : (
                                <StarIcon />
                            );
                        }

                        return null;
                    }}
                />
                <div className='date'>{formattedDate(data.createdAt)}</div>
            </div>
            <div className='message'>{data.message}</div>
        </div>
    </div>
);
