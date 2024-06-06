import { useSelector } from 'react-redux';
import { CardPartner } from '@components/card-partner';
import { jointTrainingSelector } from '@redux/slices/joint-training';
import { Typography } from 'antd';

import './training-partners.css';

const { Title } = Typography;

export const TrainingPartners = () => {
    const { trainingPals } = useSelector(jointTrainingSelector);

    return (
        <div className='training-partners'>
            <Title level={4} className='title'>
                {trainingPals.length > 0
                    ? 'Мои партнёры по тренировкам'
                    : 'У вас пока нет партнёров для совместных тренировок'}
            </Title>
            <div className='cards_partner'>
                {trainingPals.map((item, index) => (
                    <CardPartner
                        item={item}
                        key={`${item.id}-${item.name}`}
                        dataTestId={`joint-training-cards${index}`}
                    />
                ))}
            </div>
        </div>
    );
};
