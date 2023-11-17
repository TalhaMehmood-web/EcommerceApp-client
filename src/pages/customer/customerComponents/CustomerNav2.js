import React from 'react';
import { Link } from 'react-router-dom';

const CustomerNav2 = () => {
    return (
        <div className="bg-slate-800 py-2  w-full">
            <div className="container lg:px-20 px-0 py-1 mx-auto flex sm:flex-row flex-col  sm:items-center  h-16  sm:h-full justify-between">
                <div className='flex items-center  cursor-pointer'>
                    <span className="material-symbols-outlined">
                        menu
                    </span>
                    <p className="ml-1 font-semibold">Category</p>
                </div>
                <div className='flex sm:justify-center'>
                    <Link to='/customer' className='sm:mr-10 mr-4 text-sm font-semibold link-hover'><p>Home</p></Link>
                    <Link to='/customer/products' className='sm:mr-10 mr-4 text-sm font-semibold link-hover'><p>Products</p></Link>
                    <Link to='/customer/cart' className='sm:mr-10 mr-4 text-sm font-semibold link-hover'><p>Cart</p></Link>

                    <Link to='/customer/checkout' className='sm:mr-3  text-sm font-semibold link-hover'><p>Checkout</p></Link>
                    <Link to='/customer/track-order' className='sm:mr-10 mr-4 text-sm font-semibold link-hover'><p>Track Order</p></Link>
                </div>
            </div>
        </div>
    );
}

export default CustomerNav2;
