import { useForm } from "react-hook-form";

import useAuth from "../../Hooks/UseAuth";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { MdInsertPhoto } from "react-icons/md";
const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`
const SignUp = () => {
    const { createUserwithEmail, updateUserProfile } = useAuth()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,

    } = useForm()
    const onsubmit = async(data) => {
        console.log(data);
        const imgFile = { image: data.image[0] }
        const imglink = await axios.post(img_hosting_api,imgFile,{
            headers:{
                "content-type":"multipart/form-data"
            }
        })
        createUserwithEmail(data.email, data.password)
            .then(res => {
                console.log(res.data);
                updateUserProfile(data.userName, imglink.data.data.display_url)
                    .then(res => {
                        navigate('/')
                        
                    })
            })
    }
    return (
        <div className="pt-24">
            <form onSubmit={handleSubmit(onsubmit)} >
                <div className="max-w-xl mx-auto border-2 rounded-lg p-4">
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
                        <input {...register("userName")} type="text" className=" focus:outline-none" placeholder="User Name" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 mb-4">
                        <MdInsertPhoto/>
                        <input {...register("image")} type="file" className=" focus:outline-none" placeholder="image" />

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
                        <input {...register("email")} type="email" className=" focus::outline-none" placeholder="Email" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 mb-4">
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
                        <input {...register("password")} type="password" className=" focus:outline-none" placeholder="password" />
                    </label>
                    <label className="flex items-center gap-2 mb-4 mx-auto">

                        <button className="btn btn-outline mx-auto w-full">Sign Up</button>
                    </label>
                    <p>Already have an Account? <Link to='/signIn'>Sign In Now</Link></p>
                </div>
            </form>
        </div>
    );
};

export default SignUp;