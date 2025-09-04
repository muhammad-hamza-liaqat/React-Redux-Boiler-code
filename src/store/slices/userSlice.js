import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserProfile } from '../../services/index.js';

// Async thunk for getting user profile with change detection
export const getUserProfileAsync = createAsyncThunk(
    'user/getUserProfile',
    async (_, { rejectWithValue, getState }) => {
        try {
            const response = await getUserProfile();

            // Check if user data has changed
            const currentUser = getState().user.userInformation;
            const newUserData = response.data;

            // Compare user data to detect changes
            const hasChanged = !currentUser ||
                currentUser.name !== newUserData.name ||
                currentUser.email !== newUserData.email ||
                currentUser.profileImage !== newUserData.profileImage ||
                JSON.stringify(currentUser.preferenceProgramming) !== JSON.stringify(newUserData.preferenceProgramming);

            return {
                data: newUserData,
                hasChanged
            };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const initialState = {
    userInformation: null,
    profile: null,
    loading: false,
    error: null,
    lastFetched: null,
    lastUpdated: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserError: (state) => {
            state.error = null;
        },
        setUserInformation: (state, action) => {
            state.userInformation = action.payload;
            state.lastUpdated = new Date().toISOString();
        },
        setProfile: (state, action) => {
            state.profile = action.payload;
            state.lastFetched = new Date().toISOString();
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfileAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserProfileAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.userInformation = action.payload.data;
                state.profile = action.payload.data;
                state.lastFetched = new Date().toISOString();

                if (action.payload.hasChanged) {
                    state.lastUpdated = new Date().toISOString();
                }

                state.error = null;
            })
            .addCase(getUserProfileAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearUserError, setUserInformation, setProfile } = userSlice.actions;

export const selectUserInformation = (state) => state.user.userInformation;
export const selectUserProfile = (state) => state.user.profile;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
export const selectLastFetched = (state) => state.user.lastFetched;
export const selectLastUpdated = (state) => state.user.lastUpdated;

export default userSlice.reducer; 