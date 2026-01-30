'use client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useAuth } from '@/hooks/useAuth';


const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const { isLoading, canAccess } = useAuth('Admin');

    if (isLoading) {
        return (
            <LoadingSpinner
                message='Loading...'
                height='h-[calc(100vh-105px)]'
            />
        );
    }

    if (!canAccess) {
        return (
            <LoadingSpinner
                message='Redirecting...'
                height='h-[calc(100vh-105px)]'
            />
        );
    }

    return (
        <section className='flex'>
            <AdminSidebar />
            <div className='flex-1'>
                {children}
            </div>
        </section>
    );
};

export default AdminLayout;
