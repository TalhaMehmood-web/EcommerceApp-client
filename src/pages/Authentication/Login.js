import { React, useState } from 'react';
import axios from "../../utils/AxiosConfiq";
import { toast } from "react-toastify"
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault();
        try {

            const { data } = await axios.post("/api/user/login", { email, password });
            if (data) {
                toast.success(`${data.success}`, {
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
            localStorage.setItem("token", JSON.stringify(data.token))

            if (data.isAdmin) {
                setTimeout(() => {
                    navigate("/admin")
                }, 1200)
            }
            else {
                setTimeout(() => {
                    navigate("/customer")
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

    };
    const handleClick = () => {
        setClicked(!clicked)
    }
    return (
        <div className='auth-main'>
            <h2 className='auth-title' >Login</h2>
            <form onSubmit={handleSubmit} autoComplete='on' className='auth-form' >

                <input
                    className='auth-input'
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}
                    required
                />


                <div className='relative'>
                    <input
                        autoComplete='current-password'
                        className='auth-input '
                        type={`${clicked ? "text" : "password"}`}
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        required
                    />
                    <span onClick={handleClick} className="material-symbols-outlined absolute right-1 top-5   cursor-pointer">
                        {clicked ? "visibility_off" : "visibility"}
                    </span>
                </div>
                <button className='auth-button' type="submit">Login</button>
                <Link className='auth-link' to="/forget-password">Forget Password? Click here</Link>
            </form >

        </div >
    );
}

export default Login;
