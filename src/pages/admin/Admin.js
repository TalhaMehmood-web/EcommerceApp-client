import React from 'react';
import AdminNav from './adminComponents/AdminNav';
import SideMenu from './adminComponents/SideMenu';

import { Outlet } from 'react-router-dom';

import "../../css/pagesCss/admin.css";


const Admin = () => {
    return (
        <div className="admin-layout">
            <div className="admin-top">
                <AdminNav />
            </div>
            <div className="admin-btm">
                <div className="admin-left">
                    <SideMenu />
                </div>
                <div className="admin-right">
                    <div className="right-top flex flex-col justify-between">

                        <Outlet />

                    </div>

                </div>
            </div>

        </div>
    );
}

export default Admin;
