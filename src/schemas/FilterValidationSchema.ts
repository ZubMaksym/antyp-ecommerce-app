import * as yup from 'yup';

export const FilterValidationSchema = yup.object({
    name: yup
        .string()
        .trim()
        .min(1, 'Name is required')
        .required('Name is required'),
});

export type FilterFormFields = yup.InferType<typeof FilterValidationSchema>;
