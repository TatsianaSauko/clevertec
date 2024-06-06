import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { setExercises } from '@redux/slices/training-slice';
import { Checkbox, Form, Input } from 'antd';
import { FieldData } from 'rc-field-form/lib/interface';

import { FormAddTrainingProps } from '../../types/props';

import './form-add-training.css';

export const FormAddTraining = ({ item, index }: FormAddTrainingProps) => {
    const dispatch = useAppDispatch();

    const handleFieldsChange = (allFields: FieldData[]) => {
        const nameFieldValue = allFields.find((field) => field.name[0] === 'name')?.value;
        const replaysFieldValue = allFields.find((field) => field.name[0] === 'replays')?.value;
        const weightFieldValue = allFields.find((field) => field.name[0] === 'weight')?.value;
        const approachesFieldValue = allFields.find(
            (field) => field.name[0] === 'approaches',
        )?.value;
        const checkedValue = allFields.find((field) => field.name[0] === 'checked')?.value;

        dispatch(
            setExercises({
                exercise: {
                    _id: item._id,
                    name: nameFieldValue,
                    replays: replaysFieldValue,
                    weight: weightFieldValue,
                    approaches: approachesFieldValue,
                    isImplementation: false,
                    checked: checkedValue,
                },
                index,
            }),
        );
    };

    return (
        <Form
            className='form-add-training'
            layout='vertical'
            onFieldsChange={(_, allFields): void => {
                handleFieldsChange(allFields);
            }}
            size='small'
            initialValues={{
                approaches: item.approaches,
                name: item.name,
                replays: item.replays,
                weight: item.weight,
                checked: item.checked,
            }}
        >
            <div className='name__wrapper'>
                <Form.Item name='name' className='name'>
                    <Input
                        addonBefore=''
                        placeholder='Упражнение'
                        data-test-id={`modal-drawer-right-input-exercise${index}`}
                    />
                </Form.Item>
                <Form.Item name='checked' valuePropName='checked'>
                    <Checkbox
                        className='checkbox'
                        data-test-id={`modal-drawer-right-checkbox-exercise${index}`}
                    />
                </Form.Item>
            </div>

            <div className='form__wrapper'>
                <Form.Item label='Подходы' name='approaches'>
                    <Input
                        placeholder='1'
                        addonBefore='+'
                        data-test-id={`modal-drawer-right-input-approach${index}`}
                    />
                </Form.Item>
                <div className='form__block'>
                    <Form.Item label='Вес, кг' name='weight'>
                        <Input
                            placeholder='0'
                            data-test-id={`modal-drawer-right-input-weight${index}`}
                        />
                    </Form.Item>
                    <div className='icon'>x</div>
                    <Form.Item label='Количество' name='replays'>
                        <Input
                            placeholder='1'
                            data-test-id={`modal-drawer-right-input-quantity${index}`}
                        />
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};
