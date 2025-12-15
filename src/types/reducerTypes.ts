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
    ibu?: number | null;
    alcoholStrength?: number | null;
    beerType?: { id: string; name: string } | null;
    carbonationLevel?: { id: string; name: string } | null;
    waterType?: { id: string; name: string } | null;
    softDrinkType?: { id: string; name: string } | null;
    wineColor?: { id: string; name: string } | null;
    wineSweetness?: { id: string; name: string } | null;
    isSparking?: boolean | null;
    packagings: Packaging[];
    // manufacturer?: { id: string; name: string; shortName: string; aboutUrl?: string | null; photoUrl?: string | null } | null;
    // packagings?: { id: string; name: string; photoUrl?: string | null }[];
    // productType?: string;
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

export interface Packaging {
    id: string;
    name: string;
    photoUrl: string | null;
}