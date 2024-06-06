import { passwordValidator } from './password-validator';

export const passwordRules = [
    {
        required: true,
        message: '',
        min: 8,
    },
    passwordValidator,
];
