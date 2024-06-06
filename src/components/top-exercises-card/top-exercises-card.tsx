import './top-exercises-card.css';

export const TopExercisesCard = ({ title, value }: { title: string; value: string }) => (
    <div className='top-exercises-card'>
        <div className='title'>{title.toLocaleLowerCase()}</div>
        <div className='value'>{value.toLocaleLowerCase()}</div>
    </div>
);
