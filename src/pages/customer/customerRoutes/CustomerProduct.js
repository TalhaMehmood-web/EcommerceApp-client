import { React, useEffect, useState } from 'react';
import CustomerFilter from '../customerProduct/CustomerFilter';
import ProductDisplay from '../customerProduct/ProductDisplay';
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from '../../../redux/Actions/Action';
const CustomerProduct = () => {
    const products = useSelector(state => state.products.products);
    const [filteredProduct, setFilteredProduct] = useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch]);
    return (
        <div className='flex container mx-auto justify-between py-[20px] '  >
            <div className="" ><CustomerFilter setFilteredProduct={setFilteredProduct} products={products} /></div>
            <div className='w-[85%] ml-4' ><ProductDisplay products={filteredProduct.length === 0 ? products : filteredProduct} /></div>
        </div>
    );
}

export default CustomerProduct;
