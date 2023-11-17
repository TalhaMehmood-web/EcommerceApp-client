import { createSlice } from "@reduxjs/toolkit";
import { getCarts } from "../Actions/Action";

const initialState = {
    cart: [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getCarts.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getCarts.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.cart = action.payload;
                state.error = null;
            })
            .addCase(getCarts.rejected, (state, action) => {
                state.loading = 'rejected';
                state.error = action.error.message;
            });
    },
})
export const { retrieveCart } = cartSlice.actions;

export default cartSlice.reducer;