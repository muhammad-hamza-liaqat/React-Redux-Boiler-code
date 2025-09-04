import React, { useState, useEffect } from 'react';

export function PageLoader({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const totalLoadingTime = setTimeout(() => {
            setIsLoading(false);
        }, 3000);

        return () => {
            clearTimeout(totalLoadingTime);
        };
    }, []);

    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center z-50">
                <div className="text-center">
                    <div className="flex justify-center space-x-4 items-end h-32">
                        <div
                            className="w-5 h-5 bg-blue-600 rounded-full"
                            style={{
                                animation: 'highBounce 1s infinite',
                                animationDelay: '0s'
                            }}
                        ></div>
                        <div
                            className="w-5 h-5 bg-blue-600 rounded-full"
                            style={{
                                animation: 'highBounce 1s infinite',
                                animationDelay: '0.1s'
                            }}
                        ></div>
                        <div
                            className="w-5 h-5 bg-blue-600 rounded-full"
                            style={{
                                animation: 'highBounce 1s infinite',
                                animationDelay: '0.2s'
                            }}
                        ></div>
                    </div>
                </div>

                <style>{`
                    @keyframes highBounce {
                        0%, 20%, 50%, 80%, 100% {
                            transform: translateY(0);
                        }
                        40% {
                            transform: translateY(-60px);
                        }
                        60% {
                            transform: translateY(-30px);
                        }
                    }
                `}</style>
            </div>
        );
    }

    return children;
}

export default PageLoader; 