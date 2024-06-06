import { Rule } from 'antd/lib/form';

export const emailRules: Rule[] = [
    {
        type: 'email',
        message: '',
    },
    {
        required: true,
        message: 'Введите валидный E-mail',
    },
];
