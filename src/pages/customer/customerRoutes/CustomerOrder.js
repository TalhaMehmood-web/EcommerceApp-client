import React, { useEffect, useState } from 'react';
import jwt from "jwt-decode"
import axios from "../../../utils/AxiosConfiq"

const CustomerOrder = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const [orders, setOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [currentPage, setCurrentPage] = useState(1);
    const [clicked, setClicked] = useState(null)
    const [pending, setPending] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [shipped, setShipped] = useState(false);
    const [lineColor, setLineColor] = useState(null)
    const [lineColor2, setLineColor2] = useState(null)
    const [lineColor3, setLineColor3] = useState(null)
    const [shippingColor, setShippingColor] = useState(null);
    const [deliveryColor, setDeliveryColor] = useState(null)
    const [delivered, setDelivered] = useState(false);
    const [cancelled, setCancelled] = useState(false)
    const ordersPerPage = 5;
    const decode = jwt(token);

    const customerId = decode._id;
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get(`/api/customer/history-order/${customerId}`)
                setOrders(data)
            } catch (error) {
                console.log(error.response)
            }
        }
        fetchOrders()
    }, [customerId])
    // console.log(orders);
    const filteredOrders = orders.filter(order => order.cartOrders.some(cart => cart.products.some(product => product.product !== null)))
    // console.log(filteredOrders);

    const viewDetail = (orderId) => {
        setLineColor(null)
        setLineColor2(null)
        setLineColor3(null)
        setDeliveryColor(null)
        setShippingColor(null)
        setPending(false);
        setCancelled(false)
        setProcessing(false);
        setShipped(false);
        setDelivered(false);
        const order = filteredOrders.find(order => order._id === orderId);

        if (order) {
            setSelectedOrder(order);

            if (order.orderStatus === null) {
                // setPending(true);
            } else if (order.orderStatus === "Pending") {
                setPending(true);
                setLineColor("bg-yellow-600")
                setLineColor2("bg-white")
                setLineColor3("bg-white")
            }
            else if (order.orderStatus === "Cancelled") {
                setPending(true)
                setCancelled(true)

            }
            else if (order.orderStatus === "Processing") {
                setPending(true);
                setCancelled(false)
                setProcessing(true);
                setLineColor2("bg-yellow-600")
                setLineColor3("bg-white")
                setShippingColor("bg-yellow-700 border border-yellow-700")
            } else if (order.orderStatus === "Shipped") {
                setPending(true);
                setCancelled(false)
                setProcessing(true);
                setShipped(true);
                setLineColor2("bg-green-600")
                setLineColor3("bg-yellow-600")
                setDeliveryColor("bg-yellow-700 border border-yellow-700")
            } else if (order.orderStatus === "Delivered") {
                setPending(true);
                setCancelled(false)
                setProcessing(true);
                setShipped(true);
                setDelivered(true);
                setLineColor2("bg-green-600")
                setLineColor3("bg-green-600")
            }
        }
    }

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
    const totalPrice = currentOrders.reduce((sum, order) => sum + order.cartOrders.reduce((sum, cart) => sum + cart.totalPrice, 0), 0)
    // Change page
    const paginate = (pageNumber) => {
        setClicked(pageNumber)
        setCurrentPage(pageNumber);

    }
    return (
        <div className='flex justify-around p-4' >
            <div className={`w-[70%] ${!selectedOrder && "w-full"} `}>
                <table className="">
                    <thead  >
                        <tr className="bg-gray-900">

                            <th className="p-2">OrderID </th>
                            <th className="p-2 text-start">Product </th>
                            <th className="p-2">Category</th>
                            <th className="p-2">Price</th>
                            <th className="p-2 ">Quantity</th>
                            <th className="p-2">DELIVER TYPE</th>
                            <th className="p-2">Total</th>



                        </tr>
                    </thead>
                    <tbody className='h-fit overflow-y-auto'>

                        {currentOrders.map((order, orderIndex) => {
                            return order.cartOrders.map((cart, cartIndex) => {
                                return cart.products.map((product, productIndex) => {
                                    return <tr key={`order-${orderIndex}-cart-${cartIndex}-product-${productIndex}`} className='bg-[#1a2031]'>

                                        <td className="py-4 px-2">
                                            <p onClick={() => viewDetail(order._id)}
                                                className='text-sm font-medium text-blue-500 cursor-pointer hover:underline hover:text-blue-600' >#{order._id.slice(0, 9)}</p>
                                        </td>
                                        <td className="py-4 px-2 w-[20rem] ">
                                            <div className='flex items-center' >
                                                <img className='bg-transparent w-12 h-12 ' src={product.product?.picture} alt="" />
                                                <p className=' ml-2 text-left text-sm font-medium text-white ' >{product.product?.title}</p>
                                            </div>
                                        </td>
                                        <td className="py-4 px-2 "  >

                                            <p className='text-sm font-medium text-white'> {product.product?.category} </p>

                                        </td>
                                        <td className="py-4 px-2" >
                                            <p className='text-sm font-medium text-white'> ${product.product?.price} </p>
                                        </td>
                                        <td className="py-4 px-2" >
                                            <p className='text-sm font-medium text-white'> {product.quantity} </p>
                                        </td>
                                        <td className="py-4 px-2">
                                            <p className='text-sm font-normal text-slate-200' >{order.deliverType}</p>
                                        </td>

                                        <td className="py-4 px-2">
                                            <p className='text-sm font-normal text-slate-200' >${cart.totalPrice}</p>
                                        </td>
                                    </tr>
                                })
                            })
                        })}

                    </tbody>
                </table>
                <div className='flex justify-between border-b border-b-slate-700 py-4 px-2 ' >
                    <p className='font-semibold ' >Items SubTotal:</p>
                    <p className='font-semibold ' >${totalPrice}</p>
                </div>
                <div className="border-b border-slate-700 py-3 flex items-center justify-center ">
                    {Array.from({ length: Math.ceil(filteredOrders.length / ordersPerPage) }, (_, i) => (
                        <button key={i} onClick={() => paginate(i + 1)} className={`border border-slate-500 px-3 rounded-md py-1 ${clicked === i + 1 ? "bg-blue-700 " : ""} `} >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>

            {selectedOrder && <div className='w-[25%] border border-slate-700 h-[30rem] rounded-md px-2' >
                <p className='text-white font-bold text-2xl text-center mt-2 mb-4' >Order Status</p>
                <p className='text-slate-200 font-medium text-lg'>OrderId: #{selectedOrder?._id.split("").slice(0, 9).join("")}</p>
                <p className='text-slate-300 font-medium text-base'>Status: {selectedOrder?.orderStatus === "Pending" ? "Placed" : selectedOrder?.orderStatus}</p>
                {
                    selectedOrder ? (
                        <div className={`flex flex-col ${cancelled ? "h-[35%]" : "h-[70%]"}  px-4 justify-around`}>
                            <div className='flex items-center relative' >
                                <span className=" align-middle p-1 text-[20px] border border-green-700 bg-green-700 rounded-full text-white material-symbols-outlined">
                                    {pending && "done"}
                                </span> <p className="text-lg font-bold text-slate-200 ml-4">Order is been Placed</p>
                                <span className={`absolute ${pending && lineColor}   ${cancelled && "bg-red-700"}  bg-green-600 h-[3.7rem] w-[2px] top-7 left-3.5`} ></span>
                            </div>
                            {cancelled ? (<div className='flex items-center ' >
                                <span className={`align-middle p-1 text-[20px] ${cancelled && "bg-red-700 border border-red-700"} rounded-full text-white material-symbols-outlined`}>
                                    {cancelled && "done"}
                                </span> <p className="text-lg font-bold text-slate-200 ml-4">Order is Cancelled</p>

                            </div>) : (<> <div className='flex items-center relative ' >
                                <span className={`p-1 align-middle text-[20px] ${processing ? "bg-green-700 border border-green-700" : "bg-yellow-700 border border-yellow-700 "} rounded-full text-white material-symbols-outlined`}>
                                    {processing ? "done" : "running_with_errors"}
                                </span> <p className="text-lg font-bold text-slate-200 ml-4">Order is processing</p>
                                <span className={`absolute ${processing && lineColor2}   h-[3.7rem] w-[2px] top-7 left-3.5`} ></span>
                            </div>
                                <div className='flex items-center relative' >
                                    <span className={`p-1 ${processing && shippingColor} align-middle text-[20px]  ${shipped ? "bg-green-700 border border-green-700" : "bg-transparent border border-slate-500"} rounded-full text-white material-symbols-outlined`}>
                                        {shipped ? "done" : "local_shipping"}
                                    </span> <p className="text-lg font-bold text-slate-200 ml-4">Shipped</p>
                                    <span className={`absolute ${shipped && lineColor3}  h-[3.7rem] w-[2px] top-7 left-3.5`} ></span>
                                </div>
                                <div className='flex items-center' >
                                    <span className={`p-1 ${shipped && deliveryColor} align-middle text-[20px] ${delivered ? "border border-green-700 bg-green-700" : "bg-transparent border border-slate-500"}  rounded-full text-white material-symbols-outlined`}>
                                        {delivered ? "done" : "airport_shuttle"}
                                    </span> <p className="text-lg font-bold text-slate-200 ml-4" >Delivered</p>

                                </div></>)}

                        </div>
                    )
                        : (<p>Select an order to view status</p>)

                }

            </div>}
        </div>
    );
}

export default CustomerOrder;
