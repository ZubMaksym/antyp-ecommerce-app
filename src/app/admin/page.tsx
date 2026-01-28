'use client';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/auth/token';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AdminDashboard = () => {
    const { isLoading, canAccess } = useAuth('Admin');
    const router = useRouter();

    const logOut = async () => {
        const token = getAccessToken();

        const res = await fetch(`${API_BASE_URL}/api/Auth/logout`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: '*/*',
                'Content-Type': 'application/json',
            },
            credentials: 'include', // ← дуже важливо
            body: '', // порожнє тіло як у Swagger
        });

        if (!res.ok) throw new Error(await res.text());
        

        router.push('/login');
    };

    if (isLoading) {
        return <LoadingSpinner message='Loading...' />;
    }

    if (!canAccess) {
        // Show loading state while redirecting
        return <LoadingSpinner message='Redirecting...' />;
    }

    return (
        <div className='h-[calc(100vh-105px)]'>
            <aside className='shadow-xl border-[#4d6d7e] w-[250px] h-full'>
                <h1 className='text-[#4d6d7e] text-2xl font-black py-5 px-4 border-b border-[#4d6d7e]'>
                    Admin Dashboard
                </h1>
                <div className='flex flex-col *:text-[#4d6d7e] *:text-[18px] *:font-bold *:py-3 *:px-4 *:hover:bg-[#d7cdc3]'>
                    <Link href='/admin/orders'>Orders</Link>
                    <Link href='/admin/products'>Products</Link>
                    <Link href='/admin/users'>Users</Link>
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

export default AdminDashboard;
