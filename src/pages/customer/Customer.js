import React from 'react';
import CustomerNav from './customerComponents/CustomerNav';
import CustomerNav2 from './customerComponents/CustomerNav2';
import CustomerFooter1 from './customerComponents/CustomerFooter1';
import CustomerFooter2 from './customerComponents/CustomerFooter2';
import { Outlet } from 'react-router-dom';
const Customer = () => {
    return (
        <div className='text-icon_color bg-body w-full h-full flex flex-col' >
            <div className=''>
                <CustomerNav />
                <CustomerNav2 />
            </div>
            <div className='flex-1'>
                <Outlet />
            </div>
            <div className=''>
                <CustomerFooter1 />
                <CustomerFooter2 />
            </div>


        </div>
    );
}
export default Customer;
