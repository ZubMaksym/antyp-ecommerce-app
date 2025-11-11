import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { useState, useEffect } from 'react';
import { Sling as Hamburger } from 'hamburger-react';
import { ModalProps } from '@/types/componentTypes';
import Button from '../ui/Button';
import DesktopFilters from './DesktopFilters';

const MobileFilters = ({ isOpen, setIsOpen }: ModalProps) => {
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
                <div
                    className={classNames(
                        'lg:hidden fixed top-0 left-0 z-70 bg-white h-full w-full transform transition-transform duration-550 ease-in-out',
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
                    <div className=''>
                        <div className='bg-[#4d6d7e] relative top-[68px] mr:0 mx-[30px] h-[2px]'/>
                    </div>
                    <div className='flex flex-col mr-[30px] py-[75px]'>
                        <DesktopFilters isOpen={isOpen} setIsOpen={setIsOpen}/>
                    </div>
                </div>
        </aside>,
        portalRoot
    );
};

export default MobileFilters;
