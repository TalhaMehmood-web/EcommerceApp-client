import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUser } from '../../../redux/Actions/Action';
import { useNavigate } from 'react-router-dom';

const CustomerNav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(state => state.user.user)
    const [isClicked, setClicked] = useState(false)
    const carts = useSelector(state => state.cart.cart)
    const [darkMode, setDarkMode] = useState(true);
    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    const handleProfile = async () => {
        setClicked(!isClicked)

    }

    const updateProfile = () => {
        navigate(`/update-profile/${userData._id}`)
    }
    const toProducts = () => {
        navigate(`/customer/products`)
    }
    const addAccount = () => {
        navigate("/")
    }
    const toCart = () => {
        navigate("/customer/cart")
    }
    const logout = () => {
        localStorage.removeItem("token")
        setTimeout(() => {
            navigate("/login")
        }, 1200)
    }

    const ToggleDarkMode = () => {
        setDarkMode(!darkMode)
    }
    const changePassword = () => {
        navigate(`/change-password/${userData?._id}`)
    }
    return (
        <nav className={`text-icon_color bg-body w-full  flex flex-col  ${!darkMode && "bg-slate-100 text-black"} `} >
            <div className="container mx-auto  lg:px-20 px-0 py-3">
                <div className="md:flex items-center lg:justify-between md:flex-row   grid sm:grid-cols-2 grid-cols-1 gap-2 justify-around md:justify-around ">
                    <div>
                        <p className={` font-bold text-4xl ${!darkMode ? "text-black" : "text-white"} `} >BuyIt</p>
                    </div>
                    <div className='sm:row-start-2 col-span-2' >
                        <div className={`flex items-center bg-input-bg border border-input-bg rounded-lg p-1 ${!darkMode && "bg-slate-200 border border-slate-400"} `}>
                            <span className="material-symbols-outlined text-icon_color p-1">
                                search
                            </span>
                            <input type="text" placeholder='Search' className={`md:w-[30em]  md:p-1 bg-transparent ${!darkMode && "bg-slate-200 text-black"} outline-none text-slate-300`} />
                        </div>
                    </div>
                    <div className='sm:text-end ' >
                        <button>
                            <span className={`material-symbols-outlined ${!darkMode && "text-black"}  lg:mx-2 text-icon_color ${darkMode && "hover:text-white"}`} onClick={ToggleDarkMode} >
                                {darkMode ? "light_mode" : "dark_mode"}
                            </span>
                        </button>
                        <button>
                            <span className={`material-symbols-outlined ${!darkMode && "text-black"}  lg:mx-2 text-icon_color${darkMode && "hover:text-white"}`}>
                                notifications
                            </span>
                        </button>
                        <button className='relative' onClick={toCart} >
                            <span className={`material-symbols-outlined ${!darkMode && "text-black"} w-30px lg:mx-2 text-icon_color ${darkMode && "hover:text-white"}`}>
                                shopping_cart
                            </span>
                            <p className=' w-5 h-5 text-center font-bold text-xs text-white absolute -top-2 right-0 bg-blue-600 border border-blue-600 rounded-full' >
                                {carts.filter(cart => cart.items.length > 0).length}</p>
                        </button>
                        <button onClick={handleProfile} className='relative' >
                            <span className={`material-symbols-outlined ${!darkMode && "text-black"}  lg:mx-2 text-icon_color ${darkMode && "hover:text-white"}`}>
                                person
                            </span>
                            {
                                isClicked && (<div className='absolute -right-4 top-12 bg-slate-700 cursor-auto w-72 h-fit z-10 rounded-md border-slate-500 border' >
                                    <div className='flex items-center justify-evenly bg-slate-800 rounded-t-md  py-2 ' >
                                        {userData?.picture ? (
                                            <div>
                                                <img className='w-16 h-16 border border-slate-500 p-1 object-cover rounded-full' src={userData?.picture} alt="" />
                                            </div>
                                        ) : null}

                                        <div className='flex items-start flex-col ' > <p className='text-white text-sm font-semibold' >{userData?.fullname}</p>
                                            <p className='text-white font-semibold text-sm' >{userData?.email}</p></div>
                                    </div>
                                    <div>
                                        <div className='py-2' >

                                            <div className='flex items-center mt-1 cursor-pointer'>
                                                <span className="material-symbols-outlined  lg:mx-2 text-icon_color hover:text-white">
                                                    person
                                                </span> <p className='text-sm text-slate-200 font-medium' onClick={() => updateProfile(userData._id)} >Update profile</p></div>
                                            <div className='flex items-center mt-3 cursor-pointer'><span className="material-symbols-outlined  lg:mx-2 text-icon_color hover:text-white">
                                                bar_chart_4_bars
                                            </span> <p className='text-sm text-slate-200 font-medium' onClick={toProducts}  >Shop Now!</p></div>
                                            <div className='flex items-center mt-3 cursor-pointer'><span className="material-symbols-outlined  lg:mx-2 text-icon_color hover:text-white">
                                                person_add
                                            </span> <p className='text-sm text-slate-200 font-medium' onClick={addAccount} >Add another account</p></div>
                                            <div className='flex items-center mt-3 cursor-pointer'><span className="material-symbols-outlined  lg:mx-2 text-icon_color hover:text-white">
                                                key
                                            </span> <p className='text-sm text-slate-200 font-medium' onClick={changePassword} >Change Password</p></div>
                                            <div className='flex items-center mt-3 border-t pt-2 border-slate-500 cursor-pointer '><span className="material-symbols-outlined  lg:mx-2 text-icon_color hover:text-white">
                                                logout
                                            </span> <p className='text-sm text-slate-200 font-medium' onClick={logout} >Logout</p></div>


                                        </div>


                                    </div>



                                </div>)


                            }
                        </button>
                    </div>
                </div>

            </div>
        </nav>
    );
}

export default CustomerNav;
