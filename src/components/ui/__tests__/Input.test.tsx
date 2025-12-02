import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import Input from '../Input';
import '@testing-library/jest-dom';

// Helper component to test Input with react-hook-form
const TestWrapper = ({
    id = 'firstName' as const,
    type = 'text',
    placeholder = 'Test placeholder',
    className = '',
    errorMessage = undefined,
}) => {
    const { register, formState: { errors } } = useForm({
        mode: 'onChange',
    });

    return (
        <Input
            id={id}
            type={type}
            placeholder={placeholder}
            className={className}
            register={register}
            errors={errors}
            errorMessage={errorMessage}
        />
    );
};

describe('Input Component', () => {
    describe('Rendering', () => {
        it('should render input element', () => {
            render(<TestWrapper />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).toBeInTheDocument();
        });

        it('should render with correct type attribute', () => {
            render(<TestWrapper type="email" />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).toHaveAttribute('type', 'email');
        });

        it('should render with correct id attribute', () => {
            render(<TestWrapper id="firstName" />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).toHaveAttribute('id', 'firstName');
        });

        it('should render with placeholder text', () => {
            const placeholderText = 'Enter your name';
            render(<TestWrapper placeholder={placeholderText} />);
            expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
        });

        it('should apply custom className', () => {
            const customClass = 'custom-input-class w-full h-10';
            render(<TestWrapper className={customClass} />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).toHaveClass('custom-input-class', 'w-full', 'h-10');
        });

        it('should apply default styling classes', () => {
            render(<TestWrapper />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).toHaveClass('rounded-lg');
            expect(input).toHaveClass('border-[1px]');
        });
    });

    describe('Input types', () => {
        it('should render text input', () => {
            render(<TestWrapper type="text" />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).toHaveAttribute('type', 'text');
        });

        it('should render email input', () => {
            render(<TestWrapper type="email" />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).toHaveAttribute('type', 'email');
        });

        it('should render password input', () => {
            render(<TestWrapper type="password" />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).toHaveAttribute('type', 'password');
        });

        it('should render tel input', () => {
            render(<TestWrapper type="tel" />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).toHaveAttribute('type', 'tel');
        });
    });

    describe('Error states', () => {
        it('should display error message when provided', () => {
            const errorMsg = 'This field is required';
            render(<TestWrapper errorMessage={errorMsg} />);
            expect(screen.getByText(errorMsg)).toBeInTheDocument();
        });

        it('should not display error when errorMessage is undefined', () => {
            render(<TestWrapper errorMessage={undefined} />);
            const errorElements = screen.queryByText(/error/i);
            expect(errorElements).not.toBeInTheDocument();
        });

        it('should apply error border class when error exists', () => {
            const errorMsg = 'Invalid input';
            render(<TestWrapper errorMessage={errorMsg} />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).toHaveClass('border-red-500');
        });

        it('should apply normal border class when no error', () => {
            render(<TestWrapper errorMessage={undefined} />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).toHaveClass('border-[#CAD3D8]');
        });

        it('should display error message with correct styling', () => {
            const errorMsg = 'Error message';
            render(<TestWrapper errorMessage={errorMsg} />);
            const errorElement = screen.getByText(errorMsg);
            expect(errorElement).toHaveClass('text-red-500');
            expect(errorElement).toHaveClass('text-sm');
            expect(errorElement).toHaveClass('mt-1');
        });
    });

    describe('Form field IDs', () => {
        it('should handle firstName id', () => {
            render(<TestWrapper id="firstName" />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).toHaveAttribute('id', 'firstName');
        });

        it('should handle lastName id', () => {
            render(<TestWrapper id="lastName" />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).toHaveAttribute('id', 'lastName');
        });

        it('should handle company id', () => {
            render(<TestWrapper id="company" />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).toHaveAttribute('id', 'company');
        });

        it('should handle phoneNumber id', () => {
            render(<TestWrapper id="phoneNumber" />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).toHaveAttribute('id', 'phoneNumber');
        });
    });

    describe('Styling variations', () => {
        it('should apply focus styling classes', () => {
            render(<TestWrapper />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).toHaveClass('focus:outline-none');
            expect(input).toHaveClass('focus:border-[#738895]');
        });

        it('should apply text color classes', () => {
            render(<TestWrapper />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).toHaveClass('text-[#738895]');
        });

        it('should apply padding classes', () => {
            render(<TestWrapper />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).toHaveClass('px-4');
            expect(input).toHaveClass('py-2');
        });

        it('should combine custom className with default classes', () => {
            render(<TestWrapper className="w-full h-12 bg-white" />);
            const input = screen.getByPlaceholderText('Test placeholder');
            
            // Custom classes
            expect(input).toHaveClass('w-full', 'h-12', 'bg-white');
            
            // Default classes should still be present
            expect(input).toHaveClass('rounded-lg', 'px-4', 'py-2');
        });
    });

    describe('Accessibility', () => {
        it('should be accessible via placeholder', () => {
            render(<TestWrapper placeholder="Enter first name" />);
            expect(screen.getByPlaceholderText('Enter first name')).toBeInTheDocument();
        });

        it('should have proper input role', () => {
            render(<TestWrapper />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input.tagName).toBe('INPUT');
        });

        it('should be keyboard accessible', () => {
            render(<TestWrapper />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).not.toHaveAttribute('tabindex', '-1');
        });
    });

    describe('Edge cases', () => {
        it('should handle empty string placeholder', () => {
            render(<TestWrapper placeholder="" />);
            const inputs = screen.getAllByRole('textbox');
            expect(inputs.length).toBeGreaterThan(0);
        });

        it('should handle very long error messages', () => {
            const longError = 'A'.repeat(200);
            render(<TestWrapper errorMessage={longError} />);
            expect(screen.getByText(longError)).toBeInTheDocument();
        });

        it('should handle empty string className', () => {
            render(<TestWrapper className="" />);
            const input = screen.getByPlaceholderText('Test placeholder');
            expect(input).toBeInTheDocument();
        });

        it('should handle special characters in placeholder', () => {
            const specialPlaceholder = "Ім'я (опціонально) - тест";
            render(<TestWrapper placeholder={specialPlaceholder} />);
            expect(screen.getByPlaceholderText(specialPlaceholder)).toBeInTheDocument();
        });
    });

    describe('Integration with react-hook-form', () => {
        it('should register with react-hook-form', () => {
            const { container } = render(<TestWrapper id="firstName" />);
            const input = container.querySelector('#firstName');
            expect(input).toHaveAttribute('name', 'firstName');
        });

        it('should work with different field names', () => {
            const fieldNames = ['firstName', 'lastName', 'company', 'phoneNumber'] as const;
            
            fieldNames.forEach(fieldName => {
                const { container } = render(<TestWrapper id={fieldName} />);
                const input = container.querySelector(`#${fieldName}`);
                expect(input).toHaveAttribute('name', fieldName);
            });
        });
    });
});