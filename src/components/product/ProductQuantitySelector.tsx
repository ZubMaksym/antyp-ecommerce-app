'use client';
import { ChangeEvent } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import plus from '@/public/icons/shared/plus.svg';
import minus from '@/public/icons/shared/minus.svg';
import { Packaging, ProductItem } from '@/types/reducerTypes';
import { incrementQuantity, decrementQuantity, handleQuantityChange } from '@/utils/helpers';

interface ProductQuantitySelectorProps {
    product: ProductItem;
    quantity: number;
    setQuantity: (quantity: number) => void;
    packaging: string;
    setPackaging: (packaging: string) => void;
    onAddToCart: () => void;
}

const ProductQuantitySelector = ({
    product,
    quantity,
    setQuantity,
    packaging,
    setPackaging,
    onAddToCart,
}: ProductQuantitySelectorProps) => {
    const currentPackaging = product.packagings.find((pack: Packaging) => pack.name === packaging);
    const multiplicity = currentPackaging?.multiplicity || 1;

    return (
        <>
            <div className='flex justify-between mt-4'>
                <div className='rounded-xl bg-white w-[145px] h-[50px] flex items-center justify-around border border-[#D2DADF]'>
                    <button
                        className='ml-3 cursor-pointer'
                        onClick={() => decrementQuantity(quantity, setQuantity, multiplicity)}
                    >
                        <Image src={minus} alt='minus' width={20} height={20} />
                    </button>
                    <input
                        type='number'
                        value={quantity}
                        className='text-[#4d6d7e] text-center font-extrabold w-[40px] no-spinner appearance-none 
                            outline-none border-none bg-transparent'
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleQuantityChange(e, setQuantity, multiplicity)
                        }
                    />
                    <button
                        className='mr-3 cursor-pointer'
                        onClick={() => incrementQuantity(quantity, setQuantity)}
                    >
                        <Image src={plus} alt='plus' width={20} height={20} />
                    </button>
                </div>
                <select
                    className='text-[#4d6d7e] font-extrabold *:text-[#4d6d7e] *:font-extrabold rounded-xl ml-3
                        bg-white h-[50px] flex items-center justify-around border border-[#D2DADF] w-full *:text-center'
                    onChange={(e) => {
                        setPackaging(e.target.value);
                        const newPackaging = product.packagings.find(
                            (pack: Packaging) => pack.name === e.target.value
                        );
                        setQuantity(newPackaging?.multiplicity || 1);
                    }}
                >
                    {product.packagings.map((pack) => (
                        <option key={pack.id} value={pack.name}>
                            {pack.name}
                        </option>
                    ))}
                </select>
            </div>
            <Button
                apearence='primary'
                classname='h-[45px] w-full my-3'
                onClick={onAddToCart}
            >
                <span className='flex justify-center px-3 font-extrabold'>Add to cart</span>
            </Button>
        </>
    );
};

export default ProductQuantitySelector;
