import { useUserInformation } from '../store/index.js';
import { LoadingCard } from '../components/LoadingSpinner.jsx';

export function DashboardPage() {
    const { userInformation, loading, lastFetched, lastUpdated } = useUserInformation();

    if (loading && !userInformation) {
        return (
            <div className="space-y-6">
                <LoadingCard
                    title="Loading Dashboard"
                    message="Please wait while we fetch your dashboard data."
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Welcome to Your Dashboard
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Here's an overview of your account and recent activity.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                User Profile
                            </h3>
                            <div className="text-sm text-gray-500">
                                {lastFetched && `Last updated: ${new Date(lastFetched).toLocaleTimeString()}`}
                            </div>
                        </div>

                        {userInformation ? (
                            <div className="mt-4 space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Name:</span>
                                    <span className="font-medium">{userInformation.name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Email:</span>
                                    <span className="font-medium">{userInformation.email}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">User ID:</span>
                                    <span className="font-medium text-sm">{userInformation._id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Created:</span>
                                    <span className="font-medium">
                                        {new Date(userInformation.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                {lastUpdated && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Last Updated:</span>
                                        <span className="font-medium text-sm">
                                            {new Date(lastUpdated).toLocaleString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="mt-4 text-gray-500">
                                {loading ? 'Loading profile...' : 'No profile data available'}
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Auto-refresh Status
                        </h3>
                        <div className="mt-4 space-y-3">
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-600">
                                    Profile refreshes automatically every 1 minute
                                </span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-600">
                                    Manual refresh available
                                </span>
                            </div>
                            <div className="flex items-center">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                                <span className="text-sm text-gray-600">
                                    Real-time data synchronization with change detection
                                </span>
                            </div>
                            {lastFetched && (
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                                    <span className="text-sm text-gray-600">
                                        Last fetched: {new Date(lastFetched).toLocaleTimeString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                                    <span className="text-blue-600 font-semibold">1</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Active Sessions
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        1
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                                    <span className="text-green-600 font-semibold">✓</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Account Status
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        Active
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                                    <span className="text-yellow-600 font-semibold">⚡</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Last Activity
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        Now
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                                    <span className="text-purple-600 font-semibold">📊</span>
                                </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                                <dl>
                                    <dt className="text-sm font-medium text-gray-500 truncate">
                                        Data Sync
                                    </dt>
                                    <dd className="text-lg font-medium text-gray-900">
                                        Live
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage; 