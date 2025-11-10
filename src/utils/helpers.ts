export const scrollTo = (top: number) => {
    window.scrollTo({
        top: top,
        behavior: 'smooth'
    });
};