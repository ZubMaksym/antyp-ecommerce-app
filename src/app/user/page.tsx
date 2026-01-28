'use client';
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';
import { getAccessToken } from '@/auth/token';
import { clearAccessToken } from '@/auth/token';
import { useRouter } from 'next/navigation';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const UserProfile = () => {
    const { isLoading, canAccess } = useAuth('User');
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

        clearAccessToken();
        router.push('/login');
    };

    if (isLoading) {
        return <LoadingSpinner message="Loading..." />;
    }

    if (!canAccess) {
        // Show loading state while redirecting
        return <LoadingSpinner message="Redirecting..." height="h-[calc(100vh-105px)]" />;
    }

    return (
        <div className="container mx-auto px-4 py-8 h-[calc(100vh-105px)]">
            <h1 className="text-3xl font-bold mb-4">User Profile</h1>
            <p className="text-gray-600">Welcome to your profile. You have User privileges.</p>
            <Button
                onClick={logOut}
                classname='w-[250px] text-[16px] font-bold h-[36px]'
                apearence='primary'
            >
                Logout
            </Button>
        </div>
    );
};

export default UserProfile;
