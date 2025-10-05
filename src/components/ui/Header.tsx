'use client';
import beerSVG from '@/public/icons/header/beer.svg';
import cartSVG from '@/public/icons/header/cart.svg';
import searchSVG from '@/public/icons/header/search.svg';
import profileSVG from '@/public/icons/header/profile.svg';
import Image from 'next/image';
import { Sling as Hamburger } from 'hamburger-react';
import Link from 'next/link';
import { useState } from 'react';
import MobileNav from './MobileNav';
import { navLinksData } from '@/utils/data';
import Modal from './Modal';

const Header = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <header className='relative h-[60px] lg:h-[105px] xl:h-[85px] w-full bg-[#f6efe7] flex justify-between items-center border-b border-[#4d6d7e]'>
            <div>
                <div className='lg:hidden'>
                    <Hamburger
                        size={18}
                        color='#4d6d7e'
                        toggled={isNavOpen}
                        toggle={() => setIsNavOpen(!isNavOpen)}
                    />
                </div>
                <nav
                    className='hidden lg:flex mt-[12px] lg:ml-[30px] lg:flex-wrap lg:gap-5 xl:justify-between xl:w-[370px] lg:w-[200px] lg:h-[70px] xl:h-[30px]'
                >
                    {
                        navLinksData.map((data) => (
                            <Link
                                className='h-[22px] text-[14px] font-black text-[#4d6d7e] relative transition-all duration-300
                                    hover:text-[#737373] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-[#737373]
                                    after:w-0 hover:after:w-full after:transition-all after:duration-300'
                                href={data.href}
                                key={data.linkText}
                            >
                                {data.linkText}
                            </Link>
                        ))
                    }
                </nav>
                <MobileNav isOpen={isNavOpen} setIsOpen={setIsNavOpen} />
            </div>
            <div className='absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[120px] lg:w-[170px] text-[28px] lg:text-[42px] text-[#4d6d7e] font-extrabold'>
                <Link href='/' className='flex justify-between'>
                    <Image
                        loading='lazy'
                        width={30}
                        height={30}
                        className='mt-1 w-[30px] lg:w-[35px]'
                        src={beerSVG}
                        alt='beer icon'
                    />
                    Antyp
                </Link>
            </div>
            <div>
                <div className='flex justify-between items-center lg:mr-[30px] mr-[12px] w-[70px] lg:w-[120px]'>
                    <button 
                        className='cursor-pointer'
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                    >
                        <Image
                            loading='lazy'
                            width={25}
                            height={25}
                            src={searchSVG}
                            alt='search icon'
                        />
                    </button>
                    <Link href='/login' className='cursor-pointer hidden lg:block'>
                        <Image
                            loading='lazy'
                            width={25}
                            height={25}
                            src={profileSVG}
                            alt='profile icon'
                        />
                    </Link>
                    <button className='cursor-pointer'>
                        <Image
                            loading='lazy'
                            width={30}
                            height={30}
                            src={cartSVG}
                            alt='cart icon'
                        />
                    </button>
                </div>
            </div>
            <Modal isOpen={isSearchOpen} setIsOpen={setIsSearchOpen}>
                sds
            </Modal>
        </header >
    );
};

export default Header;
