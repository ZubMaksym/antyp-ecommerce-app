import { CheckoutFormValidationSchema } from '@/schemas/CheckoutFormValidationSchema';
import type { CheckoutFormFields } from '../componentTypes';

describe('Component Types', () => {
    describe('CheckoutFormFields type', () => {
        it('should infer correct type from CheckoutFormValidationSchema', () => {
            // Test that the type matches the schema structure
            const validFormData: CheckoutFormFields = {
                firstName: 'John',
                lastName: 'Doe',
                company: 'Test Company',
                phoneNumber: '0661234567',
            };
            
            expect(validFormData.firstName).toBeDefined();
            expect(validFormData.lastName).toBeDefined();
            expect(validFormData.company).toBeDefined();
            expect(validFormData.phoneNumber).toBeDefined();
        });

        it('should allow optional company field', () => {
            const formDataWithoutCompany: CheckoutFormFields = {
                firstName: 'Jane',
                lastName: 'Smith',
                phoneNumber: '0671234567',
            };
            
            expect(formDataWithoutCompany.company).toBeUndefined();
        });

        it('should match schema validation requirements', async () => {
            const testData: CheckoutFormFields = {
                firstName: 'Test',
                lastName: 'User',
                phoneNumber: '0661234567',
            };
            
            await expect(CheckoutFormValidationSchema.validate(testData)).resolves.toBeDefined();
        });

        it('should enforce required fields at type level', () => {
            // This is a compile-time test - if this compiles, the type is correct
            const requiresAllMandatory: CheckoutFormFields = {
                firstName: 'John',
                lastName: 'Doe',
                phoneNumber: '0661234567',
            };
            
            // TypeScript should enforce these fields exist
            expect(requiresAllMandatory).toHaveProperty('firstName');
            expect(requiresAllMandatory).toHaveProperty('lastName');
            expect(requiresAllMandatory).toHaveProperty('phoneNumber');
        });

        it('should allow string values for all fields', () => {
            const allStrings: CheckoutFormFields = {
                firstName: 'String',
                lastName: 'Value',
                company: 'Optional String',
                phoneNumber: '0661234567',
            };
            
            expect(typeof allStrings.firstName).toBe('string');
            expect(typeof allStrings.lastName).toBe('string');
            expect(typeof allStrings.phoneNumber).toBe('string');
            
            if (allStrings.company) {
                expect(typeof allStrings.company).toBe('string');
            }
        });
    });

    describe('Type inference from yup schema', () => {
        it('should correctly infer InferType from schema', async () => {
            // Test that the inferred type works with actual schema validation
            const data: CheckoutFormFields = {
                firstName: 'Test',
                lastName: 'User',
                phoneNumber: '0661234567',
                company: 'Test Co',
            };
            
            const validated = await CheckoutFormValidationSchema.validate(data);
            
            // The validated data should match the CheckoutFormFields type
            const typedResult: CheckoutFormFields = validated;
            expect(typedResult.firstName).toBe('Test');
            expect(typedResult.lastName).toBe('User');
            expect(typedResult.phoneNumber).toBe('0661234567');
            expect(typedResult.company).toBe('Test Co');
        });

        it('should handle optional field correctly in type system', async () => {
            const dataWithoutOptional: CheckoutFormFields = {
                firstName: 'Test',
                lastName: 'User',
                phoneNumber: '0661234567',
            };
            
            const validated = await CheckoutFormValidationSchema.validate(dataWithoutOptional);
            expect(validated.company).toBeUndefined();
        });
    });

    describe('Type safety checks', () => {
        it('should ensure firstName is required', () => {
            const data: CheckoutFormFields = {
                firstName: 'Required',
                lastName: 'Field',
                phoneNumber: '0661234567',
            };
            
            // TypeScript ensures firstName cannot be omitted
            expect(data.firstName).toBeDefined();
        });

        it('should ensure lastName is required', () => {
            const data: CheckoutFormFields = {
                firstName: 'First',
                lastName: 'Required',
                phoneNumber: '0661234567',
            };
            
            // TypeScript ensures lastName cannot be omitted
            expect(data.lastName).toBeDefined();
        });

        it('should ensure phoneNumber is required', () => {
            const data: CheckoutFormFields = {
                firstName: 'First',
                lastName: 'Last',
                phoneNumber: 'Required',
            };
            
            // TypeScript ensures phoneNumber cannot be omitted
            expect(data.phoneNumber).toBeDefined();
        });
    });

    describe('Edge case type handling', () => {
        it('should handle empty strings for required fields at runtime', async () => {
            const dataWithEmptyStrings = {
                firstName: '',
                lastName: '',
                phoneNumber: '',
            };
            
            await expect(
                CheckoutFormValidationSchema.validate(dataWithEmptyStrings)
            ).rejects.toThrow();
        });

        it('should allow empty string for optional company', async () => {
            const data: CheckoutFormFields = {
                firstName: 'John',
                lastName: 'Doe',
                company: '',
                phoneNumber: '0661234567',
            };
            
            await expect(CheckoutFormValidationSchema.validate(data)).resolves.toBeDefined();
        });

        it('should handle undefined company field', async () => {
            const data: CheckoutFormFields = {
                firstName: 'John',
                lastName: 'Doe',
                phoneNumber: '0661234567',
                company: undefined,
            };
            
            await expect(CheckoutFormValidationSchema.validate(data)).resolves.toBeDefined();
        });
    });

    describe('Type consistency with schema', () => {
        it('should maintain type consistency across multiple instances', () => {
            const instance1: CheckoutFormFields = {
                firstName: 'User1',
                lastName: 'Test1',
                phoneNumber: '0661111111',
            };
            
            const instance2: CheckoutFormFields = {
                firstName: 'User2',
                lastName: 'Test2',
                phoneNumber: '0662222222',
                company: 'Company2',
            };
            
            expect(typeof instance1.firstName).toBe('string');
            expect(typeof instance2.firstName).toBe('string');
            expect(instance1.company).toBeUndefined();
            expect(instance2.company).toBeDefined();
        });

        it('should work with spread operators', () => {
            const baseData: CheckoutFormFields = {
                firstName: 'Base',
                lastName: 'User',
                phoneNumber: '0661234567',
            };
            
            const extendedData: CheckoutFormFields = {
                ...baseData,
                company: 'Added Company',
            };
            
            expect(extendedData.firstName).toBe('Base');
            expect(extendedData.company).toBe('Added Company');
        });

        it('should work with destructuring', () => {
            const data: CheckoutFormFields = {
                firstName: 'John',
                lastName: 'Doe',
                phoneNumber: '0661234567',
                company: 'Test Co',
            };
            
            const { firstName, lastName, phoneNumber, company } = data;
            
            expect(firstName).toBe('John');
            expect(lastName).toBe('Doe');
            expect(phoneNumber).toBe('0661234567');
            expect(company).toBe('Test Co');
        });
    });
});