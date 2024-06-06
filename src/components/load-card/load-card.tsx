import './load-card.css';

export const LoadCards = ({ title, value }: { title: string; value: number }) => (
    <div className='load-card'>
        <div className='load-card__value'>{value}</div>
        <div className='load-card__title'>{title}</div>
    </div>
);
