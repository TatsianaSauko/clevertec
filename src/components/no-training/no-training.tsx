import './no-training.css';

import noTraining from '/png/no-page.png';

export const NoTraining = ({ title }: { title: string }) => (
    <div className='no-training'>
        <img src={noTraining} alt='no Training' className='icon__no-training' />
        <h3 className='title'>{title}</h3>
    </div>
);
