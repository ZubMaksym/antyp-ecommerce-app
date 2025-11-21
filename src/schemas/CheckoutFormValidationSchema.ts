import * as yup from 'yup';

export const CheckoutFormValidationSchema = yup.object({
    firstName: yup
        .string()
        .required('This field is required'),
    lastName: yup
        .string()
        .required('This field is required'),
    company: yup
        .string()
        .optional(),
    phoneNumber: yup
        .string()
        .required('This field is required')
        .matches(/^0\d{9}$/, 'Phone number must start with 0 and contain 10 digits'), 
})