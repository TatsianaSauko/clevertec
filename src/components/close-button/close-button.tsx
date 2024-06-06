import { CloseOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';

import { CloseButtonProps } from '../../types/props';

export const CloseButton = ({ onClose }: CloseButtonProps) => (
    <Space>
        <Button
            icon={
                <CloseOutlined
                    style={{
                        color: 'var(--character-light-secondary-45)',
                        fontSize: '12px',
                    }}
                />
            }
            className='btn-close'
            data-test-id='modal-drawer-right-button-close'
            onClick={onClose}
        />
    </Space>
);
