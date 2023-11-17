import { React, useState, useEffect } from 'react';
import axios from "../../utils/AxiosConfiq";
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../redux/Actions/Action';
import { toast } from "react-toastify"
import { Link } from 'react-router-dom';
const UpdateProfile = () => {
    const user = useSelector(state => state.user.user)
    const [fullname, setFullname] = useState(user.fullname);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);

    const [picture, setPicture] = useState(user.picture);
    const [isAdmin, setIsAdmin] = useState(user.isAdmin);
    const { id } = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

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
                .catch((error) => {
                    toast.error(`${error}`, {
                        position: "top-center",
                        autoClose: 500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });

                })

        }

    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const data = {
                fullname,
                username,
                email,
                picture,
                isAdmin,
            }
            const updated = await axios.put(`/user/update-profile/${id}`, data)
            if (updated) {
                toast.success(`Profile Updated`, {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                user.isAdmin ? setTimeout(() => {
                    (navigate("/admin"))
                }, 1300) : setTimeout(() => {
                    (navigate("/customer"))
                }, 1300)
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

    return (
        <div className='auth-main'>
            <h2 className='auth-title' >Update Profile</h2>
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
                <button className='auth-button' type="submit">Update</button>
                <Link className='auth-link' to="/forget-password">Forget Password? Click here</Link>
            </form>

        </div>
    );
}

export default UpdateProfile;
