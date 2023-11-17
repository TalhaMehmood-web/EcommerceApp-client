import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from "../Actions/Action";

const initialState = {
    order: [],
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(getOrders.fulfilled, (state, action) => {
                state.loading = 'fulfilled';
                state.order = action.payload;
                state.error = null;
            })
            .addCase(getOrders.rejected, (state, action) => {
                state.loading = 'rejected';
                state.error = action.error.message;
            });
    },
})
export const { retrieveOrder } = orderSlice.actions;

export default orderSlice.reducer;