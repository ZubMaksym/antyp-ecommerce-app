import { Dispatch, SetStateAction } from 'react';
import { ProductItem } from './reducerTypes';
import { InferType } from 'yup';
import { CheckoutFormValidationSchema } from '@/schemas/CheckoutFormValidationSchema';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

export interface ModalProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface SearchProps extends ModalProps {
    children: React.ReactNode;
    title: 'Search' | 'Shopping cart';
}

export interface ButtonProps {
    classname: string;
    apearence: 'primary' | 'secondary';
    children: React.ReactNode;
    onClick?: any;
}

export interface ProductCardProps {
    product: ProductItem;
    onCardClick: () => void;
}

export interface CategoryCardProps {
    children: React.ReactNode;
    subtitle: string;
}

export interface FilterDropdownProps {
    filterName: string;
    children: React.ReactNode;
    isFirst?: boolean;
    allowOverflow: boolean;
}

export interface CheckBoxProps {
    onClick?: () => void;
    checked: boolean;
}

export interface FiltersButtonProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface PaginationProps {
    totalPages: number;
    setCurrentPage: (page: number) => void;
    currentPage: number;
    scrollTopValue: number;
}

export interface RangeSliderProps {
    rangeFor: 'ibu' | 'alcoholStrength'
    min: number;
    max: number;
}

export interface ProductsProps {
    products: ProductItem[] | null;
    loading: boolean;
    productsLoadedOnce: boolean;
}

export interface FilterSkeletonProps {
    record: number
}

export interface ProductDetailsTableProps {
    product: ProductItem;
}

export interface InputProps {
    register?: UseFormRegister<CheckoutFormFields>;
    errors?: FieldErrors<CheckoutFormFields> | undefined;
    errorMessage?: string | undefined;
    className: string;
    type: 'text' | 'number';
    placeholder: string;
    id: 'firstName' | 'lastName' | 'company' | 'phoneNumber';
}

export type CheckoutFormFields = InferType<typeof CheckoutFormValidationSchema>;