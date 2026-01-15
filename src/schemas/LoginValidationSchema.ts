import * as yup from 'yup';

export const LoginValidationSchema = yup.object({
    email: yup
        .string()
        .required('This field is required')
        .email('Invalid email address')
        .trim(),
    password: yup
        .string()
        .required('This field is required'),
});