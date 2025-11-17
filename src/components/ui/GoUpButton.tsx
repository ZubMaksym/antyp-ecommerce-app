

import { scrollTo } from '@/utils/helpers';
import { useEffect, useState } from 'react';

const GoUpButton = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) setShow(true);
            else setShow(false);
        };

        window.addEventListener('scroll', handleScroll);

        // викликаємо одразу, щоб стан був коректним при першому рендері
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!show) return null;

    return (
        <button
            className='bg-white text-[#4d6d7e] rounded-[50%] w-[50px] h-[50px]
                       fixed bottom-[30px] right-[30px] flex justify-center rotate-270 pb-[4.5px]
                       items-center cursor-pointer z-[1000] text-[24px]'
            onClick={() => scrollTo(0)}
        >
            &#x279C;
        </button>
    );
};

export default GoUpButton;