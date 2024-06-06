export const confirmPasswordValidator = ({
    getFieldValue,
}: {
    getFieldValue: (field: string) => string;
}) => ({
    validator(_: unknown, value: string) {
        if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
        }

        return Promise.reject(new Error('Пароли не совпадают'));
    },
});
