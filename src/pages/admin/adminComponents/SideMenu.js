import { React, useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import "../../../css/componentsCss/sidemenu.css";
import { useSelector, useDispatch } from "react-redux"
import { getOrders } from '../../../redux/Actions/Action';

const SideMenu = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.order.order)
    const [orders, setOrders] = useState([]);
    const [collapse, setCollapse] = useState(false)
    useEffect(() => {
        dispatch(getOrders())
    }, [dispatch])
    useEffect(() => {
        setOrders(data)
    }, [data])
    const handleSideBar = () => {
        setCollapse(!collapse)


    }
    return (
        <div className={`side-menu bg-slate-900 border-r border-r-slate-800 ${collapse ? "w-[4rem] " : "w-[14rem]"} scroll`}>
            <Link to={"/admin"} className={`admin-routes ${!collapse ? "hover:bg-slate-700" : ""} `}  >
                <div className="route-style">
                    <span
                        className="material-symbols-outlined">
                        dashboard
                    </span>
                    <p>Dashboard</p>
                </div>
            </Link>
            <Link to={"/admin/add-product"} className={`admin-routes ${!collapse ? "hover:bg-slate-800" : ""} `} >
                <div className="route-style">
                    <span
                        className="material-symbols-outlined">
                        inventory_2
                    </span>
                    <p>Add Product</p>
                </div>
            </Link>
            <Link to={"/admin/list-product"} className={`admin-routes ${!collapse ? "hover:bg-slate-700" : ""} `} >
                <div className="route-style">
                    <span className="material-symbols-outlined">
                        inventory
                    </span>
                    <p>Products</p>
                </div>
            </Link>
            <Link to={"/admin/list-customers"} className={`admin-routes ${!collapse ? "hover:bg-slate-800" : ""} `} >
                <div className="route-style">
                    <span
                        className="material-symbols-outlined">
                        person
                    </span>
                    <p>Customers</p>
                </div>
            </Link>
            <Link to={"/admin/orders"} className={`admin-routes ${!collapse ? "hover:bg-slate-700" : ""} `} >
                <div className="route-style">
                    <span
                        className="material-symbols-outlined">
                        order_approve
                    </span>
                    <p>Orders</p>
                </div>
            </Link>
            <Link to={`/admin/order-status/${orders && orders.length > 0 ? orders[0]._id : ''}`} className={`admin-routes ${!collapse ? "hover:bg-slate-800" : ""} `} >
                <div className="route-style">
                    <span
                        className="material-symbols-outlined">
                        pending_actions
                    </span>
                    <p>Order Status</p>
                </div>
            </Link>
            <div className=' c-hover' >
                <div className="route-style  " onClick={handleSideBar}>
                    <span className={`${!collapse ? "rotate" : ""} material-symbols-outlined`}>
                        start
                    </span>
                    <p>Collapse View</p>
                </div>
            </div>
        </div>
    );
}

export default SideMenu;


// Home
// DashBoard
// Add Products
//products
//customers
//customers details
//orders
//orders Details
