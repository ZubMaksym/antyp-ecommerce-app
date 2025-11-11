import { useEffect } from 'react';

const useForbidBodyScroll = (isOpen: boolean, maxWidth: number) => {
    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${maxWidth}px)`);

        const handle = () => {
            if (isOpen && mediaQuery.matches) {
                document.body.classList.add('no-scroll');
            } else {
                document.body.classList.remove('no-scroll');
            }
        };

        handle();
        mediaQuery.addEventListener('change', handle);

        return () => {
            document.body.classList.remove('no-scroll');
            mediaQuery.removeEventListener('change', handle);
        };
    }, [isOpen]);
};

export default useForbidBodyScroll;