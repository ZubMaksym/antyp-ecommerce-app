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
        .nullable()
        .notRequired(),
});

export type PackagingsFormFields = {
    name: string;
    shortName?: string | null | undefined;
};
