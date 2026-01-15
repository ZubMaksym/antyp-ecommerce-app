'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/auth/token';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const AdminDashboard = () => {
    const { isLoading, canAccess } = useAuth('Admin');
    const router = useRouter();

    const logOut = async () => {
        const token = getAccessToken();
    
        const res = await fetch(`http://62.171.154.171:21000/api/Auth/logout`, {
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
        return <LoadingSpinner message="Loading..." />;
    }

    if (!canAccess) {
        // Show loading state while redirecting
        return <LoadingSpinner message="Redirecting..." />;
    }

    return (
        <div className="container mx-auto px-4 py-8 h-[calc(100vh-105px)]">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <p className="text-gray-600">Welcome to the admin panel. You have Admin privileges.</p>
            {/* <button onClick={logOut} className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                log out
            </button> */}
        </div>
    );
};

export default AdminDashboard;
