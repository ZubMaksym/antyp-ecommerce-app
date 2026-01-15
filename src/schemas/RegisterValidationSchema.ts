import * as yup from 'yup';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

export const RegisterValidationSchema = yup.object({
    email: yup
        .string()
        .required('This field is required')
        .email('Invalid email address')
        .trim(),
    password: yup
        .string()
        .required('This field is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /[a-z]/,
            'Password must contain at least one lowercase letter'
        )
        .matches(
            /[A-Z]/,
            'Password must contain at least one uppercase letter'
        )
        .matches(
            /\d/,
            'Password must contain at least one number'
        )
        .matches(
            /[@$!%*?&]/,
            'Password must contain at least one special character (@$!%*?&)'
        ),
    confirmPassword: yup
        .string()
        .required('This field is required')
        .oneOf([yup.ref('password')], 'Passwords must match'),
});