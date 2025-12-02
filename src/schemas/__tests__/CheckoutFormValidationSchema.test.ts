import { CheckoutFormValidationSchema } from '../CheckoutFormValidationSchema';
import * as yup from 'yup';

describe('CheckoutFormValidationSchema', () => {
    describe('Valid form data', () => {
        it('should validate a complete form with all fields', async () => {
            const validData = {
                firstName: 'John',
                lastName: 'Doe',
                company: 'Acme Corp',
                phoneNumber: '0661234567',
            };

            await expect(CheckoutFormValidationSchema.validate(validData)).resolves.toEqual(validData);
        });

        it('should validate form without optional company field', async () => {
            const validData = {
                firstName: 'Jane',
                lastName: 'Smith',
                phoneNumber: '0671234567',
            };

            await expect(CheckoutFormValidationSchema.validate(validData)).resolves.toBeDefined();
        });

        it('should accept various valid phone number formats', async () => {
            const testCases = [
                { firstName: 'Test', lastName: 'User', phoneNumber: '0661234567' },
                { firstName: 'Test', lastName: 'User', phoneNumber: '0501234567' },
                { firstName: 'Test', lastName: 'User', phoneNumber: '0931234567' },
            ];

            for (const testCase of testCases) {
                await expect(CheckoutFormValidationSchema.validate(testCase)).resolves.toBeDefined();
            }
        });

        it('should accept empty string for optional company field', async () => {
            const validData = {
                firstName: 'John',
                lastName: 'Doe',
                company: '',
                phoneNumber: '0661234567',
            };

            await expect(CheckoutFormValidationSchema.validate(validData)).resolves.toBeDefined();
        });

        it('should accept names with special characters', async () => {
            const validData = {
                firstName: "O'Brien",
                lastName: 'Müller-Schmidt',
                phoneNumber: '0661234567',
            };

            await expect(CheckoutFormValidationSchema.validate(validData)).resolves.toBeDefined();
        });
    });

    describe('Invalid form data - firstName', () => {
        it('should reject when firstName is missing', async () => {
            const invalidData = {
                lastName: 'Doe',
                phoneNumber: '0661234567',
            };

            await expect(CheckoutFormValidationSchema.validate(invalidData)).rejects.toThrow("Це поле обов'язкове");
        });

        it('should reject when firstName is empty string', async () => {
            const invalidData = {
                firstName: '',
                lastName: 'Doe',
                phoneNumber: '0661234567',
            };

            await expect(CheckoutFormValidationSchema.validate(invalidData)).rejects.toThrow("Це поле обов'язкове");
        });

        it('should reject when firstName is only whitespace', async () => {
            const invalidData = {
                firstName: '   ',
                lastName: 'Doe',
                phoneNumber: '0661234567',
            };

            await expect(CheckoutFormValidationSchema.validate(invalidData)).rejects.toThrow();
        });

        it('should reject when firstName is null', async () => {
            const invalidData = {
                firstName: null,
                lastName: 'Doe',
                phoneNumber: '0661234567',
            };

            await expect(CheckoutFormValidationSchema.validate(invalidData)).rejects.toThrow();
        });
    });

    describe('Invalid form data - lastName', () => {
        it('should reject when lastName is missing', async () => {
            const invalidData = {
                firstName: 'John',
                phoneNumber: '0661234567',
            };

            await expect(CheckoutFormValidationSchema.validate(invalidData)).rejects.toThrow("Це поле обов'язкове");
        });

        it('should reject when lastName is empty string', async () => {
            const invalidData = {
                firstName: 'John',
                lastName: '',
                phoneNumber: '0661234567',
            };

            await expect(CheckoutFormValidationSchema.validate(invalidData)).rejects.toThrow("Це поле обов'язкове");
        });

        it('should reject when lastName is only whitespace', async () => {
            const invalidData = {
                firstName: 'John',
                lastName: '   ',
                phoneNumber: '0661234567',
            };

            await expect(CheckoutFormValidationSchema.validate(invalidData)).rejects.toThrow();
        });
    });

    describe('Invalid form data - phoneNumber', () => {
        it('should reject when phoneNumber is missing', async () => {
            const invalidData = {
                firstName: 'John',
                lastName: 'Doe',
            };

            await expect(CheckoutFormValidationSchema.validate(invalidData)).rejects.toThrow("Це поле обов'язкове");
        });

        it('should reject when phoneNumber is empty string', async () => {
            const invalidData = {
                firstName: 'John',
                lastName: 'Doe',
                phoneNumber: '',
            };

            await expect(CheckoutFormValidationSchema.validate(invalidData)).rejects.toThrow("Це поле обов'язкове");
        });

        it('should reject phone number with wrong prefix', async () => {
            const invalidData = {
                firstName: 'John',
                lastName: 'Doe',
                phoneNumber: '1234567890',
            };

            await expect(CheckoutFormValidationSchema.validate(invalidData)).rejects.toThrow('Номер телефона має відповідати формату 0123456789');
        });

        it('should reject phone number that is too short', async () => {
            const invalidData = {
                firstName: 'John',
                lastName: 'Doe',
                phoneNumber: '066123',
            };

            await expect(CheckoutFormValidationSchema.validate(invalidData)).rejects.toThrow('Номер телефона має відповідати формату 0123456789');
        });

        it('should reject phone number that is too long', async () => {
            const invalidData = {
                firstName: 'John',
                lastName: 'Doe',
                phoneNumber: '066123456789012',
            };

            await expect(CheckoutFormValidationSchema.validate(invalidData)).rejects.toThrow('Номер телефона має відповідати формату 0123456789');
        });

        it('should reject phone number with letters', async () => {
            const invalidData = {
                firstName: 'John',
                lastName: 'Doe',
                phoneNumber: '066abc4567',
            };

            await expect(CheckoutFormValidationSchema.validate(invalidData)).rejects.toThrow('Номер телефона має відповідати формату 0123456789');
        });

        it('should reject phone number with special characters', async () => {
            const invalidData = {
                firstName: 'John',
                lastName: 'Doe',
                phoneNumber: '066-123-4567',
            };

            await expect(CheckoutFormValidationSchema.validate(invalidData)).rejects.toThrow('Номер телефона має відповідати формату 0123456789');
        });

        it('should reject phone number with spaces', async () => {
            const invalidData = {
                firstName: 'John',
                lastName: 'Doe',
                phoneNumber: '066 123 4567',
            };

            await expect(CheckoutFormValidationSchema.validate(invalidData)).rejects.toThrow('Номер телефона має відповідати формату 0123456789');
        });
    });

    describe('Edge cases and boundary conditions', () => {
        it('should handle undefined values gracefully', async () => {
            const invalidData = {
                firstName: undefined,
                lastName: undefined,
                phoneNumber: undefined,
            };

            await expect(CheckoutFormValidationSchema.validate(invalidData)).rejects.toThrow();
        });

        it('should validate with very long but valid names', async () => {
            const validData = {
                firstName: 'A'.repeat(100),
                lastName: 'B'.repeat(100),
                phoneNumber: '0661234567',
            };

            await expect(CheckoutFormValidationSchema.validate(validData)).resolves.toBeDefined();
        });

        it('should validate with unicode characters in names', async () => {
            const validData = {
                firstName: 'Іван',
                lastName: 'Петренко',
                phoneNumber: '0661234567',
            };

            await expect(CheckoutFormValidationSchema.validate(validData)).resolves.toBeDefined();
        });

        it('should handle all fields being present but with mixed validity', async () => {
            const invalidData = {
                firstName: 'John',
                lastName: '',
                company: 'Valid Company',
                phoneNumber: 'invalid',
            };

            await expect(CheckoutFormValidationSchema.validate(invalidData)).rejects.toThrow();
        });
    });

    describe('Schema structure validation', () => {
        it('should be a yup object schema', () => {
            expect(CheckoutFormValidationSchema).toBeInstanceOf(yup.ObjectSchema);
        });

        it('should have correct field definitions', () => {
            const fields = CheckoutFormValidationSchema.describe().fields;
            
            expect(fields.firstName).toBeDefined();
            expect(fields.lastName).toBeDefined();
            expect(fields.company).toBeDefined();
            expect(fields.phoneNumber).toBeDefined();
        });

        it('should mark firstName as required', () => {
            const fields = CheckoutFormValidationSchema.describe().fields;
            expect(fields.firstName.tests).toContainEqual(expect.objectContaining({ name: 'required' }));
        });

        it('should mark lastName as required', () => {
            const fields = CheckoutFormValidationSchema.describe().fields;
            expect(fields.lastName.tests).toContainEqual(expect.objectContaining({ name: 'required' }));
        });

        it('should mark phoneNumber as required', () => {
            const fields = CheckoutFormValidationSchema.describe().fields;
            expect(fields.phoneNumber.tests).toContainEqual(expect.objectContaining({ name: 'required' }));
        });

        it('should mark company as optional', () => {
            const fields = CheckoutFormValidationSchema.describe().fields;
            const companyField = fields.company;
            expect(companyField.optional).toBe(true);
        });
    });

    describe('Validation with stripUnknown behavior', () => {
        it('should handle extra fields in data', async () => {
            const dataWithExtra = {
                firstName: 'John',
                lastName: 'Doe',
                phoneNumber: '0661234567',
                extraField: 'should be ignored',
            };

            const result = await CheckoutFormValidationSchema.validate(dataWithExtra, { stripUnknown: true });
            expect(result).not.toHaveProperty('extraField');
        });
    });

    describe('Batch validation scenarios', () => {
        it('should validate multiple valid submissions', async () => {
            const submissions = [
                { firstName: 'User1', lastName: 'Test1', phoneNumber: '0661111111' },
                { firstName: 'User2', lastName: 'Test2', phoneNumber: '0662222222', company: 'Company' },
                { firstName: 'User3', lastName: 'Test3', phoneNumber: '0663333333' },
            ];

            const results = await Promise.all(
                submissions.map(data => CheckoutFormValidationSchema.validate(data))
            );

            expect(results).toHaveLength(3);
            results.forEach(result => expect(result).toBeDefined());
        });

        it('should catch all invalid submissions', async () => {
            const submissions = [
                { firstName: '', lastName: 'Test1', phoneNumber: '0661111111' },
                { firstName: 'User2', lastName: '', phoneNumber: '0662222222' },
                { firstName: 'User3', lastName: 'Test3', phoneNumber: 'invalid' },
            ];

            const results = await Promise.allSettled(
                submissions.map(data => CheckoutFormValidationSchema.validate(data))
            );

            expect(results.every(r => r.status === 'rejected')).toBe(true);
        });
    });
});