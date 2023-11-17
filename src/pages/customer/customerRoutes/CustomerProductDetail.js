import React, { useState } from 'react';
import axios from "../../../utils/AxiosConfiq";
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import HomeCarousel from '../customerHome/HomeCarousel';
import { fetchProducts } from '../../../redux/Actions/Action';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const CustomerProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [stock, setStock] = useState(null);
    const [offer, setOffer] = useState(null);
    const [originalPrice, setOriginalPrice] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products)
    const navigate = useNavigate();
    const desc = "CUPERTINO, CA , The M1 CPU allows Apple to deliver an all-new iMac with a lot more compact and impressively thin design. The new iMac delivers tremendous performance in an 11.5-millimeter-thin design with a stunning side profile that almost vanishes. iMac includes a 24-inch 4.5K Retina display with 11.3 million pixels, 500 nits of brightness, and over a billion colors, giving a beautiful and vivid viewing experience. It is available in a variety of striking colors to match a user's own style and brighten any area. A 1080p FaceTime HD camera, studio-quality mics, and a six-speaker sound system are all included in the new iMac, making it the greatest camera and audio system ever in a Mac. Touch ID is also making its debut on the iMac, making it easier than ever to securely log in, make Apple Pay transactions, and switch user accounts with the touch of a finger. Apps launch at lightning speed, everyday chores seem astonishingly fast and fluid, and demanding workloads like editing 4K video and working with large photos are faster than ever before thanks to the power and performance of M1 and macOS Big Sur.";
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch]);

    useEffect(() => {

        const fetchSingleProduct = async () => {
            try {
                const { data } = await axios.get(`/api/customer/single-product/${productId}`)
                setProduct(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleProduct();
    }, [productId]);
    useEffect(() => {
        if (product && product.stockQuantity > 0) {
            setStock(<p className='border border-green-500 bg-green-600 px-3 py-1 text-white rounded-lg mt-3 cursor-pointer w-fit'>In Stock</p>);
        } else {
            setStock(<p className='border border-red-500 bg-red-600 px-3 py-1 text-white rounded-lg mt-3 cursor-pointer w-fit'>Out Of Stock</p>);
        }
        if (product && product.offer > 0) {
            setOffer(<p className='text-2xl text-orange-500 font-bold' > {product.offer}% off </p>)
        }
        if (product && product.offer > 0) {

            setOriginalPrice(<p className='text-slate-400 text-2xl mr-4 line-through font-light ' >${product.price + (product.price / 100) * product.offer}</p>)

        }
        else {
            setOriginalPrice(null)
        }

    }, [product]);

    const handleMinusClick = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const handlePlusClick = () => {
        setQuantity(quantity + 1);
    }
    const addToCart = async () => {
        try {
            const data = {
                items: [
                    {
                        product: productId,
                        quantity: quantity,
                    }
                ],
            }
            const token = JSON.parse(localStorage.getItem("token"))
            const confiq = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token
                }
            }
            const addedCart = await axios.post("/api/customer/add-to-cart", data, confiq);

            if (addedCart) {
                toast.success(' Item added to Cart', {
                    position: "top-center",
                    autoClose: 600,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            }
            setTimeout(() => {
                navigate("/customer/cart")
            }, 1500);

        } catch (error) {
            console.log(error);
            if (error.response) {
                console.log('Server responded with status code:', error.response.status);
                console.log("response error", error.response.data);
                toast.error(`${error.response.data.error}`, {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

            } else if (error.request) {
                console.log('No response received:', error.request);
            } else {
                console.log('Error creating request:', error.message);
            }
        }
    }
    const filteredProducts = products.filter(item => product && item.category === product.category)
    return (
        <>
            <div className='container mx-auto px-[5rem] w-full text-white'>
                {product && (
                    <div className='py-8 w-full' >
                        <div className='flex  justify-around' >
                            <div className='w-[30%]' >
                                <div>
                                    <img className='border w-[30rem] h-[25rem] object-cover border-slate-700 rounded-lg' src={`${product.picture}`} alt="" />
                                </div>
                                <div className='flex items-center justify-around mt-4' >
                                    <button className='flex items-center justify-between border border-orange-600 px-4 py-2 rounded-full text-orange-400 hover:bg-orange-600 hover:text-white ' ><span className="material-symbols-outlined">
                                        favorite
                                    </span> Add to wishlist</button>
                                    <button onClick={addToCart} className=' flex items-center border border-orange-600 bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-full ' > <span className="material-symbols-outlined">
                                        shopping_cart
                                    </span> Add to Cart</button>
                                </div>

                            </div>
                            <div className='w-[50%]' >
                                <p className='text-4xl font-bold whitespace-normal' >{product.title.length < 20 ? product.title + " Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, adipisci?" : product.title}</p>
                                <div className='flex mt-4' >
                                    <p className='border border-green-600 px-3 py-1 rounded-full bg-green-500 text-white mr-3 text-sm font-lighter' >#1 Best Seller</p>
                                    <p className='text-blue-600 font-semibold cursor-pointer' >in BuyIt sell analytics 2023</p>
                                </div>
                                <div className='flex items-center mt-4' >
                                    <p className='text-4xl font-bold mr-2' >${product.price}.00</p>
                                    {
                                        originalPrice
                                    }
                                    {
                                        offer
                                    }
                                </div>
                                <div>
                                    {
                                        stock
                                    }
                                </div>
                                <div className='mt-4 ' >
                                    <p className='text-xl text-orange-600 font-bold ' > <span className='text-slate-400 mr-4 text-lg font-semibold' > Vendor :</span>{product.vendor} </p>
                                    <p> category : {product.category} </p>
                                    <p>Available Stock: {product.stockQuantity}</p>
                                </div>
                                <div className='mt-4' >
                                    <p>Quantity : </p>
                                    <div className='flex items-center mt-3' >
                                        <button className='border border-slate-600  rounded-lg mr-4' onClick={handleMinusClick} > <span className="material-symbols-outlined px-2 text-slate-400  ">
                                            remove
                                        </span> </button>
                                        <p> {quantity} </p>
                                        <button className='border border-slate-600  rounded-lg ml-4' onClick={handlePlusClick} ><span className="material-symbols-outlined px-2 text-slate-400">
                                            add
                                        </span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='mt-8 ' >

                            <p className='text-blue-400 border-b-[3px] border-blue-400 w-fit' >Description</p>
                            <p className='mt-4' >{product.description === "to be added" ? product.description = desc : product.description}</p>

                            <div>

                            </div>
                        </div>

                    </div>
                )}
            </div>
            <div className='  container mx-auto ' >
                <HomeCarousel title={"Similar Products"} products={filteredProducts} />
            </div>
            <ToastContainer />
        </>
    );
}

export default CustomerProductDetail;
