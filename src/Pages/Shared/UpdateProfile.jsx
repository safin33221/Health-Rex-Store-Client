
import useAuth from "../../Hooks/useAuth";

import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import { useState } from "react";
import { LuLoaderPinwheel } from "react-icons/lu";

const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`


const UpdateProfile = ({ userData, refetch }) => {
    const { updateUserProfile } = useAuth()
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const form = e.target

        let imglink = userData?.image

        const imgFile = form.image.files[0]
        if (imgFile) {
            try {
                const formData = new FormData()
                formData.append('image', imgFile)
                const response = await axios.post(img_hosting_api, formData, {
                    headers: {
                        "content-type": "multipart/form-data"
                    }
                })
                if (response.data && response.data.data && response.data.data.url) {
                    imglink = response.data.data.url
                } else {
                    console.error('Unexpected response structure:', response)
                }
            } catch (error) {
                console.log('err upload image', error);
            }

        }
        const name = form.name.value
        const image = imglink
        const phone = form.phone.value
        const address = form.address.value
        const info = { name, image, phone, address }
        console.log(info);
        updateUserProfile(name, image)
            .then(res => {
                axios.patch(`https://medicing-selling-server-side.vercel.app/user/${userData?.email}`, info)
                    .then(res => {
                        console.log(res.data);
                        refetch()
                        document.getElementById('update_profile').close()
                        setLoading(false)
                    })
            })
            .catch(err => {
                console.log('err', err);
            })
    }
    return (
        <dialog id="update_profile" className="modal modal-bottom sm:modal-middle max-w-[500px] mx-auto">
            <div className="modal-box">
                <h2 className='text-bold text-xl text-center'>Update Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className=" mx-auto  rounded-lg p-5 w-full ">



                        <label className="input input-bordered flex items-center gap-2 mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                            </svg>
                            <input defaultValue={userData?.name} name="name" required type="text" className=" focus:outline-none" placeholder="User Name" />
                        </label>
                        <label className="  mb-4">

                            <input type="file" className="file-input file-input-bordered  w-full focus:outline-none mb-3" placeholder="image" name="image" />

                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-4">
                            <FaPhoneAlt />
                            <input defaultValue={userData?.phone} required type="number" maxLength={11} className=" focus:outline-none w-full" placeholder="Phone Number" name="phone" />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 mb-4">
                            <FaLocationDot />
                            <input defaultValue={userData?.address} name="address" required type="text" className=" focus:outline-none w-full" placeholder="Adress" />
                        </label>


                        <label className="flex items-center gap-2 mb-4 mx-auto">

                            <button className="btn  mx-auto w-full">
                                {
                                    loading ? <LuLoaderPinwheel className="animate-spin text-xl" /> : "Update"
                                }
                            </button>
                        </label>

                    </div>
                </form>

                <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-outline btn-sm">cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default UpdateProfile;