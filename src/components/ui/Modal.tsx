import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { SearchProps } from '@/types/componentTypes';
import Image from 'next/image';
import closeSVG from '@/public/icons/shared/close.svg';

const Modal = ({ isOpen, setIsOpen, children }: SearchProps) => {
    const [portalRoot, setPortalRoot] = useState<Element | null>(null);

    useEffect(() => {
        const el = document.querySelector('#portal');
        setPortalRoot(el);
    }, []);

    if (!portalRoot) return null;

    return ReactDOM.createPortal(
        <aside className={classNames(
        )}>
            <div
                tabIndex={0}
                className={classNames(
                    'fixed top-0 left-0 right-0 bottom-0 bg-[#ededed]/75 z-40 transition-opacity duration-550',
                    {
                        'opacity-100 pointer-events-auto': isOpen,
                        'opacity-0 pointer-events-none': !isOpen,
                    }
                )}
                onClick={() => setIsOpen(false)}
            />
            <div className={classNames(
                'fixed top-0 right-0 z-50 bg-[#F6EFE7] w-full max-w-[768px] transform transition-transform duration-550 ease-in-out border',
                {
                    'translate-x-0 md:top-[20px] md:bottom-[20px] md:right-[20px]': isOpen,
                    'translate-x-full md:top-[20px] md:right-0': !isOpen,
                }
            )}>
                <button
                    className='absolute top-3 right-3'
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
                <div className='px-[15px] py-[75px]'>
                    {children}
                </div>
            </div>
        </aside>,
        portalRoot
    );
};

export default Modal;
