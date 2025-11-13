import { Dispatch, SetStateAction } from 'react';
import { FilterName, ProductItem } from './reducerTypes';

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
    onClick?: () => void;
}

export interface ProductCardProps {
    name: string;
    shortName: string;
    onCardClick: () => void;
    mainPhotoUrl: string;
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