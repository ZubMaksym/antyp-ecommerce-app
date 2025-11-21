export interface IPrevNext {
    prevCategory: {
        name: string;
        route: string;
        image: string;
    } | null;
    nextCategory: {
        name: string;
        route: string;
        image: string;
    } | null;
}

// export interface CheckoutFormFields {
//     firstName: string;
//     lastName: string;
//     company: string;
//     phoneNumber: number;
// }