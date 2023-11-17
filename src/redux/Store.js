// store.js
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducer/ProductsReducer.js"; // Import the reducer directly
import UserReducer from "./reducer/UserReducer.js";
import CartReducer from "./reducer/CartReducer.js";
import OrderReducer from "./reducer/OrderReducer.js";
const store = configureStore({
    reducer: {
        products: productsReducer,
        user: UserReducer,
        cart: CartReducer,
        order: OrderReducer
    },
});

export default store;
