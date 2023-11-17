import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminFooter from "../adminComponents/AdminFooter"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from "../../../utils/AxiosConfiq"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const OrderStatus = () => {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState("")
    const { orderId } = useParams();
    const navigate = useNavigate()
    const data = useSelector(state => state.order.order);

    useEffect(() => {
        setOrders(data);
    }, [data]);



    const order = orders.find(order => order._id === orderId);
    if (!order) {
        return <div>Order not found.</div>;
    }
    const customerAllOrders = orders.filter(o => o.user?._id === order.user?._id);
    const customerOrders = customerAllOrders.filter(o => o._id !== order._id)
    const totalPrice = customerOrders.reduce((sum, order) => sum + order.cartOrders.reduce((sum, cart) => sum + cart.totalPrice, 0), 0)
    const viewDetail = (orderId) => {
        navigate(`/admin/order-status/${orderId}`)
    }
    const updateStatus = async () => {
        try {
            const updated = await axios.put(`/api/admin/update-status/${order._id}`, { orderStatus: status })
            if (updated) {
                toast.info('Order Status is updated', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        } catch (error) {
            toast.info(`${error.response.data.message}`, {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

    }
    return (
        <>
            <div className='p-4' >
                <p className='text-3xl font-bold mb-6' >Order #{order._id.split("").slice(0, 8).join("")} </p>
                <p className='text-slate-400 font-semibold text-lg mb-2' >Customer ID: <span className='text-blue-600 font-bold text-xl' > {order.user?._id?.split("").slice(0, 8).join("")}</span></p>
                <p className='text-white font-bold text-md mb-3' >Existing Orders of Related Customer ({customerOrders.length}) </p>
                <div className='flex justify-between' >

                    <div className="w-[70%] ">
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
                            <tbody>

                                {customerOrders.map((order, orderIndex) => {
                                    return order.cartOrders.map((cart, cartIndex) => {
                                        return cart.products.map((product, productIndex) => {
                                            return <tr key={`order-${orderIndex}-cart-${cartIndex}-product-${productIndex}`} className='bg-[#1a2031]'>
                                                <td className="py-4 px-2">
                                                    <p onClick={() => viewDetail(order._id)}
                                                        className='text-sm font-medium text-blue-500 cursor-pointer hover:underline hover:text-blue-600' >#{order._id.slice(0, 9)}</p>
                                                </td>
                                                <td className="py-4 px-2 w-[20rem] ">
                                                    <div className='flex items-center' >
                                                        <img className='bg-transparent w-12 h-12 ' src={product.product.picture} alt="" />
                                                        <p className=' ml-2 text-left text-sm font-medium text-white ' >{product.product.title}</p>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-2 "  >

                                                    <p className='text-sm font-medium text-white'> {product.product.category} </p>

                                                </td>
                                                <td className="py-4 px-2" >
                                                    <p className='text-sm font-medium text-white'> ${product.product.price} </p>
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
                        <div className='flex justify-between border-b border-b-slate-700 py-4 px-2 mb-8' >
                            <p className='font-semibold ' >Items SubTotal:</p>
                            <p className='font-semibold ' >${totalPrice}</p>
                        </div>
                    </div>
                    <div className='w-[25%] flex flex-col '>
                        <div className='border border-slate-700 h-[20rem] rounded-md' >
                            {

                                order.cartOrders.map((cart, cartIndex) => {
                                    return cart.products.map((product, productIndex) => {
                                        return <div className=' flex flex-col h-full justify-around px-2 font-semibold' key={`cart-${cartIndex}-product-${productIndex}`} >
                                            <p className='text-3xl text-center' >Summary</p>
                                            <p className='flex justify-between flex-row items-center' >
                                                <span className='text-md text-slate-300'>items subTotal :</span>
                                                <span className='text-slate-200'>${((product.product.price) * (product.quantity)) + (product.product.price) / 100 * product.product.offer}</span> </p>
                                            <p className='flex justify-between flex-row items-center' >
                                                <span className='text-md text-slate-300'>Discount :</span>
                                                <span className='text-red-500' >-{(product.product.offer > 0 ? product.product.offer : 0) * product.quantity}%</span> </p>
                                            <p className='flex justify-between flex-row items-center' >
                                                <span className='text-md text-slate-300'>Subtotal :</span>
                                                <span className='text-slate-200'>${product.product.price * product.quantity}</span> </p>
                                            <p className='flex justify-between flex-row items-center' >
                                                <span className='text-md text-slate-300'>Shipping Cost :</span>
                                                <span className='text-slate-200'>${-(product.product.price * product.quantity) + (cart.totalPrice)}</span> </p>
                                            <p className='flex justify-between flex-row items-center' >
                                                <span className='text-lg'>Total :</span>
                                                <span className='text-lg' >${(cart.totalPrice)}</span> </p>
                                        </div>
                                    })
                                })

                            }
                        </div>
                        <div className='border border-slate-700 mt-8 flex flex-col p-4 rounded-md ' >
                            <p className='text-3xl  font-bold'>Order Status</p>
                            <p className='text-slate-300 font-normal text-sm mt-2' >Fulfillment Status</p>
                            <select className='bg-slate-900 cursor-pointer mt-4 mb-3  text-slate-300 outline-none rounded-md px-4 py-2  font-medium  ' onChange={(e) => setStatus(e.target.value)} >
                                <option value=""> Order Status </option>
                                <option value="Pending"> Pending </option>
                                <option value="Processing">Processing  </option>
                                <option value="Shipped">Shipped </option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled </option>
                            </select>
                            <button onClick={updateStatus} className='  border rounded-md border-blue-700  bg-blue-600 hover:bg-blue-700 py-1 px-2 text-white font-medium' >Update Status</button>
                        </div>
                    </div>
                </div>

            </div>

            <AdminFooter />
            <ToastContainer />
        </>
    );
}

export default OrderStatus;
