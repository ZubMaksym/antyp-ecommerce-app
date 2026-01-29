
import { DropdownProps } from '@/types/componentTypes';
import Image from 'next/image';
import caret from '@/public/icons/shared/caretDropdownBold.svg';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import { toggleDropdown } from '@/state/dropdownState/dropdownState';

const Dropdown = ({ children, title, classname, id }: DropdownProps) => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.dropdown.dropdowns[id] || false);

    return (
        <div className=''>
            <div className='flex justify-between cursor-pointer' onClick={() => dispatch(toggleDropdown(id))}>
                <h1 className={classname}>
                    {title}
                </h1>
                <Image
                    src={caret}
                    width={25}
                    height={25}
                    alt='caret dropdown'
                    className={classNames(
                        'transition duration-300',
                        {
                            'rotate-180': isOpen,
                            'rotate-0': !isOpen,
                        }
                    )}
                />
            </div>
            <div className=''>
                {
                    isOpen && (
                        <div className=''>
                            {children}
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Dropdown;
