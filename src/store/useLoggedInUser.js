import { useAppSelector } from './hooks.js';
import {
    selectLoggedInUser,
    selectIsAuthenticated,
    selectAuthToken,
    selectAuthLoading,
    selectAuthError
} from './slices/authSlice.js';
import {
    selectUserInformation,
    selectUserProfile,
    selectUserLoading,
    selectUserError,
    selectLastFetched,
    selectLastUpdated
} from './slices/userSlice.js';

export const useLoggedInUser = () => {
    const user = useAppSelector(selectLoggedInUser);
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const token = useAppSelector(selectAuthToken);
    const loading = useAppSelector(selectAuthLoading);
    const error = useAppSelector(selectAuthError);

    return {
        user,
        isAuthenticated,
        token,
        loading,
        error,
    };
};

export const useUserInformation = () => {
    const userInformation = useAppSelector(selectUserInformation);
    const profile = useAppSelector(selectUserProfile);
    const loading = useAppSelector(selectUserLoading);
    const error = useAppSelector(selectUserError);
    const lastFetched = useAppSelector(selectLastFetched);
    const lastUpdated = useAppSelector(selectLastUpdated);

    return {
        userInformation,
        profile,
        loading,
        error,
        lastFetched,
        lastUpdated,
    };
}; 