import { confirmPasswordValidator } from './confirm-password-validator';

export const confirmPasswordRules = [
    {
        required: true,
        message: '',
    },
    confirmPasswordValidator,
];
