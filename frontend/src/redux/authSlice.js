import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userData: null,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
            console.log("User data set:", action.payload);
        },
        logout: (state) => {
            state.userData = null;
        }
    },
});

export const { setUserData, logout } = authSlice.actions;

export default authSlice.reducer; 