import Image from 'next/image';
import instagramSVG from '@/public/icons/footer/instagram.svg';
import facebookSVG from '@/public/icons/footer/facebook.svg';
import Link from 'next/link';


const Footer = () => {
    return (
        <footer className='mt-[40px] px-5 py-[55px] bg-[#4D6D7E] min-h-[355px] flex flex-col justify-center items-center'>
            <div className='w-full flex flex-col xl:flex-row justify-between flex-wrap max-w-[1600px] lg:h-[250px] text-white'>
                <div className='mt-0 lg:mt-8'>
                    <h4 className='font-black text-[24px]'>
                        Stay Connected
                    </h4>
                    <div className='text-[20px] mt-1'>
                        See us on social media!
                    </div>
                    <div className='flex w-[65px] justify-between items-center mt-3'>
                        <Link href='https://www.instagram.com/chest_pivovara/' target='_blank'>
                            <Image
                                src={instagramSVG}
                                alt='instagram icon'
                                width={30}
                                height={30}
                            />
                        </Link>
                        <Link href='https://www.facebook.com/chestpivovara' target='_blank'>
                            <div className='w-[27px] h-[27px] bg-white rounded'>
                                <Image
                                    src={facebookSVG}
                                    alt='facebook icon'
                                    width={27}
                                    height={27}
                                />
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='mt-8'>
                    <h4 className='font-black text-[24px]'>
                        Shop
                    </h4>
                    <div className='flex flex-col *:transition-all *:duration-300 *:hover:text-[#F6EFE7] *:after:absolute *:after:left-0 
                        *:after:bottom-0 *:after:h-[1px] *:after:bg-white *:after:w-0 *:hover:after:w-full *:after:transition-all *:after:duration-300'>
                        <Link href='/' className='relative text-[20px] mt-1 w-fit'>
                            Shop our beer
                        </Link>
                        <Link href='/find_us' className='relative text-[20px] mt-1 w-fit'>
                            Find Us
                        </Link>
                    </div>
                </div>
                <div className='mt-8'>
                    <h4 className='font-black text-[24px]'>
                        Contact numbers
                    </h4>
                    <div className='text-[18px] font-medium mt-1 w-[270px] *:flex *:justify-between'>
                        <div className=''>
                            <span>Purchasing:</span><span>+380 50 380 06 50</span>
                        </div>
                        <div className=''>
                            <span>Sales:</span><span>+380 67 393 27 44</span>
                        </div>
                        <div className=''>
                            <span>Accounting:</span><span>+380 44 462 44 97</span>
                        </div>
                        <div className=''>
                            <span>Delivery:</span><span>+380 67 465 64 99</span>
                        </div>
                    </div>
                </div>
                <div className='mt-8'>
                    <h4 className='font-black text-[24px]'>
                        Email
                    </h4>
                    <div className='text-[18px] font-medium mt-1 *:flex *:justify-between flex flex-col *:transition-all *:duration-300 *:hover:text-[#F6EFE7] *:after:absolute *:after:left-0 
                        *:after:bottom-0 *:after:h-[1px] *:after:bg-white *:after:w-0 *:hover:after:w-full *:after:transition-all *:after:duration-300'>
                        <a
                            href='https://mail.google.com/mail/?view=cm&fs=1&to=dk.antyp@antyp.com.ua'
                            target='_blank'
                            className='relative no-underline text-[20px] mt-1 w-fit'
                        >
                            dk.antyp@antyp.com.ua
                        </a>

                        <a
                            href='https://mail.google.com/mail/?view=cm&fs=1&to=vip-torg@antyp.com.ua'
                            target='_blank'
                            className='relative no-underline text-[20px] mt-1 w-fit'
                        >
                            vip-torg@antyp.com.ua
                        </a>
                    </div>
                </div>
            </div>
            <div className='text-white text-[18px] mt-[30px] lg:mt-0'>
                © 2025 Antyp 
            </div>
        </footer>
    );
};

export default Footer;
