import { Alert } from 'antd';

import { ModalAlertProps } from '../../types/props';

import './modal-alert.css';

export const ModalAlert = ({ message, onClose }: ModalAlertProps) => (
    <div className='alert-wrapper'>
        <Alert
            data-test-id='create-training-success-alert'
            className='alert'
            message={message}
            type='success'
            showIcon={true}
            closable={true}
            onClose={onClose}
        />
    </div>
);
