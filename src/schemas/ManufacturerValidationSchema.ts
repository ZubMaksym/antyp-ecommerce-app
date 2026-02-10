import * as yup from 'yup';

export const ManufacturerValidationSchema = yup.object({
    name: yup
        .string()
        .trim()
        .min(3, 'Name must be at least 3 characters')
        .required('Name is required'),
    shortName: yup
        .string()
        .trim()
        .min(3, 'Short name must be at least 3 characters')
        .required('Short name is required'),
    // Optional field – may be empty. When provided, it should be a valid URL.
    aboutUrl: yup
        .string()
        .trim()
        .transform((value, originalValue) => {
            if (originalValue === '' || originalValue === null || originalValue === undefined) {
                return '';
            }
            return value;
        })
        .test('url-or-empty', 'About URL must be a valid URL', function (value) {
            if (!value || value === '') {
                return true;
            }
            try {
                new URL(value);
                return true;
            } catch {
                return false;
            }
        })
        .default(''),
});

export type ManufacturerFormFields = yup.InferType<typeof ManufacturerValidationSchema>;

