import React, { useState } from 'react';
import { AddToCartButtonProps } from '@/types/componentTypes';
import classNames from 'classnames';

const AddToCartButton = ({ product, handleClick, isMobile }: AddToCartButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    if (isMobile) {
        return (
            <div className='relative group mx-auto md:hidden block w-full mt-3 mt-auto'>
                <div className={classNames(
                    `absolute bottom-full left-0 w-full z-10
                    bg-white border rounded-lg shadow-lg
                    transition-all duration-300 ease-out rounded-b-none
                    pointer-events-auto`,
                    {
                        'opacity-100 translate-y-0': isOpen,
                        'opacity-0 translate-y-2 pointer-events-none': !isOpen,
                        'hidden': product.packagings.length <= 1,
                    }
                )}>
                    <div className='p-1 flex flex-col gap-0'>
                        {product.packagings.map(p => (
                            <button
                                key={p.name}
                                className='px-3 py-1 rounded font-bold text-[#4d6d7e] cursor-pointer'
                                onClick={(e) => {
                                    handleClick(e, { ...product, quantity: product.multiplicity || 1, packaging: p.name });
                                }}
                            >
                                {p.name}
                            </button>
                        ))}
                    </div>
                </div>
                <button
                    className={classNames(
                        `transition-all duration-300 ease-in-out
                        w-full h-[35px] cursor-pointer
                        rounded-lg
                        border border-[#4d6d7e]
                        text-[#4d6d7e] group-hover:text-white
                        group-hover:bg-[#4d6d7e]`,
                        {
                            'rounded-t-none': isOpen
                        }
                    )}
                    onClick={(e) => {
                        e.stopPropagation();
                        product.packagings.length <= 1 
                            ? handleClick(e, { ...product, quantity: product.multiplicity || 1, packaging: product.packagings[0].name }) 
                            : setIsOpen(!isOpen);
                    }}
                >
                    <div className='flex justify-center px-3 font-extrabold'>
                        <span>Add To Cart</span>
                    </div>
                </button>
        </div >);
    }

    return (
        <div className='relative group mx-auto hidden md:block w-[95%]'>
            <div className={classNames(
                `absolute bottom-full left-0 w-full
                bg-white border rounded-lg shadow-lg
                opacity-0 translate-y-4
                group-hover:opacity-100 group-hover:translate-y-0
                transition-all duration-300 ease-out rounded-b-none
                pointer-events-none group-hover:pointer-events-auto`,
                {
                    'hidden': product.packagings.length <= 1
                }
            )}
            >
                <div className='p-1 flex flex-col gap-0'>
                    {product.packagings.map(p => (
                        <button
                            key={p.name}
                            className='hover:bg-gray-100 px-3 py-1 rounded font-bold text-[#4d6d7e] cursor-pointer'
                            onClick={(e) =>
                                handleClick(e, { ...product, quantity: product.multiplicity || 1, packaging: p.name })
                            }
                        >
                            {p.name}
                        </button>
                    ))}
                </div>
            </div>
            <button
                className={classNames(
                    `transition-all duration-300 ease-in-out
                    w-full h-[35px] cursor-pointer
                    rounded-lg
                    border border-[#4d6d7e]
                    text-[#4d6d7e] group-hover:text-white
                    group-hover:bg-[#4d6d7e]`,
                    {
                        'group-hover:rounded-t-none': product.packagings.length > 1
                    }
                )}
                onClick={(e) =>
                    handleClick(e, { ...product, quantity: product.multiplicity || 1, packaging: product.packagings[0].name })
                }
            >
                <div className='flex justify-center px-3 font-extrabold'>
                    <span>Add To Cart</span>
                </div>
            </button>
        </div >
    );
};

export default AddToCartButton;