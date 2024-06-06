import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { useResponsiveWidth } from '@hooks/use-responsive-width';
import { feedbackSelector, setUserFeedback } from '@redux/slices/feedback-slice';
import { Button, Form, Input, Modal, Rate } from 'antd';
import { FieldData } from 'rc-field-form/lib/interface';

import { StarFillIcon, StarIcon } from '../../icons';
import { ModalProps } from '../../types/props';
import { FormFeedback } from '../../types/types';

import './modal-feedback.css';

export const ModalFeedback = ({ isModal, handleModalToggle, handleFeedbackSubmit }: ModalProps) => {
    const dispatch = useAppDispatch();
    const { userFeedback } = useSelector(feedbackSelector);
    const [isDisabled, setIsDisabled] = useState(!userFeedback.rating);
    const [rateValue, setRateValue] = useState(userFeedback.rating);
    const modalWidth = useResponsiveWidth(328, 539);

    const onFinish = (value: FormFeedback) => {
        dispatch(setUserFeedback(value));
        handleModalToggle();
        handleFeedbackSubmit(value);
    };

    const handleFieldsChange = (changedFields: FieldData[]) => {
        if (changedFields[0]?.name[0] === 'rating') {
            setIsDisabled(!(changedFields[0]?.value > 0));
            setRateValue(changedFields[0]?.value);
        }
    };

    return (
        <Modal
            className='modal-feedback'
            title='Ваш отзыв'
            centered={true}
            open={isModal}
            width={modalWidth}
            onCancel={handleModalToggle}
            footer={null}
        >
            <Form
                name='message'
                className='form-feedback'
                initialValues={{ message: userFeedback.message }}
                onFinish={onFinish}
                onFieldsChange={(changedFields): void => {
                    handleFieldsChange(changedFields);
                }}
            >
                <Form.Item name='rating'>
                    <Rate
                        value={rateValue}
                        character={({ index }) => {
                            if (typeof index !== 'undefined') {
                                return rateValue !== 0 && index < rateValue ? (
                                    <StarFillIcon />
                                ) : (
                                    <StarIcon />
                                );
                            }

                            return null;
                        }}
                    />
                </Form.Item>
                <Form.Item name='message'>
                    <Input.TextArea
                        autoSize={{ minRows: 2 }}
                        placeholder='Расскажите, почему Вам понравилось наше приложение.'
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        block={true}
                        type='primary'
                        size='large'
                        htmlType='submit'
                        className='btn-feedback'
                        disabled={isDisabled}
                        data-test-id='new-review-submit-button'
                    >
                        Опубликовать
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};
