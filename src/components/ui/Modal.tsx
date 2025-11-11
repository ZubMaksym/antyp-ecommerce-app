import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { SearchProps } from '@/types/componentTypes';
import Image from 'next/image';
import closeSVG from '@/public/icons/shared/close.svg';
import useForbidBodyScroll from '@/hooks/useForbidBodyScroll';

const Modal = ({ isOpen, setIsOpen, children, title }: SearchProps) => {
    const [portalRoot, setPortalRoot] = useState<Element | null>(null);

    useEffect(() => {
        const el = document.querySelector('#portal');
        setPortalRoot(el);
    }, []);

    useForbidBodyScroll(isOpen, 20000);

    if (!portalRoot) return null;

    return ReactDOM.createPortal(
        <aside className={classNames(
        )}>
            <div
                tabIndex={0}
                className={classNames(
                    'fixed top-0 left-0 right-0 bottom-0 bg-[#ededed]/75 z-60 transition-opacity duration-550',
                    {
                        'opacity-100 pointer-events-auto': isOpen,
                        'opacity-0 pointer-events-none': !isOpen,
                    }
                )}
                onClick={() => setIsOpen(false)}
            />
            <div className={classNames(
                'fixed top-0 right-0 z-70 bg-[#F6EFE7] h-[100vh] md:h-auto w-full max-w-[550px] transform transition-transform duration-550 ease-in-out md:rounded-3xl',
                {
                    'translate-x-0 md:top-[20px] md:bottom-[20px] md:right-[20px]': isOpen,
                    'translate-x-full md:top-[20px] md:bottom-[20px] md:right-0': !isOpen,
                }
            )}>
                <button
                    className='absolute top-6 right-4 cursor-pointer'
                    onClick={() => setIsOpen(false)}
                >
                    <Image
                        loading='lazy'
                        width={20}
                        height={20}
                        src={closeSVG}
                        alt='close icon'
                    />
                </button>
                <div className='absolute top-4 left-4 text-[27px] font-black text-[#4d6d7e]'>
                    {title}
                </div>
                <div className='px-[15px] py-[100px]'>
                    {children}
                </div>
            </div>
        </aside>,
        portalRoot
    );
};

export default Modal;
