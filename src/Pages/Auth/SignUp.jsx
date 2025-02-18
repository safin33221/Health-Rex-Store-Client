import { useForm } from "react-hook-form";


import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdInsertPhoto } from "react-icons/md";
import moment from "moment";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`


import { LuLoaderPinwheel } from "react-icons/lu";

const SignUp = () => {
    const [loading, setLoading] = useState(false)
    const axiosPublic = useAxiosPublic()
    const [showPass, setShowPass] = useState(false)
    const { createUserwithEmail, updateUserProfile } = useAuth()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,

    } = useForm()
    const onsubmit = async (data) => {
        setLoading(true)

        const imgFile = { image: data.image[0] }
        const imglink = await axios.post(img_hosting_api, imgFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        const image = imglink.data.data.display_url

        createUserwithEmail(data.email, data.password)
            .then(res => {
                updateUserProfile(data.userName, image)
                    .then(res => {
                        const userInfo = {
                            name: data.userName,
                            image: image,
                            email: data.email,
                            role: data.role,
                            time: moment().format('LLL')
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                setLoading(false)

                                Swal.fire({
                                    position: "top-end",
                                    icon: "success",
                                    title: "You have been Sign Up succefully",
                                    showConfirmButton: false,
                                    timer: 1000
                                });
                                navigate('/')
                            })

                    })
            })
    }
    return (
        <div className="pt-16 pb-7">
            <Helmet title="HRS | SIGN UP" />
            <form onSubmit={handleSubmit(onsubmit)} >
                <div className="max-w-xl mx-auto border shadow-2xl rounded-lg p-4">
                    <h1 className="text-3xl font-bold text-center py-5">SignUp Now!</h1>


                    <label className="input input-bordered flex items-center gap-2 mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                        </svg>
                        <input {...register("userName")} required type="text" className=" focus:outline-none" placeholder="User Name" />
                    </label>
                    <label className="  mb-4">

                        <input {...register("image")} required type="file" className="file-input file-input-bordered  w-full focus:outline-none mb-3" placeholder="image" />

                    </label>
                    <label className="input input-bordered flex items-center gap-2 mb-4">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                            <path
                                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input {...register("email")} required type="email" className=" focus::outline-none" placeholder="Email" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 mb-4 relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                clipRule="evenodd" />
                        </svg>
                        <input {...register("password")} type={showPass ? 'text' : 'password'} className=" focus:outline-none" placeholder="password " />
                        <button type='button' className='absolute right-3 top-4' onClick={() => setShowPass(!showPass)}>{showPass ? <FaEye /> : <FaEyeSlash />}</button>
                    </label>
                    <label className="flex items-center gap-2 mb-4">
                        <input {...register('role')} required type="radio" name="role" value="user" />
                        <span>User</span>
                        <input  {...register('role')} required type="radio" name="role" value="seller" />
                        <span>Seller</span>
                    </label>
                    <label className="flex items-center gap-2 mb-4 mx-auto">

                        <button className="btn btn-outlin=font-bold mx-auto w-full">{
                            loading ? <LuLoaderPinwheel className="animate-spin text-xl" /> : "Sign Up"
                        }</button>
                    </label>
                    <p>Already have an Account? <Link to='/signIn' className="text-blue-800">Sign In Now</Link></p>
                </div>
            </form>
        </div>
    );
};

export default SignUp;