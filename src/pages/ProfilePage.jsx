import { useUserInformation } from '../store/index.js';
import { LoadingCard } from '../components/LoadingSpinner.jsx';

export function ProfilePage() {
    const { userInformation, loading, lastFetched, lastUpdated } = useUserInformation();

    if (loading && !userInformation) {
        return (
            <div className="space-y-6">
                <LoadingCard
                    title="Loading Profile"
                    message="Please wait while we fetch your profile data."
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                User Profile
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage your account information and preferences.
                            </p>
                        </div>
                        <div className="text-sm text-gray-500">
                            {lastFetched && `Last updated: ${new Date(lastFetched).toLocaleTimeString()}`}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h4>

                            {userInformation ? (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                            <div className="mt-1 p-3 bg-gray-50 rounded-md">
                                                <span className="text-gray-900">{userInformation.name}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                            <div className="mt-1 p-3 bg-gray-50 rounded-md">
                                                <span className="text-gray-900">{userInformation.email}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">User ID</label>
                                        <div className="mt-1 p-3 bg-gray-50 rounded-md">
                                            <span className="text-sm text-gray-600 font-mono">{userInformation._id}</span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Account Created</label>
                                            <div className="mt-1 p-3 bg-gray-50 rounded-md">
                                                <span className="text-gray-900">
                                                    {new Date(userInformation.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                                            <div className="mt-1 p-3 bg-gray-50 rounded-md">
                                                <span className="text-gray-900">
                                                    {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'Never'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="text-gray-500">
                                        {loading ? 'Loading profile...' : 'No profile data available'}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Profile Statistics</h4>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Account Status</span>
                                    <span className="text-sm font-medium text-green-600">Active</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Last Login</span>
                                    <span className="text-sm font-medium text-gray-900">Today</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-gray-500">Data Sync</span>
                                    <span className="text-sm font-medium text-blue-600">Live</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Sync Status</h4>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                    <span className="text-sm text-gray-600">Auto-refresh enabled</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                                    <span className="text-sm text-gray-600">1-minute intervals</span>
                                </div>
                                {lastFetched && (
                                    <div className="flex items-center">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                                        <span className="text-sm text-gray-600">
                                            Last sync: {new Date(lastFetched).toLocaleTimeString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
