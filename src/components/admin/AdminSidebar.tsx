import Link from 'next/link';
import Button from '@/components/ui/Button';
import { getAccessToken } from '@/auth/token';
import { useRouter, usePathname } from 'next/navigation';
import { clearAccessToken } from '@/auth/token';
import classNames from 'classnames';
import Dropdown from '@/components/common/Dropdown';
import { adminProductLinks, adminMainLinks } from '@/utils/data';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AdminSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const logOut = async () => {
        const token = getAccessToken();

        const res = await fetch(`${API_BASE_URL}/api/Auth/logout`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: '*/*',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: '',
        });

        if (!res.ok) throw new Error(await res.text());

        clearAccessToken();
        router.push('/login');
    };

    return (
        <div className='min-h-[calc(100vh-105px)]'>
            <aside className='shadow-xl border-[#4d6d7e] w-[250px] h-full'>
                <h1 className='text-[#4d6d7e] text-2xl font-black py-5 px-4 border-b border-[#4d6d7e]'>
                    Admin Dashboard
                </h1>
                <div className='flex flex-col *:text-[#4d6d7e] *:text-[18px] *:py-3 *:px-4'>
                    <Dropdown
                        id='admin-products'
                        title='Products'
                        classname='font-medium *:text-[#4d6d7e] *:text-[18px]'
                    >
                        <div className='flex flex-col *:first:mt-1 *:hover:bg-[#d7cdc3] *:px-2 *:py-1'>
                            {adminProductLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={classNames(
                                        'hover:bg-[#d7cdc3]',
                                        {
                                            'font-bold': pathname === link.href,
                                            'font-medium': pathname !== link.href
                                        }
                                    )}
                                >
                                    {link.title}
                                </Link>
                            ))}
                        </div>
                    </Dropdown>
                    {adminMainLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={classNames(
                                'hover:bg-[#d7cdc3]',
                                {
                                    'font-bold': pathname === link.href,
                                    'font-medium': pathname !== link.href
                                }
                            )}
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
                <div className='py-3 px-4'>
                    <Button
                        onClick={logOut}
                        classname='w-full text-[16px] font-bold h-[36px]'
                        apearence='primary'
                    >
                        Logout
                    </Button>
                </div>
            </aside>
        </div>
    );
};

export default AdminSidebar;