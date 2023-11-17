import { React, useState } from 'react';
import axios from "../../utils/AxiosConfiq";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"

const Register = () => {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [picture, setPicture] = useState("");
    const [isAdmin, setIsAdmin] = useState();
    const [showPass, setShowPass] = useState(false)
    const navigate = useNavigate();
    const postDetails = (pics) => {
        if (pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "GupShup");
            data.append("cloud_name", "gup-shup");
            fetch("https://api.cloudinary.com/v1_1/gup-shup/image/upload", {
                method: "post",
                body: data,
            }).then(res => res.json())
                .then(data => {
                    setPicture(data.url.toString())

                })
                .catch((err) => {
                    console.log(err);

                })

        }

    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {

            const { data } = await axios.post("/api/user/signup", { fullname, username, email, password, picture, isAdmin });
            localStorage.setItem("token", JSON.stringify(data.token))
            if (data) {
                toast.success(`${data.message}`, {
                    position: "top-center",
                    autoClose: 300,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }

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
    const togglePass = () => {
        setShowPass(!showPass)
    }
    return (

        <div className='auth-main'>
            <h2 className='auth-title text-4xl text-pink' >Register</h2>
            <form onSubmit={handleSubmit} autoComplete='on' className='auth-form' >
                <input

                    className='auth-input'
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={(e) => { setFullname(e.target.value) }}
                    required
                />
                <input
                    className='auth-input'
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                    required
                />
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
                        className='auth-input '

                        type={`${showPass ? "text" : "password"}`}
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        required
                    />
                    <span onClick={togglePass} className="material-symbols-outlined absolute bottom-5 right-2 cursor-pointer">
                        {showPass ? "visibility_off" : "visibility"}
                    </span>
                </div>
                <input
                    className='auth-input py-1'
                    type='file'
                    accept='image/*'
                    onChange={(e) => { postDetails(e.target.files[0]) }}
                />
                <div className="flex justify-around">
                    <label className='font-medium' >
                        <input
                            className='cursor-pointer mr-2'
                            type="radio"
                            name="isAdmin"
                            value={false}
                            onChange={(e) => { setIsAdmin(e.target.value) }}
                        />
                        Customer
                    </label>
                    <label className='font-medium' >
                        <input
                            className='cursor-pointer mr-2'
                            type="radio"
                            name="isAdmin"
                            value={true}
                            onChange={(e) => { setIsAdmin(e.target.value) }}
                        />
                        Admin
                    </label>
                </div>
                <button className='auth-button' type="submit">Register</button>
                <Link className='auth-link' to="/login">Already have an account? Login here</Link>
            </form>

        </div>
    );
}

export default Register;
