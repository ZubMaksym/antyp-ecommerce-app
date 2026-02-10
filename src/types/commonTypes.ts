export type JwtPayload = {
    sub: string;
    unique_name: string;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': 'Admin' | 'User';
    exp: number;
    iss: string;
    aud: string;
};

export type AdminAction = 'create' | 'edit' | 'delete';

export type Manufacturer = {
    id: string;
    name: string;
    shortName: string;
    aboutUrl: string | null;
    photoUrl: string | null;
};

export type Packaging = {
    name: string;
    shortName: string | null;
};

export type ModalMode = 'create' | 'edit' | 'delete' | null;

export type FilterTypeId =
    | 'beer-type'
    | 'season-tag'
    | 'carbonation-level'
    | 'water-type'
    | 'soft-drink-type'
    | 'wine-color'
    | 'wine-sweetness'
    | 'ingredient';

export type FilterItem = {
    id: number;
    name: string;
};