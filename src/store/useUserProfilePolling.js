import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from './hooks.js';
import { getUserProfileAsync } from './slices/userSlice.js';

export const useUserProfilePolling = () => {
    const dispatch = useAppDispatch();
    const { userInformation, profile, loading, error, lastFetched, lastUpdated } = useAppSelector((state) => state.user);
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const intervalRef = useRef(null);

    const fetchUserProfile = () => {
        if (isAuthenticated) {
            dispatch(getUserProfileAsync());
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchUserProfile();

            intervalRef.current = setInterval(fetchUserProfile, 60000);

            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
            };
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
    }, [isAuthenticated, dispatch]);

    const refreshProfile = () => {
        fetchUserProfile();
    };

    return {
        userInformation,
        profile,
        loading,
        error,
        lastFetched,
        lastUpdated,
        refreshProfile,
    };
}; 