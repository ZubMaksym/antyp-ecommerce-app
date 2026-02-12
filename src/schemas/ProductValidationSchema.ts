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
        .transform((value, originalValue) => {
            // Convert empty string to null
            if (originalValue === '' || originalValue === null || originalValue === undefined) {
                return null;
            }
            return value;
        })
        .test('date-or-null', 'Must be a valid ISO date string or null', function (value) {
            if (!value || value === null) {
                // Allow null only if isBestSeller is false
                return !this.parent.isBestSeller;
            }
            const date = new Date(value);
            return !isNaN(date.getTime());
        })
        .test('not-past', 'Date cannot be in the past', function (value) {
            if (!value || value === null) {
                // Allow null only if isBestSeller is false
                return !this.parent.isBestSeller;
            }
            // Handle datetime-local format (YYYY-MM-DDTHH:mm)
            const date = new Date(value);
            const now = new Date();
            // Allow current time or future (with 1 minute tolerance for rounding)
            return date.getTime() >= (now.getTime() - 60000);
        })
        .when('isBestSeller', {
            is: true,
            then: (schema) => schema.required('bestSellerUntilUtc is required when isBestSeller is true'),
            otherwise: (schema) => schema.nullable().notRequired(),
        }),
    bestSellerRank: yup
        .number()
        .nullable()
        .transform((value, originalValue) => {
            // Convert empty string to null
            if (originalValue === '' || originalValue === null || originalValue === undefined) {
                return null;
            }
            return value;
        })
        .notRequired()
        .when('isBestSeller', {
            is: true,
            then: (schema) => schema
                .required('bestSellerRank is required when isBestSeller is true')
                .min(1, 'Best seller rank must be greater than 0'),
            otherwise: (schema) => schema.nullable().notRequired(),
        }),
    isNew: yup
        .boolean()
        .required('isNew is required'),
    newUntilUtc: yup
        .string()
        .nullable()
        .transform((value, originalValue) => {
            // Convert empty string to null
            if (originalValue === '' || originalValue === null || originalValue === undefined) {
                return null;
            }
            return value;
        })
        .test('date-or-null', 'Must be a valid ISO date string or null', function (value) {
            if (!value || value === null) {
                // Allow null only if isNew is false
                return !this.parent.isNew;
            }
            const date = new Date(value);
            return !isNaN(date.getTime());
        })
        .test('not-past', 'Date cannot be in the past', function (value) {
            if (!value || value === null) {
                // Allow null only if isNew is false
                return !this.parent.isNew;
            }
            // Handle datetime-local format (YYYY-MM-DDTHH:mm)
            const date = new Date(value);
            const now = new Date();
            // Allow current time or future (with 1 minute tolerance for rounding)
            return date.getTime() >= (now.getTime() - 60000);
        })
        .when('isNew', {
            is: true,
            then: (schema) => schema.required('newUntilUtc is required when isNew is true'),
            otherwise: (schema) => schema.nullable().notRequired(),
        }),
    // Wine-specific fields
    wineColorId: yup
        .string()
        .trim()
        .test('not-empty', 'Wine color is required', function (value) {
            // Allow null/undefined (for non-wine products), but reject empty string
            if (value === null || value === undefined) {
                return true; // Allow null/undefined
            }
            return value !== ''; // Reject empty string
        })
        .nullable()
        .notRequired(),
    wineSweetnessId: yup
        .string()
        .trim()
        .test('not-empty', 'Wine sweetness is required', function (value) {
            if (value === null || value === undefined) {
                return true; // Allow null/undefined
            }
            return value !== ''; // Reject empty string
        })
        .nullable()
        .notRequired(),
    isSparkling: yup
        .boolean()
        .nullable()
        .notRequired()
        .default(false),
    // Beer-specific fields
    ibu: yup
        .number()
        .min(0, 'IBU must be 0 or greater')
        .nullable()
        .notRequired(),
    alcoholStrength: yup
        .number()
        .min(0, 'Alcohol strength must be 0 or greater')
        .nullable()
        .notRequired()
        .transform(value => value ? parseFloat(value.toString()) : null),
    originalExtract: yup
        .number()
        .min(0, 'Original extract must be 0 or greater')
        .nullable()
        .notRequired()
        .transform(value => value ? parseFloat(value.toString()) : null),
    beerTypeId: yup
        .string()
        .trim()
        .test('not-empty', 'Beer type is required', function (value) {
            if (value === null || value === undefined) {
                return true; // Allow null/undefined
            }
            return value !== ''; // Reject empty string
        })
        .nullable()
        .notRequired(),
    seasonTagIds: yup
        .array()
        .of(yup.string().trim().required())
        .nullable()
        .notRequired()
        .default([]),
    // Cider-specific fields
    // alcoholStrength is already defined above (shared with beer)
    // Water-specific fields
    carbonationLevelId: yup
        .string()
        .trim()
        .test('not-empty', 'Carbonation level is required', function (value) {
            if (value === null || value === undefined) {
                return true; // Allow null/undefined
            }
            return value !== ''; // Reject empty string
        })
        .nullable()
        .notRequired(),
    waterTypeId: yup
        .string()
        .trim()
        .test('not-empty', 'Water type is required', function (value) {
            if (value === null || value === undefined) {
                return true; // Allow null/undefined
            }
            return value !== ''; // Reject empty string
        })
        .nullable()
        .notRequired(),
    // Soft Drink-specific fields
    softDrinkTypeId: yup
        .string()
        .trim()
        .test('not-empty', 'Soft drink type is required', function (value) {
            if (value === null || value === undefined) {
                return true; // Allow null/undefined
            }
            return value !== ''; // Reject empty string
        })
        .nullable()
        .notRequired(),
});

export type ProductFormFields = yup.InferType<typeof ProductValidationSchema>;