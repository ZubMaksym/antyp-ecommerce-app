import * as yup from 'yup';

// Нормалізація перед валідацією
const normalizePhoneForValidation = (value: string) => {
  return value.replace(/\D/g, ''); // залишаємо тільки цифри
};

export const CheckoutFormValidationSchema = yup.object({
  firstName: yup
    .string()
    .required(`Це поле обов'язкове`),
  lastName: yup
    .string()
    .required(`Це поле обов'язкове`),
  phoneNumber: yup
    .string()
    .required(`Це поле обов'язкове`)
    .test(
      'is-valid-phone',
      'Номер телефона має відповідати формату 0123456789',
      (value) => {
        const digits = value ? normalizePhoneForValidation(value) : '';
        return /^0\d{9}$/.test(digits);
      }
    ),
});