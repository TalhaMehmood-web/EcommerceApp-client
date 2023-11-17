import React, { useEffect, useState } from 'react';
import axios from "../../../utils/AxiosConfiq";
import jwt from "jwt-decode"
import AdminFooter from "../adminComponents/AdminFooter"
const ViewCustomers = () => {
    const [userDetails, setUserDetails] = useState([]);
    const [nameFilter, setNameFilter] = useState("");
    const [emailFilter, setEmailFilter] = useState("");
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = JSON.parse(localStorage.getItem("token"))
                const decoded = jwt(token);
                const adminId = decoded._id;
                const { data } = await axios.get(`/api/admin/all-customers/${adminId}`)

                setUserDetails(data)

            } catch (error) {
                console.log(error);
            }

        }
        fetchUsers();
    }, [])

    const filteredCustomers = userDetails.filter(item => {
        return item.user.fullname.toLowerCase().includes(nameFilter.toLowerCase()) && item.user.email.toLowerCase().includes(emailFilter.toLowerCase())
    })
    return (
        <>
            <div className='grid grid-cols-1 w-full px-4 py-6 font-semibold' >
                <p className='text-white text-4xl font-bold mb-6' >
                    Customers
                </p>
                <div className='' >
                    <div className='w-full flex justify-between mb-6' >
                        <div className="w-[70%] flex items-center justify-between" >
                            <div className='flex items-center border border-slate-700 rounded-md' >
                                <span className="material-symbols-outlined  px-3" >
                                    search
                                </span>
                                <input type="text" className='outline-none border-none rounded-r-md py-2 px-1 bg-slate-900 w-[20rem] '
                                    placeholder='Search Customer..'
                                    value={nameFilter}
                                    onChange={(e) => setNameFilter(e.target.value)} />
                            </div>
                            <div>

                                <select className='bg-slate-900 text-slate-200  outline-none py-2 rounded-md' value={emailFilter} onChange={(e) => setEmailFilter(e.target.value)}  >
                                    <option value="">Email</option>
                                    {
                                        userDetails.map((item, index) => (
                                            <option key={index} value={item.user.email}>{item.user.email}</option>
                                        ))

                                    }


                                </select>


                            </div>
                        </div>

                        <div className='w-[30%] ' style={{ flexBasis: "content" }}  >
                            <button className='text-white bg-blue-600 rounded-md border border-blue-700 hover:bg-blue-700 py-2 px-3 font-semibold' >Button</button>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <div className="w-full ">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-900">
                                    <th className="p-2">Picture</th>
                                    <th className="p-2">Name</th>
                                    <th className="p-2">Email</th>
                                    <th className="p-2">Orders</th>
                                    <th className="p-2">Total Spent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCustomers.map((item, index) => (
                                    <tr key={index} className={index % 2 === 0 ? 'bg-[#1a2031]' : ''}>
                                        <td className="py-2 px-2">
                                            <img src={item.user.picture} alt="User" className="w-12 h-12 rounded-full object-cover " />
                                        </td>
                                        <td className="py-2 px-2">{item.user.fullname}</td>
                                        <td className="py-2 px-2">{item.user.email}</td>
                                        <td className="py-2 px-2">{item.orderCount}</td>
                                        <td className="py-2 px-2">${item.totalOrderPrice}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AdminFooter />
        </>
    );
}

export default ViewCustomers;
