import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../../utils/AxiosConfiq"
import { toast } from "react-toastify"
import { useParams } from 'react-router-dom';
const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("")
    const { id } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/user/change-password/${id}`, { currentPassword, newPassword, confirmNewPassword })
            if (data) {
                toast.success(`Password Updated Successfully`, {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    navigate("/login");
                }, 1200)
            }

        } catch (error) {
            console.log(error);
            toast.error(`${error.response.data.error}`, {
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
        <div className='auth-main'>
            <p className='auth-title' >Change Password</p>
            <form onSubmit={handleSubmit} autoComplete='on' className='auth-form' >
                <input autoComplete='current-password' className='auth-input' type="text" placeholder='Current Password' value={currentPassword} onChange={(e) => { setCurrentPassword(e.target.value) }} />
                <input autoComplete='new-password' className='auth-input' type="password" placeholder='New Password' value={newPassword} onChange={(e) => { setNewPassword(e.target.value) }} />
                <input autoComplete='confirm-new-password' className='auth-input' type="password" placeholder='Confirm New Password' value={confirmNewPassword} onChange={(e) => { setConfirmNewPassword(e.target.value) }} />
                <button className='auth-button' >Change Password</button>

            </form>
        </div>
    );
}

export default ChangePassword;
