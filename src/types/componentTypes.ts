import { Dispatch, SetStateAction } from 'react';
import { FilterName, ProductItem } from './reducerTypes';
import { ProductItemCart } from './reducerTypes';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';

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
    disabled?: boolean;
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
    filterOptions?: FilterName[];
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
    type: 'text' | 'number' | 'tel';
    placeholder: string;
    id: 'firstName' | 'lastName' | 'company';
}

export interface PhoneNumberInputProps {
    control: Control<CheckoutFormFields>;
    name: 'phoneNumber';
    className?: string;
    placeholder?: string;
    errors?: FieldErrors<CheckoutFormFields>;
    errorMessage?: string;
}

export interface UsernameInputProps {
    register?: UseFormRegister<LoginFormFields | RegisterFormFields>;
    errors?: FieldErrors<LoginFormFields | RegisterFormFields> | undefined;
    errorMessage?: string | undefined;
    classname?: string;
}

export interface PasswordInputProps {
    register?: UseFormRegister<LoginFormFields | RegisterFormFields>;
    errors?: FieldErrors<LoginFormFields | RegisterFormFields> | undefined;
    errorMessage?: string | undefined;
    classname?: string;
}

export interface ConfirmPasswordInputProps {
    register?: UseFormRegister<RegisterFormFields>;
    errors?: FieldErrors<RegisterFormFields> | undefined;
    errorMessage?: string | undefined;
    classname?: string;
}

export interface CheckoutFormFields {
    firstName: string;
    lastName: string;
    company?: string;
    phoneNumber: string;
}

export interface LoginFormFields {
    email: string;
    password: string;
}

export interface RegisterFormFields {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AddToCartButtonProps {
    product: ProductItem;
    handleClick: (e: React.MouseEvent, item: ProductItemCart) => void;
    isMobile: boolean;
}

export interface ProductImageCarouselProps {
    images: string[];
    isFullscreen: boolean;
    setIsFullscreen: Dispatch<SetStateAction<boolean>>;
    initalSlide?: number;
    setMainImage: Dispatch<SetStateAction<string>>;
}

export interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    type: 'login' | 'register';
}

export interface LoadingSpinnerProps {
    message?: string;
    height?: string;
    size?: number;
    color?: string;
    showMessage?: boolean;
}