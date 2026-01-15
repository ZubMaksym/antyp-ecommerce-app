'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

const UserProfile = () => {
    const { isLoading, canAccess } = useAuth('User');

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
        </div>
    );
};

export default UserProfile;
