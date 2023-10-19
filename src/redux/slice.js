import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    dataSelected: [],
    user: null, // You can set the initial value to null or an appropriate default value
    tickets: [],
    users: [],
    message: null, // You can set the initial value to null or an appropriate default value
};

export const dataSlice = createReducer(initialState, {
    dataRequest: (state) => {
        state.loading = true;
    },
    dataSuccess: (state, action) => {
        state.loading = false;
        state.tickets = action.payload.tickets;
        state.users = action.payload.users;
    },
    dataFailure: (state) => {
        state.loading = false;
        state.tickets = [];
        state.users = [];
    },
    dataSelectRequest: (state) => {
        state.loading = true;
        state.dataSelected = [];
        state.user = null; // Reset user data
        state.message = null; // Reset error message
    },
    dataSelectSuccess: (state, action) => {
        state.loading = false;
        state.dataSelected = action.payload.dataSelected;
        state.user = action.payload.user;
        state.message = null; // Reset error message
    },
    dataSelectFailure: (state, action) => {
        state.loading = false;
        state.dataSelected = [];
        state.user = null; // Reset user data
        state.message = action.payload.message;
    },
});

// export default dataSlice;
