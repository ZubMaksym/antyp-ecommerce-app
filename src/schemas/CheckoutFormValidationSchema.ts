import * as yup from 'yup';
import { operatorCodes } from '@/utils/data';

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
      'Номер телефона має відповідати формату +38 (012) 345-67-89',
      (value) => {
        return /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value);
      }
    ).test(
      'is-valid-operator-code',
      'Неправильний код оператора',
      (value) => {
        const operatorCode = value.slice(5, 8);
        return operatorCodes.includes(operatorCode);
      }
    )
});