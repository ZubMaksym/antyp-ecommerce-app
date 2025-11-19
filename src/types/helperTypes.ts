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