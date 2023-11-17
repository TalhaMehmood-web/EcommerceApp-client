import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../utils/AxiosConfiq"
import jwt from "jwt-decode"
export const fetchProducts = createAsyncThunk('products', async () => {
    try {
        const { data } = await axios.get('/api/customer/products');
        return data;
    }
    catch (error) {
        console.log(error);
    }
});
export const getUser = createAsyncThunk("user", async () => {
    try {
        const token = JSON.parse(localStorage.getItem("token"))
        const decode = jwt(token)
        const userId = decode._id;

        const { data } = await axios.get(`/api/user/get-user/${userId}`)

        return data
    } catch (error) {
        console.log(error.response);
    }
})
export const getCarts = createAsyncThunk("cart", async () => {
    try {
        const token = JSON.parse(localStorage.getItem("token"))
        const decode = jwt(token)
        const userId = decode._id;

        const { data } = await axios.get(`/api/customer/get-all-carts/${userId}`)
        return data
    } catch (error) {
        console.log(error.response);
    }
})
export const getOrders = createAsyncThunk("order", async () => {
    try {
        const token = JSON.parse(localStorage.getItem("token"))
        const decode = jwt(token)
        const adminId = decode._id;
        const { data } = await axios.get(`/api/admin/get-orders/${adminId}`)
        return data
    } catch (error) {
        console.log(error.response);
    }
})