import * as yup from 'yup';

export const CheckoutFormValidationSchema = yup.object({
    firstName: yup
        .string()
        .required(`Це поле обов'язкове`),
    lastName: yup
        .string()
        .required(`Це поле обов'язкове`),
    company: yup
        .string()
        .optional(),
    phoneNumber: yup
        .string()
        .required(`Це поле обов'язкове`)
        .matches(/^0\d{9}$/, 'Номер телефона має відповідати формату 0123456789'), 
});