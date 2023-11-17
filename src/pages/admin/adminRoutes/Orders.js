import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../../redux/Actions/Action';
import { useNavigate } from 'react-router-dom';
import AdminFooter from "../adminComponents/AdminFooter"
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector(state => state.order.order)
    const [nameFilter, setNameFilter] = useState("")
    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch])
    useEffect(() => {
        setOrders(data)
    }, [data])
    const formattedDates = orders.map(order => {
        const orderDate = new Date(order.orderDate);
        return orderDate.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
    });
    const orderDetail = (orderId) => {
        navigate(`/admin/order-status/${orderId}`)
    }

    const filterOrders = orders.filter(order => order?._id.toLowerCase().includes(nameFilter.toLowerCase()) || order?.user?.fullname.toLowerCase().includes(nameFilter.toLowerCase()) || order?.orderStatus.toLowerCase().includes(nameFilter.toLowerCase()))

    return (
        <>
            <div className='p-4'>
                <p className='text-3xl font-bold'>Orders</p>
                <div className='flex justify-between border border-slate-800 py-4 px-2 bg-slate-900 rounded-md my-4'>

                    <p className='text-md font-medium text-slate-200'>All ({orders?.length})</p>
                    <p className='text-md font-medium text-[#ffcc85] '>Pending ( {orders?.filter(order => order.orderStatus === "Pending").length} ) </p>
                    <p className='text-md font-medium text-[#007ab3] '>Processing ( {orders?.filter(order => order.orderStatus === "Processing").length} ) </p>
                    <p className='text-md font-medium text-purple-600'>Shipped ( {orders?.filter(order => order.orderStatus === "Shipped").length} ) </p>
                    <p className='text-md font-medium text-green-600'>Delivered ( {orders?.filter(order => order.orderStatus === "Delivered").length} ) </p>
                    <p className='text-md font-medium text-red-600'>Cancelled ( {orders?.filter(order => order.orderStatus === "Cancelled").length} ) </p>
                </div>
                <div>
                    <div>
                        <div className='flex items-center border border-slate-700 rounded-md w-fit my-4' >
                            <span className="material-symbols-outlined  px-3" >
                                search
                            </span>
                            <input type="text" className='outline-none border-none rounded-r-md py-2 px-1 bg-slate-900 w-[20rem] '
                                placeholder='Search Order'
                                value={nameFilter}
                                onChange={(e) => setNameFilter(e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <div className="w-full ">
                        <table className="min-w-full border-collapse">
                            <thead  >
                                <tr className="bg-gray-900">
                                    <th className="p-2">ORDER </th>
                                    <th className="p-2">TOTAL</th>
                                    <th className="p-2 text-left">CUSTOMER</th>
                                    <th className="p-2">PAYMENT STATUS</th>
                                    <th className="p-2">FULFILLMENT STATUS</th>
                                    <th className="p-2">DELIVER TYPE</th>
                                    <th className="p-2">ORDER DATE</th>
                                </tr>
                            </thead>
                            <tbody>

                                {filterOrders.map((order, orderIndex) => {
                                    return order.cartOrders.map((cart, cartIndex) => {
                                        return <tr key={`order-${orderIndex}-cart-${cartIndex}`} className='bg-[#1a2031]'>
                                            <td className="py-4 px-2">
                                                <p onClick={() => orderDetail(order._id)} className='text-sm font-medium text-blue-500 cursor-pointer hover:underline hover:text-blue-600' >#{order._id.slice(0, 9)}</p>
                                            </td>
                                            <td className="py-4 px-2">
                                                <p className='text-sm font-medium text-white' >${cart.totalPrice}</p>
                                            </td>
                                            <td className="py-4 px-2 " style={{ textAlign: " -webkit-left" }}  >
                                                <div className='flex items-center justify-center float-left ' >
                                                    <img className='w-8 h-8 object-cover rounded-full mr-3' src={order.user.picture} alt="" />
                                                    <p className='text-sm font-medium text-white'> {order.user.fullname.split(" ").slice(0, 2).join(" ")} </p>
                                                </div>
                                            </td>
                                            <td className="py-4 px-2" style={{ textAlign: " -webkit-center" }} >
                                                <p className=' text-[#00d100de] text-[0.7rem] font-normal flex items-center  bg-[#00d10023] rounded-sm border border-[#00d100de] px-1 w-fit '>FULFILLED
                                                    <span className="material-symbols-outlined text-sm font-normal ml-1">
                                                        check_circle
                                                    </span>
                                                </p>
                                            </td>
                                            <td className="py-4 px-2" style={{ textAlign: " -webkit-center" }} >
                                                {
                                                    order.orderStatus === "Pending" && <p className=' rounded-sm text-[#ffcc85] text-xs font-normal flex items-center  bg-[#726046]  border border-[#ffcc85] px-1 w-fit '>{order.orderStatus}
                                                        <span className="material-symbols-outlined text-sm font-normal ml-1">
                                                            schedule
                                                        </span>
                                                    </p>
                                                }
                                                {
                                                    order.orderStatus === "Cancelled" && <p className='text-[#ff4444ee] text-xs font-normal flex items-center  bg-[#ff000027] rounded-sm border border-[#ff4444ee] px-1 w-fit '>{order.orderStatus}
                                                        <span className="material-symbols-outlined text-sm font-normal ml-1">
                                                            close
                                                        </span>
                                                    </p>
                                                }
                                                {
                                                    order.orderStatus === "Processing" && <p className='text-[#007ab3] text-xs font-normal flex items-center  bg-[#0066852d] rounded-sm border border-[#007ab3] px-1 w-fit '>{order.orderStatus}
                                                        <span className="material-symbols-outlined text-sm font-normal ml-1">
                                                            info
                                                        </span>
                                                    </p>
                                                }
                                                {
                                                    order.orderStatus === "Shipped" && <p className='text-[#ec2cc2e7] text-xs font-normal flex items-center  bg-[#ec2cc234] rounded-sm border border-[#ec2cc2e7] px-1 w-fit '>{order.orderStatus}
                                                        <span className="material-symbols-outlined text-sm font-normal ml-1">
                                                            local_shipping
                                                        </span>
                                                    </p>
                                                }
                                                {
                                                    order.orderStatus === "Delivered" && <p className='text-[#00d100de] text-xs font-normal flex items-center  bg-[#00d10023] rounded-sm border border-[#00d100de] px-1 w-fit '>{order.orderStatus}
                                                        <span className="material-symbols-outlined text-sm font-normal ml-1">
                                                            check_circle
                                                        </span>
                                                    </p>
                                                }
                                            </td>
                                            <td className="py-4 px-2">
                                                <p className='text-sm font-normal text-slate-200' >{order.deliverType}</p>
                                            </td>
                                            <td className="py-4 px-2">
                                                <p className='text-sm font-normal text-slate-200' >{formattedDates[orderIndex]}</p>
                                            </td>
                                            <td className="py-4 px-2"></td>
                                        </tr>
                                    })
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
            <AdminFooter />
        </>
    );
}

export default Orders;
