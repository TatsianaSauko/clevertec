import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import './upload-button.css';

export const UploadButton = () => (
    <div>
        <div className='upload-button'>
            <PlusOutlined />
            <div
                style={{
                    width: '70px',
                    lineHeight: '18.2px',
                    color: 'var(--character-light-secondary-45)',
                }}
            >
                Загрузить фото профиля
            </div>
        </div>
        <div className='upload-button-mobile'>
            <div className='title'>Загрузить фото профиля</div>
            <Button icon={<UploadOutlined />}>Загрузить</Button>
        </div>
    </div>
);
