import React, { useEffect, useState } from 'react';
// import axios from "axios";
import axios from "../../../utils/AxiosConfiq"
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux"
import { getCarts } from '../../../redux/Actions/Action';
const CustomerCart = () => {
    const [carts, setCarts] = useState([]);
    const [newQuantity, setNewQuantity] = useState(0);
    const [editingCartItem, setEditingCartItem] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const data = useSelector(state => state.cart.cart)

    useEffect(() => {
        dispatch(getCarts())
    }, [dispatch]);
    useEffect(() => {
        setCarts(data);
    }, [data]);
    const deleteCart = async (cartId) => {
        try {

            const deleteCart = await axios.delete(`/api/customer/delete-cart/${cartId}`);

            if (deleteCart) {
                toast.warn('Cart Deleted', {
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
            setTimeout(() => {
                setCarts((prevCart) => prevCart.filter(cart => cart._id !== cartId));
            }, 1300);
        } catch (error) {
            toast.error(`${error.response.data}`, {
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
    };

    const BackToShop = () => {
        navigate("/customer/products");
    };

    const editCart = (cartItem) => {
        setEditingCartItem(cartItem);
        setNewQuantity(cartItem.quantity);
    };

    const updateCartItem = async (cartId) => {
        try {

            const updatedItem = {
                // Assuming this is the cart ID
                productId: editingCartItem.product._id,
                changedQuantity: newQuantity,
            };
            const updated = await axios.put(`/api/customer/update-cart/${cartId}`, updatedItem);

            if (updated) {
                toast.info('Cart Updated', {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }

            // Update the local state and reset editing variables
            setCarts((prevCarts) => {
                return prevCarts.map((cart) => {
                    if (cart._id === cartId) {
                        const updatedItems = cart.items.map((item) => {
                            if (item.product._id === editingCartItem.product._id) {
                                return { ...item, quantity: newQuantity };
                            }
                            return item;
                        });
                        return { ...cart, items: updatedItems };
                    }
                    return cart;
                });
            });

            setEditingCartItem(null);
        } catch (error) {
            toast.error(`${error.response.data.message}`, {
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
    };

    const toCheckOut = () => {
        navigate("/customer/checkout");
    };
    const navigateProduct = (productId) => {
        navigate(`/customer/product-details/${productId}`)
    }
    return (
        <div className='container mx-auto px-[2rem] h-screen overflow-y-scroll scroll '>
            <div>
                <p className='text-white text-3xl font-bold mt-6'>Product Cart</p>
                <p className='w-full py-2 font-bold px-2 bg-slate-800 text-white mt-4'>Your Cart ({carts.filter(cart => cart.items.length !== 0).length} items)</p>
                {carts.reduce((total, cart) => total + cart.items.length, 0) === 0 ? (<img className='w-full h-[30rem] mt-4 object-contain' src="https://media.istockphoto.com/id/636401984/photo/shopping-cart.jpg?s=612x612&w=0&k=20&c=Oa07SnhzNd21_7lqf7ynsMl0EHwqQCqOP9DSOONmaiA=" alt="" />) : (<table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3 bg-slate-700">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3 bg-slate-700">
                                Product Info
                            </th>
                            <th scope="col" className="px-6 py-3 bg-slate-700">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3 bg-slate-700">
                                Quantity
                            </th>
                            <th scope="col" className="px-6 py-3 bg-slate-700">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-3 bg-slate-700">
                                Remove
                            </th>
                            <th scope="col" className="px-6 py-3 bg-slate-700">
                                {editingCartItem ? 'Update' : 'Edit'}
                            </th>

                        </tr>
                    </thead>
                    <tbody className="bg-slate-600 divide-y divide-gray-200">
                        {carts.map((cart, cartIndex) => (
                            cart.items.map((cartItem, productIndex) => (
                                <tr key={`cart-${cartIndex}-product-${productIndex}`}>
                                    <td className="px-6 py-4">
                                        <img src={cartItem.product.picture} alt="Product" className="h-[4rem] w-[4rem] object-cover" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <p onClick={() => navigateProduct(cartItem.product._id)} className='font-bold hover:text-blue-600 underline cursor-pointer' >{cartItem.product.title.split(" ").slice(0, 3).join(" ")}</p>
                                        {cartItem.product.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className='font-medium'> ${cartItem.product.price}.00</p>
                                    </td>
                                    <td className="px-6 py-4 ">
                                        {editingCartItem && editingCartItem.product._id === cartItem.product._id ? (
                                            <input type="number" className='border outline-none text-center inline bg-slate-500 w-[3rem] h-[2.4rem] border-slate-500 rounded-md'
                                                value={newQuantity}
                                                onChange={(e) => setNewQuantity(e.target.value)}
                                                min={1}
                                            />
                                        ) : (
                                            <p className='font-medium'> {cartItem.quantity}</p>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className='font-medium' > ${cartItem.product.price * cartItem.quantity}.00</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => deleteCart(cart._id)} className="px-3 py-2 bg-red-500 text-white rounded">
                                            Remove
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        {editingCartItem && editingCartItem.product._id === cartItem.product._id ? (
                                            <button onClick={() => updateCartItem(cart._id)} className="px-3 py-2 bg-green-500 text-white rounded">
                                                Update
                                            </button>
                                        ) : (
                                            <button onClick={() => editCart(cartItem)} className="px-3 py-2 bg-blue-500 text-white rounded">
                                                Edit
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>)}
                <div className='flex justify-between items-center' >
                    <button onClick={BackToShop} className='flex items-center border mt-4 mb-8 rounded-md hover:bg-slate-500 border-slate-700 bg-slate-600 px-2 py-2 text-white font-medium' >
                        <span className="material-symbols-outlined mr-2">arrow_left_alt</span>
                        Back To Store
                    </button>
                    {carts.length > 0 && (
                        <button onClick={toCheckOut} className='flex items-center border mt-4 mb-8 rounded-md hover-bg-red-500 border-slate-700 bg-red-600 px-2 py-2 text-white font-medium'>
                            <span className="material-symbols-outlined mr-2">shopping_cart_checkout</span>
                            Checkout
                        </button>
                    )}
                </div>
            </div>
            <div></div>
            <ToastContainer />
        </div>
    );

}
export default CustomerCart;
