import * as yup from 'yup';

// UUID validation helper
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const uuidValidation = yup
    .string()
    .trim()
    .matches(uuidRegex, 'Must be a valid UUID')
    .required();

export const ProductValidationSchema = yup.object({
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
    manufacturer: yup
        .string()
        .trim()
        .required('Manufacturer is required'),
    description: yup
        .string()
        .trim()
        .nullable()
        .notRequired(),
    packagings: yup
        .array()
        .of(
            yup.object({
                packagingId: uuidValidation,
                multiplicity: yup
                    .number()
                    .min(0, 'Multiplicity must be 0 or greater')
                    .required('Multiplicity is required'),
            })
        )
        .min(1, 'At least one packaging is required')
        .required('Packagings are required'),
    ingredients: yup
        .array()
        .of(yup.string().trim().required())
        .nullable()
        .notRequired()
        .default([]),
    multiplicity: yup
        .number()
        .min(0, 'Multiplicity must be 0 or greater')
        .required('Multiplicity is required'),
    protein: yup
        .number()
        .min(0, 'Protein must be 0 or greater')
        .required('Protein is required'),
    fat: yup
        .number()
        .min(0, 'Fat must be 0 or greater')
        .required('Fat is required'),
    carbohydrate: yup
        .number()
        .min(0, 'Carbohydrate must be 0 or greater')
        .required('Carbohydrate is required'),
    sugar: yup
        .number()
        .min(0, 'Sugar must be 0 or greater')
        .required('Sugar is required'),
    isBestSeller: yup
        .boolean()
        .required('isBestSeller is required'),
    bestSellerUntilUtc: yup
        .string()
        .nullable()
        .test('date-or-null', 'Must be a valid ISO date string or null', function (value) {
            if (!value || value === null) {
                return !this.parent.isBestSeller || true; // Allow null if not best seller
            }
            const date = new Date(value);
            return !isNaN(date.getTime());
        })
        .when('isBestSeller', {
            is: true,
            then: (schema) => schema.required('bestSellerUntilUtc is required when isBestSeller is true'),
            otherwise: (schema) => schema.nullable().notRequired(),
        }),
    bestSellerRank: yup
        .number()
        .min(0, 'Best seller rank must be 0 or greater')
        .nullable()
        .notRequired()
        .when('isBestSeller', {
            is: true,
            then: (schema) => schema.required('bestSellerRank is required when isBestSeller is true'),
            otherwise: (schema) => schema.nullable().notRequired(),
        }),
    isNew: yup
        .boolean()
        .required('isNew is required'),
    newUntilUtc: yup
        .string()
        .nullable()
        .test('date-or-null', 'Must be a valid ISO date string or null', function (value) {
            if (!value || value === null) {
                return !this.parent.isNew || true; // Allow null if not new
            }
            const date = new Date(value);
            return !isNaN(date.getTime());
        })
        .when('isNew', {
            is: true,
            then: (schema) => schema.required('newUntilUtc is required when isNew is true'),
            otherwise: (schema) => schema.nullable().notRequired(),
        }),
});

export type ProductFormFields = yup.InferType<typeof ProductValidationSchema>;