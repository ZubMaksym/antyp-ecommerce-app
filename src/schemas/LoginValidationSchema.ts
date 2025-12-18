import * as yup from 'yup';

export const LoginValidationSchema = yup.object({
    username: yup
        .string()
        .required('Це поле обов\'язкове'),
    password: yup
        .string()
        .required('Це поле обов\'язкове'),
});