export const passwordValidator = {
    validator: (_: unknown, value: string) => {
        if (!value) {
            return Promise.resolve();
        }
        const hasUppercase = /[A-Z]/.test(value);
        const hasDigit = /\d/.test(value);
        const hasSpecialCharacter = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(value);

        if (hasUppercase && hasDigit && !hasSpecialCharacter) {
            return Promise.resolve();
        }

        return Promise.reject(new Error('Пароль не менее 8 символов, c заглавной буквой и цифрой'));
    },
};
