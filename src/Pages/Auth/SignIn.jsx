import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import { Helmet } from 'react-helmet-async';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import moment from 'moment';
import { toast } from 'react-toastify';

const SignIn = () => {
    const [showPass, setShowPass] = useState(false)
    const { signInuser, siginUserWithGoogle } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,

    } = useForm()
    const onsubmit = async (data) => {
        signInuser(data.email, data.password)
            .then(res => {

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You have been login  succefully",
                    showConfirmButton: false,
                    timer: 1000
                });
                navigate('/')
            })
            .catch(error => {
                if (error.code === "auth/invalid-credential") {
                    return toast.error('Oops! The email or password you entered is incorrect.', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,


                    })
                }
            })
    }
    const hanldeGoogleSignIn = () => {
        siginUserWithGoogle()
            .then(res => {

                const userInfo = {
                    name: res.user?.displayName,
                    email: res.user?.email,
                    image: res.user?.photoURL,
                    role: 'user',
                    time: moment().format('LLL')
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {

                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "You have been login  succefully",
                            showConfirmButton: false,
                            timer: 1000
                        });
                    })
                navigate('/')
            })
    }
    return (
        <div className="pt-24 ">
            <Helmet title="HRS | SIGN IN" />
            <form onSubmit={handleSubmit(onsubmit)} >
                <div className="max-w-xl mx-auto border-2 rounded-lg p-4 border-secondary">
                    <h1 className="text-3xl font-bold text-center py-5">SignIn Now!</h1>



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
                        <input {...register("email")} type="email" className=" focus::outline-none" placeholder="Email" />
                    </label>
                    <label className="input input-bordered flex items-center relative gap-2 mb-4">
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
                        <input {...register("password")} type={showPass ? 'text' : 'password'} className=" focus:outline-none" placeholder="password" />
                        <button type='button' className='absolute right-3 top-4' onClick={() => setShowPass(!showPass)}>{showPass ? <FaEye /> : <FaEyeSlash></FaEyeSlash>}</button>
                    </label>
                    <label className="flex items-center gap-2 mb-4 mx-auto">

                        <button className="btn bg-secondary hover:text-black font-bold hover:bg-accent btn-outline mx-auto w-full">Sign In</button>
                    </label>
                    <p>New in this site? <Link to='/signUp'>Sign Up Now</Link></p>
                    <label className="flex items-center gap-2 mb-4 mx-auto">

                        <button onClick={hanldeGoogleSignIn} type='button' className="btn bg-secondary hover:bg-accent hover:text-black font-bold btn-outline mx-auto w-full"> <FaGoogle />Google</button>
                    </label>
                </div>
            </form>
        </div>
    );
};

export default SignIn;