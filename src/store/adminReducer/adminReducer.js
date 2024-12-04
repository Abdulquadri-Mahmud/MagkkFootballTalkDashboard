import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentAdmin: null,
    error: null,
    loading: false,
}

const adminReducer = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        adminSignupStart: (state) => {
            state.loading = true;
        },
        adminSignupSuccess: (state, action) => {
            state.currentAdmin = action.payload;
            state.loading = false;
            state.error = null;
        },
        adminSignupFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        adminSigninStart: (state) => {
            state.loading = true;
        },
        adminSigninSuccess: (state, action) => {
            state.currentAdmin = action.payload;
            state.loading = false;
            state.error = null;
        },
        adminSigninFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const {adminSignupStart,adminSignupFailure,
    adminSigninStart, adminSigninSuccess, adminSigninFailure
} = adminReducer.actions;

export default adminReducer.reducer;