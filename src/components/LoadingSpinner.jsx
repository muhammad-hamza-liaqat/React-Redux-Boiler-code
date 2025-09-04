import React from 'react';

function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12'
    };

    return (
        <div className="flex items-center justify-center space-x-2">
            <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-blue-600`}></div>
            <span className="text-sm text-gray-600">{text}</span>
        </div>
    );
}

export function LoadingCard({ title = 'Loading...', message = 'Please wait while we fetch your data.' }) {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <div className="text-center">
                    <LoadingSpinner size="lg" text="" />
                    <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
                    <p className="mt-2 text-sm text-gray-500">{message}</p>
                </div>
            </div>
        </div>
    );
}

export function LoadingOverlay({ isVisible, text = 'Loading...' }) {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-xl">
                <LoadingSpinner size="lg" text={text} />
            </div>
        </div>
    );
}

export default LoadingSpinner; 