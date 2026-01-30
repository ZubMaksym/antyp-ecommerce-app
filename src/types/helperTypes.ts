export type JwtPayload = {
    sub: string;
    unique_name: string;
    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': 'Admin' | 'User';
    exp: number;
    iss: string;
    aud: string;
};

export type AdminAction = 'create' | 'edit' | 'delete';