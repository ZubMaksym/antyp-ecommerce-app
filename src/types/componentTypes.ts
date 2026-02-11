import { Dispatch, SetStateAction } from 'react';
import { FilterName, ProductItem } from './reducerTypes';
import { ProductItemCart } from './reducerTypes';
import { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import { AdminAction } from '@/types/commonTypes';

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

export interface InputProps<TFormValues = any> {
    register?: UseFormRegister<TFormValues>;
    errors?: FieldErrors<TFormValues> | undefined;
    errorMessage?: string | undefined;
    className?: string;
    type: 'text' | 'number' | 'tel' | 'url';
    placeholder: string;
    id: keyof TFormValues & string;
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

export interface DropdownProps {
    children: React.ReactNode;
    title: string;
    classname?: string;
    id: string;
}

export interface AdminProductsListProps {
    products: ProductItem[] | null;
    productsLoading: boolean;
    productsError: string | null;
    modalMode: 'create' | 'edit' | 'delete' | null;
    setModalMode: Dispatch<SetStateAction<'create' | 'edit' | 'delete' | null>>;
}

export interface AdminActionButtonProps {
    action: AdminAction;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
}

export interface AdminModalProps {
    modalMode: 'create' | 'edit' | 'delete' | null;
    setModalMode: Dispatch<SetStateAction<'create' | 'edit' | 'delete' | null>>;
    children: React.ReactNode;
}