import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/index.js';
import { logout } from '../store/index.js';
import { useUserProfilePolling } from '../store/index.js';
import {
    HomeIcon,
    UserIcon,
    CogIcon,
    ChartBarIcon,
    DocumentTextIcon,
    BellIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { DashboardPage } from '../pages/DashboardPage.jsx';
import { ProfilePage } from '../pages/ProfilePage.jsx';

function SidebarLayout({ children }) {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const [activePage, setActivePage] = useState('dashboard');

    useUserProfilePolling();

    const handleLogout = () => {
        dispatch(logout());
    };

    const menuItems = [
        { id: 'dashboard', name: 'Dashboard', icon: HomeIcon },
        { id: 'profile', name: 'Profile', icon: UserIcon },
        { id: 'settings', name: 'Settings', icon: CogIcon },
        { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
        { id: 'documents', name: 'Documents', icon: DocumentTextIcon },
        { id: 'notifications', name: 'Notifications', icon: BellIcon },
    ];

    const renderContent = () => {
        switch (activePage) {
            case 'dashboard':
                return <DashboardPage />;
            case 'profile':
                return <ProfilePage />;
            case 'settings':
                return (
                    <div className="space-y-6">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Settings</h3>
                                <p className="mt-1 text-sm text-gray-500">Manage your application settings.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'analytics':
                return (
                    <div className="space-y-6">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Analytics</h3>
                                <p className="mt-1 text-sm text-gray-500">View your data analytics and insights.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'documents':
                return (
                    <div className="space-y-6">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Documents</h3>
                                <p className="mt-1 text-sm text-gray-500">Manage your documents and files.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="space-y-6">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="px-4 py-5 sm:p-6">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Notifications</h3>
                                <p className="mt-1 text-sm text-gray-500">View and manage your notifications.</p>
                            </div>
                        </div>
                    </div>
                );
            default:
                return <DashboardPage />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
                <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
                    <h1 className="text-xl font-bold text-white">Vox App</h1>
                </div>

                <div className="px-4 py-6 border-b border-gray-200">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <UserIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{user?.email}</p>
                            <p className="text-xs text-gray-500">Online</p>
                        </div>
                    </div>
                </div>

                <nav className="px-4 py-6">
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.id}>
                                    <button
                                        onClick={() => setActivePage(item.id)}
                                        className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${activePage === item.id
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5 mr-3" />
                                        {item.name}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                        <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-3" />
                        Logout
                    </button>
                </div>
            </div>

            <div className="ml-64">
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {menuItems.find(item => item.id === activePage)?.name || 'Dashboard'}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    Welcome back, {user?.email}
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button className="p-2 text-gray-400 hover:text-gray-600">
                                    <BellIcon className="w-6 h-6" />
                                </button>
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <UserIcon className="w-5 h-5 text-blue-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="p-6">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

export default SidebarLayout; 