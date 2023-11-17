// Products.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "../Actions/Action";

const initialState = {
    products: [],
    loading: false,
};

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
            });
    },
});

export default productsSlice.reducer;
