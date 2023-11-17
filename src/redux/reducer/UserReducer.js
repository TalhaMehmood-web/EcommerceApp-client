import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../Actions/Action";

const initialState = {
    user: {},
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.user = action.payload;
                state.error = null;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = 'rejected';
                state.error = action.error.message;
            });
    },
})
export const { retrieveUser } = userSlice.actions;

export default userSlice.reducer;