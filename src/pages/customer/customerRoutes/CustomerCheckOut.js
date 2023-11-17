import React, { useEffect, useState } from 'react';
import axios from "../../../utils/AxiosConfiq";
import jwt from "jwt-decode";
import CheckoutPayment from '../customerComponents/CheckoutPayment';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
const CustomerCheckOut = () => {
    const [carts, setCarts] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [shippingCost, setShippingCost] = useState(0);
    const [total, setTotal] = useState(0);
    const [selectedType, setSelectedType] = useState(null);
    const [shippingAddress, setShippingAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [deliverType, setDeliverType] = useState(null);
    const [selectedCarts, setSelectedCarts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCarts = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("token"));
                const decode = jwt(token);
                const userId = decode._id;

                const { data } = await axios.get(`/api/customer/get-all-carts/${userId}`);
                setCarts(data);

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
        fetchCarts();
    }, []);
    useEffect(() => {
        const initialSubtotal = carts.reduce((acc, cart) => acc + cart.totalPrice, 0);
        setSubTotal(initialSubtotal);
    }, [carts]);

    const handleCheckboxChange = (cartId) => {
        if (selectedCarts.includes(cartId)) {
            setSelectedCarts(selectedCarts.filter((id) => id !== cartId));
        } else {
            setSelectedCarts([...selectedCarts, cartId]);
        }
    };

    useEffect(() => {
        const selectedCartTotal = carts
            .filter((cart) => selectedCarts.includes(cart._id))
            .reduce((acc, cart) => acc + cart.totalPrice, 0);
        setTotal(selectedCartTotal + shippingCost);

        if (selectedCarts.length === 0) {
            const newSubTotal = carts.reduce((acc, cart) => acc + cart.totalPrice, 0);
            setSubTotal(newSubTotal);
        } else {
            setSubTotal(selectedCartTotal);
        }
    }, [selectedCarts, shippingCost, carts]);

    const navigateToCart = () => {
        navigate("/customer/cart");
    };

    const handleRadioChange = (type, cost) => {
        setDeliverType(type);
        setSelectedType(type);
        setShippingCost(cost);

    };

    const createOrder = async () => {
        try {
            const selectedCartIds = selectedCarts;

            if (selectedCartIds.length === 0) {
                console.log("Please select at least one cart.");
                return;
            }

            const order = {
                cartIds: selectedCartIds,
                paymentMethod: paymentMethod,
                shippingAddress: shippingAddress,
                deliverType: deliverType,
            };
            const { data } = await axios.post("/api/customer/create-order", order);
            if (data) {
                toast.success('Order Placed Successfully', {
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
                const updatedCart = carts.filter(cart => !selectedCartIds.includes(cart._id));
                setCarts(updatedCart);
                setShippingCost(0);
                setShippingAddress("");
                setPaymentMethod("");
                setDeliverType(null);
            }, 1200);


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

    return (
        <>
            <div className='container mx-auto px-[5rem] mt-8'>
                <p className='text-white text-3xl font-bold'>Check Out</p>
                <div className='flex items-start justify-between'>
                    <div>
                        <div className='mt-4 border-b-2 border-slate-700 py-4'>
                            <p className='text-white text-2xl font-bold mb-3'>Shipping Address</p>
                            <div className='flex flex-col justify-between h-[10rem]'>
                                <div className='flex items-center justify-around'>
                                    <p className='flex items-center'>
                                        <span className="material-symbols-outlined mr-2">
                                            person
                                        </span> Name:
                                    </p>
                                    <input className='outline-none bg-slate-700 border px-2 border-slate-800 w-[20rem] h-[2rem] rounded-md' type="text" />
                                </div>
                                <div className='flex items-center justify-around mr-4'>
                                    <p className='flex items-center'>
                                        <span className="material-symbols-outlined mr-2">
                                            home
                                        </span> Address:
                                    </p>
                                    <input className='outline-none bg-slate-700 border relative left-2 w-[20rem] h-[2rem] px-2 border-slate-800 rounded-md' type="text" value={shippingAddress} onChange={(e) => setShippingAddress(e.target.value)} />
                                </div>
                                <div className='flex items-center justify-around'>
                                    <p className='flex items-center'>
                                        <span className="material-symbols-outlined mr-2">
                                            call
                                        </span> Phone:
                                    </p>
                                    <input className='outline-none bg-slate-700 border w-[20rem] h-[2rem] px-2 border-slate-800 rounded-md' type="text" />
                                </div>
                            </div>
                        </div>

                        <div className='mt-4 border-b-2 border-slate-700 py-4 pb-12'>
                            <p className='text-white text-2xl font-bold mb-3'>Deliver Type</p>
                            <div className='grid grid-cols-2 h-[10rem] gap-y-8 gap-x-4'>
                                <CheckoutPayment type={"Free Shipping"} cost={0} specs={"Get Free Shipped products in Time!"} onRadioChange={() => handleRadioChange("Free Shipping", 0)} selectedType={selectedType} />
                                <CheckoutPayment type={"Two days Shipping"} cost={20} specs={"Everything faster with a minimum shipping fee."} onRadioChange={() => handleRadioChange("Two days Shipping", 20)} selectedType={selectedType} />
                                <CheckoutPayment type={"Standard Shipping"} cost={10} specs={"Get timely delivery with economy shipping."} onRadioChange={() => handleRadioChange("Standard Shipping", 10)} selectedType={selectedType} />
                                <CheckoutPayment type={"One day Shipping"} cost={30} specs={"Highest priority shipping at the lowest cost."} onRadioChange={() => handleRadioChange("One day Shipping", 30)} selectedType={selectedType} />
                            </div>
                        </div>

                        <div className="text-white mt-4  mb-2 border-b-2 border-slate-700 py-4">
                            <p className='text-2xl font-bold mb-3'>Payment Method</p>
                            <div className='flex items-center justify-between'>
                                <div className="mb-4">
                                    <label htmlFor="cardType" className="block font-bold  text-white">Select Card:</label>
                                    <select id="cardType" name="cardType" className="border bg-slate-700 border-slate-800  outline-none p-2 rounded" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                        <option defaultValue={"select a cart"}>Select a Card</option>
                                        <option value="visa">Visa</option>
                                        <option value="discover">Discover</option>
                                        <option value="mastercard">MasterCard</option>
                                        <option value="amex">American Express</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="cardNumber" className="block font-bold text-white">Card Number:</label>
                                    <input type="number" id="cardNumber" name="cardNumber" className="border bg-slate-700 border-slate-800  outline-none p-2 rounded w-full" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="fullName" className="block font-bold text-white">Full Name:</label>
                                <input type="text" id="fullName" name="fullName" className="border w-full bg-slate-700 border-slate-800  outline-none p-2 rounded" />
                            </div>
                            <div className="mb-4">
                                <label className="block font-bold text-white">Expires on:</label>
                                <div className="flex items-center justify-between mt-3">
                                    <div className='flex flex-col items-center'>
                                        <label className='text-white font-bold'>Month</label>
                                        <select id="expirationMonth" name="expirationMonth" className="border bg-slate-700 border-slate-800  outline-none p-2 rounded">
                                            <option value="01">January</option>
                                            <option value="02">February</option>
                                            {/* Add more months */}
                                        </select>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <label className='text-white font-bold'>Year</label>
                                        <select id="expirationYear" name="expirationYear" className="border scroll bg-slate-700 border-slate-800  outline-none p-2 rounded ml-2">
                                            {Array.from({ length: new Date().getFullYear() - 1989 }, (v, k) => k + 1990).map(year => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='flex flex-col items-center'>
                                        <label htmlFor="cvc" className="block font-bold text-white ml-2">CVC:</label>
                                        <input type="number" id="cvc" name="cvc" className="border bg-slate-700 border-slate-800  outline-none p-2 rounded ml-2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='my-4 mb-4'>
                            <button className='border border-blue-600 py-2 w-full rounded-md text-white bg-blue-600 font-bold' onClick={createOrder}>Pay
                                {
                                    selectedCarts ? `${" "} ($${total})` : null
                                }
                            </button>
                        </div>
                    </div>
                    <div className="border border-slate-700 rounded-lg w-[30rem] h-full p-2">
                        <div className='flex items-center justify-between px-3 my-2'>
                            <p className='text-white font-bold text-3xl'>Summary</p>
                            <p className='text-md text-blue-600 underline font-semibold cursor-pointer' onClick={navigateToCart}>Edit Cart</p>
                        </div>
                        <div className='border-b-2 border-slate-700 pb-8'>
                            {carts.reduce((total, cart) => total + cart.items.length, 0) === 0 ? (<div className='text-center mt-2 font-semibold text-2xl' >
                                <p  >Cart is Empty</p>
                            </div>) : (<table className="min-w-full h-fit overflow-scroll">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th className='text-[13px]'>Image</th>
                                        <th className='text-[13px]'>Product Title</th>
                                        <th className='text-[13px]'>Quantity</th>
                                        <th className='text-[13px]'>Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carts.map((cart, cartIndex) => {
                                        return cart.items.map((product, productIndex) => {
                                            return (
                                                <tr key={`cart-${cartIndex}-product-${productIndex}`}>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            id={`checkbox-${cart._id}`}
                                                            className="cursor-pointer"
                                                            onClick={() => handleCheckboxChange(cart._id)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <img
                                                            className="w-[3rem] h-[3rem] border border-slate-600 p-1 rounded-md object-cover"
                                                            src={product.product.picture}
                                                            alt="product_img"
                                                        />
                                                    </td>
                                                    <td>
                                                        <p className="text-sm text-white">
                                                            {product.product.title.split(" ").slice(0, 3).join(" ")}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <p className="text-sm text-white font-bold">
                                                            x{product.quantity}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <p className="text-sm text-white font-bold">
                                                            ${cart.totalPrice}.00
                                                        </p>
                                                    </td>
                                                </tr>
                                            );
                                        });
                                    })}
                                </tbody>
                            </table>)}
                        </div>
                        <div className='border-b-2 border-slate-700 py-4'>
                            <div className='flex items-center justify-between'>
                                <p className='text-slate-400 font-bold text-xl'>Items Subtotal:</p>
                                <p className='font-semibold'>${subTotal}</p>
                            </div>
                            <div className='flex items-center justify-between mt-4'>
                                <p className='text-slate-400 font-bold text-xl'>Shipping Cost:</p>
                                <p className='text-orange-500 font-semibold'>${shippingCost}</p>
                            </div>
                        </div>
                        <div className='flex items-center justify-between mt-4'>
                            <p className='text-white text-2xl font-bold'>Total:</p>
                            <p className='text-white text-xl font-bold'>${total}</p>
                        </div>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </>
    );
}

export default CustomerCheckOut;
