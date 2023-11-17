import React, { useEffect, useState } from 'react';
import "../../../css/componentsCss/adminNav.css"
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../../redux/Actions/Action';
import { useNavigate } from 'react-router-dom';
const AdminNav = () => {
    const navigate = useNavigate();
    const [isClicked, setClicked] = useState(false)
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user)

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])
    const handleProfile = () => {
        setClicked(!isClicked
        )
    }
    const updateProfile = () => {
        navigate(`/update-profile/${user._id}`)
    }
    const toDashboard = () => {
        navigate("/admin")
    }
    const addAccount = () => {
        navigate("/")
    }
    const logout = () => {
        localStorage.removeItem("token")

        setTimeout(() => {
            navigate("/login")
        }, 1200)


    }
    const changePassword = () => {
        navigate(`/change-password/${user?._id}`)
    }
    return (
        <div className="navbar  bg-slate-900 border-y border-y-slate-800">
            <div className='container mx-auto flex justify-between items-center px-[5rem]' >
                <div className="nav_left">
                    <p className='text-3xl font-bold' >BuyIt</p>
                </div>
                <div className={`flex items-center bg-input-bg border border-input-bg rounded-lg p-1 `}>
                    <span className="material-symbols-outlined text-icon_color p-1">
                        search
                    </span>
                    <input type="text" placeholder='Search' className={`md:w-[30em]  md:p-1 bg-transparent outline-none text-slate-300`} />
                </div>
                <div className="flex items-end  ">
                    <button>
                        <span className="material-symbols-outlined  lg:mx-2 text-icon_color hover:text-white">
                            dark_mode
                        </span>
                    </button>
                    <button>
                        <span className="material-symbols-outlined  lg:mx-2 text-icon_color hover:text-white">
                            notifications
                        </span>
                    </button>
                    <button>
                        <span className="material-symbols-outlined  lg:mx-2 text-icon_color hover:text-white">
                            shopping_basket
                        </span>
                    </button>
                    <button onClick={handleProfile} className='relative ml-5 ' >
                        <img src={user.picture} className='w-10 h-10 rounded-full object-cover' alt="" />
                        {
                            isClicked && (<div className='absolute -right-4 top-11 bg-slate-700 cursor-auto w-72 h-fit z-10 rounded-md border-slate-500 border' >
                                <div className='flex items-center justify-evenly bg-slate-800 rounded-t-md  py-2 ' >
                                    <div> <img className='w-16 h-16 border border-slate-500 p-1 object-cover rounded-full' src={user.picture} alt="" /></div>
                                    <div className='flex items-start flex-col ' > <p className='text-slate-100 text-sm font-semibold' >{user.fullname}</p>
                                        <p className='text-slate-100 font-semibold text-sm' >{user.email}</p></div>
                                </div>
                                <div className='my-2' >

                                    <div className='flex items-center mt-3 cursor-pointer'>
                                        <span className="material-symbols-outlined  lg:mx-2 text-icon_color hover:text-white">
                                            person
                                        </span> <p className='text-sm text-slate-200 font-medium' onClick={() => updateProfile(user._id)} >Update profile</p></div>
                                    <div className='flex items-center mt-3 cursor-pointer'><span className="material-symbols-outlined  lg:mx-2 text-icon_color hover:text-white">
                                        bar_chart_4_bars
                                    </span> <p className='text-sm text-slate-200 font-medium' onClick={toDashboard}  >Dashboard</p></div>
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



                            </div>)


                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminNav;
