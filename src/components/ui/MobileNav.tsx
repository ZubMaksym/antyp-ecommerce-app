import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { Sling as Hamburger } from 'hamburger-react';
import { navLinksData } from '@/utils/data';
import Link from 'next/link';
import { ModalProps } from '@/types/componentTypes';


const MobileNav = ({ isOpen, setIsOpen }: ModalProps) => {
    const [portalRoot, setPortalRoot] = useState<Element | null>(null);

    useEffect(() => {
        const el = document.querySelector('#portal');
        setPortalRoot(el);
    }, []);

    if (!portalRoot) return null;

    return ReactDOM.createPortal(
        <aside>
            <div
                tabIndex={0}
                className={classNames(
                    'lg:hidden fixed top-0 left-0 right-0 bottom-0 bg-[#ededed]/75 z-60 transition-opacity duration-550',
                    {
                        'opacity-100 pointer-events-auto': isOpen,
                        'opacity-0 pointer-events-none': !isOpen,
                    }
                )}
                onClick={() => setIsOpen(false)}
            />
            <nav
                className={classNames(
                    'lg:hidden fixed top-0 left-0 z-70 bg-white h-full w-full max-w-[768px] transform transition-transform duration-550 ease-in-out',
                    {
                        '-translate-x-0': isOpen,
                        '-translate-x-full': !isOpen,
                    }
                )}
            >
                <div className='absolute top-3 right-3'>
                    <Hamburger
                        size={18}
                        color='#4d6d7e'
                        toggled={isOpen}
                        duration={0.6}
                        toggle={() => setIsOpen(false)}
                    />
                </div>
                <div className='flex flex-col px-[15px] py-[75px] *:first:border-t'>
                    {
                        navLinksData.map((data) => (
                            <Link
                                className='h-[60px] flex items-center border-b border-[#D2DADF] text-[14px] font-black text-[#4d6d7e]'
                                href={data.href}
                                key={data.linkText}
                            >
                                {data.linkText}
                            </Link>
                        ))
                    }
                </div>
                <Link
                    className='absolute bottom-3 left-[15px] text-[14px] font-black text-[#4d6d7e]'
                    href='/login'
                >
                    Log In
                </Link>
            </nav>
        </aside>,
        portalRoot
    );
};

export default MobileNav;
