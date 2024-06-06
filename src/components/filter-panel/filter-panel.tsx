import { useDispatch, useSelector } from 'react-redux';
import { achievementSelector, setSelectedTags } from '@redux/slices/achievements-slice';
import { trainingSelector } from '@redux/slices/training-slice';
import { getTagStyle } from '@utils/get-tag-style';
import { Tag } from 'antd';

import './filter-panel.css';

const { CheckableTag } = Tag;

export const FilterPanel = () => {
    const dispatch = useDispatch();
    const { trainingList } = useSelector(trainingSelector);
    const { selectedTags } = useSelector(achievementSelector);

    const handleChange = (tag: string, checked: boolean) => {
        let nextSelectedTags: string;

        if (checked) {
            nextSelectedTags = tag;
        } else {
            nextSelectedTags = '';
        }
        dispatch(setSelectedTags(nextSelectedTags));
    };

    return (
        <div className='filter-panels'>
            <div style={{ minWidth: 118 }}>Тип тренировки:</div>
            <div className='tags__wrapper'>
                <CheckableTag
                    key='Все'
                    checked={selectedTags.includes('Все')}
                    onChange={(checked) => handleChange('Все', checked)}
                    style={getTagStyle('Все', selectedTags)}
                >
                    Все
                </CheckableTag>
                {trainingList.length > 0 &&
                    trainingList.map((tag) => (
                        <CheckableTag
                            key={tag.name}
                            checked={selectedTags.indexOf(tag.name) > -1}
                            onChange={(checked) => handleChange(tag.name, checked)}
                            style={getTagStyle(tag.name, selectedTags)}
                        >
                            {tag.name}
                        </CheckableTag>
                    ))}
            </div>
        </div>
    );
};
