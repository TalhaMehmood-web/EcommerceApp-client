import React, { useEffect, useState } from 'react';
import AdminFooter from "../adminComponents/AdminFooter"
import { useSelector, useDispatch } from "react-redux"
import jwt from "jwt-decode"
import { getOrders } from '../../../redux/Actions/Action';
import ApexChart from '../adminComponents/ApexChart';
const Dashboard = () => {
    const [orders, setOrders] = useState([])
    const dispatch = useDispatch();
    const data = useSelector(state => state.order.order)
    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch])
    useEffect(() => {
        setOrders(data)
    }, [data])
    const token = JSON.parse(localStorage.getItem("token"))
    const decode = jwt(token);
    const name = decode.fullname;
    const email = decode.email
    const revenue = Array.isArray(orders)
        ? orders.reduce((sum, order) =>
            sum +
            order.cartOrders.reduce((sum, cart) =>
                sum +
                cart.products.reduce(
                    (sum, product) => sum + product.product.price,
                    0
                ),
                0
            ),
            0
        )
        : 0;

    const sales = Array.isArray(orders)
        ? orders.reduce((sum, order) =>
            sum + order.cartOrders.reduce((sum, cart) => sum + cart.totalPrice, 0),
            0
        )
        : 0;

    const date = new Date()
    return (
        <>
            <div className='p-4'>
                <div className='flex items-center justify-between bg-slate-900 px-2 py-2 rounded-md' >
                    <p className='text-4xl font-bold' >Analytics</p>
                    <p className='border border-slate-700 rounded-md bg-slate-800 px-3 py-2 font-bold text-xl ' >{date.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>

                </div>
                <div className='grid grid-cols-2 justify-items-center gap-2 mt-4' >
                    <div className='w-[100%] h-fit py-8 border border-slate-500 rounded-md bg-slate-900' >
                        <div className='flex justify-around' >
                            <div className='bg-[#354585] p-7 items-center justify-center w-fit rounded-md' >
                                <img src="https://shop-point.merku.love/assets/logo_dark-01612bb2.svg" className='w-[6rem] h-[5rem] object-cover ' alt="" />
                                <p className='mt-1 text-xl text-center font-bold'>BuyIt</p>
                            </div>
                            <div>
                                <p className='text-3xl font-bold' >ButIt - Retail</p>
                                <p className='text-md font-medium text-slate-200 my-2' >Name: {name}</p>
                                <p className='text-md font-medium text-slate-200 my-2' >Email: {email}</p>
                                <div className='flex justify-between mt-3' >
                                    <div className='flex flex-col items-center bg-slate-900 border border-slate-800 py-1 px-4 rounded-md'><p className='font-bold' >Revenue</p>
                                        <p className='text-slate-500 font-medium'>${sales}</p></div>
                                    <div className='flex flex-col items-center bg-slate-900 border border-slate-800 py-1 px-4 rounded-md'><p className='font-bold' >Expenses</p>
                                        <p className='text-slate-500 font-medium'>${sales - revenue}</p></div>
                                    <div className='flex flex-col items-center bg-slate-900 border border-slate-800 py-1 px-4 rounded-md'><p className='font-bold' >Orders</p>
                                        <p className='text-slate-500 font-medium'>{orders?.length}</p></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-[100%] h-fit border border-slate-500 bg-slate-900 flex items-center justify-around py-5 rounded-md' >
                        <img src="https://shop-point.merku.love/assets/balance-c2e80db3.webp" className='w-[12rem] h-[12rem] object-cover ' alt="" />
                        <div>
                            <p className='text-4xl font-semibold text-[#c1cdff]' >${revenue}/=</p>
                            <p className='text-xl font-bold text-[#a0b3ff] '>Total Balance</p>
                        </div>
                    </div>
                    <div className='w-[100%] h-fit py-4 rounded-md border border-slate-500' >
                        <ApexChart orders={orders} />
                    </div>
                    <div className='w-[100%] h-[25rem] rounded-md border bg-slate-900 border-slate-500 flex flex-col justify-around px-3' >

                        <p className='text-[#c1cdff] text-4xl font-semibold' >Total Report</p>
                        <p>All Periods per  {new Date(orders && orders[0]?.orderDate).toLocaleDateString()} -{' '}
                            {new Date(orders[orders.length - 1]?.orderDate).toLocaleDateString()}</p>
                        <div className='flex items-center justify-between px-4 py-5 rounded-md  bg-[#192c77]' >
                            <p className='font-bold text-lg'>Revenue</p>
                            <p className='font-bold text-slate-200'>${sales}</p>
                        </div>
                        <div className='flex items-center justify-between px-4 py-5 rounded-md  bg-[#192c77]' >
                            <p className='font-bold text-lg'>Expenses</p>
                            <p className='font-bold text-slate-200'>${sales - revenue}</p>
                        </div>
                        <div className='flex items-center justify-between px-4 py-5 rounded-md  bg-[#192c77]' >
                            <p className='font-bold text-lg'>Net Profit</p>
                            <p className='font-bold text-slate-200'>${revenue}</p>
                        </div>
                    </div>
                </div>
            </div>
            <AdminFooter />
        </>

    );
};

export default Dashboard;
