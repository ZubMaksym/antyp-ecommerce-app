'use client';

import { LoadingSpinnerProps } from '@/types/componentTypes';

const LoadingSpinner = ({
    message = 'Loading...',
    height = 'min-h-screen',
    size = 48,
    color = '#4d6d7e',
    showMessage = true,
}: LoadingSpinnerProps) => {
    return (
        <div className={`flex items-center justify-center ${height}`}>
            <div className='text-center'>
                <div
                    className='animate-spin rounded-full border-b-2 mx-auto'
                    style={{ width: size, height: size, borderColor: color }}
                ></div>
                {showMessage && message && <p className='mt-4 text-gray-600'>{message}</p>}
            </div>
        </div>
    );
};

export default LoadingSpinner;
