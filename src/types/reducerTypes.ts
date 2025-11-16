export interface ApiResponse {
    result: Result;
    errors: any | null;
    isError: boolean;
    timeGenerated: string;
}

export interface Result {
    manufacturers: FilterName[];
    beerTypes: FilterName[];
    packagings: FilterName[];
    seasonTags: FilterName[];
    carbonationLevels: FilterName[];
    waterTypes: FilterName[];
    softDrinkTypes: FilterName[];
    wineColors: FilterName[];
    wineSweetness: FilterName[];
    ibu: IBU;
    alcoholStrength: AlcoholStrength;
    isSparkling: boolean;
}

export interface IBU {
    min: number;
    max: number;
}

export interface AlcoholStrength {
    min: number;
    max: number;
}

export interface FilterName {
    id: string;
    name: string;
    count: number;
}


export interface ProductItem {
    id: string;
    name: string;
    shortName: string;
    isBestSeller: boolean;
    isNew: boolean;
    slug: string;
    mainPhotoUrl: string;
    photoUrls: string[];
}

export interface ProductResponse {
    items: ProductItem[];
    totalCount: number;
}

export interface ApiResponseProduct {
    result: ProductResponse;
}

export interface Manufacturer {
    id: string;
    name: string;
    count: number;
}

export interface Result {
    manufacturers: Manufacturer[];
}

export interface ProductItemCart extends ProductItem {
    quantity: number;
    packaging: string;
}