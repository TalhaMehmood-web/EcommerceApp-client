
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../../utils/AxiosConfiq"
import { toast } from "react-toastify"
const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resetPasswordToken, setResetPasswordToken] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/user/reset-password`, { password, confirmPassword, resetPasswordToken })
            if (data) {
                toast.success(`Password Reset Successfully`, {
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

    }
    return (
        <div className='auth-main'>
            <p className='auth-title' >Reset Password</p>
            <form onSubmit={handleSubmit} autoComplete='on' className='auth-form' >
                <input autoComplete='on' className='auth-input' type="text" placeholder='Enter the OTP' value={resetPasswordToken} onChange={(e) => { setResetPasswordToken(e.target.value) }} />
                <input autoComplete='on' className='auth-input' type="password" placeholder='New Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <input autoComplete='on' className='auth-input' type="password" placeholder='Confirm New Password' value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                <button className='auth-button' >Reset Password</button>

            </form>
        </div>
    );
}

export default ResetPassword;
