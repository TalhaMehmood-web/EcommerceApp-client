import { React, useState } from 'react';
import axios from "../../utils/AxiosConfiq";
import { toast } from "react-toastify"
import { useNavigate, Link } from 'react-router-dom';
const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/user/forget-password", { email });
            if (data) {
                toast.success(`OTP Sended Successfully`, {
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
                    navigate("/reset-password");
                }, 1300)
            }

        } catch (error) {
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
            <p className='auth-title mb-4' >Forget Password?</p>
            <form onSubmit={handleSubmit} autoComplete='on' className='auth-form' >
                <p className='text-center' >Enter the email associated with your account <br />
                    we will send you an OTP to reset your password</p>
                <input className='auth-input' type="text" value={email} placeholder='Enter your email' onChange={(e) => {
                    setEmail(e.target.value)
                }} />
                <button className='auth-button' >Submit</button>
                <Link className='auth-link' to="/">Don't have an account? Sign Up</Link>
            </form>
        </div>
    );
}

export default ForgetPassword;
