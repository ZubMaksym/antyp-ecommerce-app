import * as yup from 'yup';

export const PackagingsValidationSchema = yup.object({
    name: yup
        .string()
        .trim()
        .min(3, 'Name must be at least 3 characters')
        .required('Name is required'),
    shortName: yup
        .string()
        .trim()
        .optional()
        .nullable(),
});

export type PackagingsFormFields = yup.InferType<typeof PackagingsValidationSchema>;
