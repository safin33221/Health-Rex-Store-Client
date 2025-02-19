import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`
const AddAdvertice = ({ refetch }) => {
    const { user } = useAuth()
    const { register, handleSubmit,reset } = useForm()
    
    const axiosSecure = useAxiosSecure()
    const onsubmit = async (data) => {
        const imgFile = { image: data.image[0] }
        const imglink = await axios.post(img_hosting_api, imgFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        const image = imglink.data.data.display_url
        const adInfo = {
            name: data?.name,
            image: image,
            description: data.shortDescription,
            status: 'pending',
            email: user?.email
        }
        axiosSecure.post('/askAddverticement', adInfo)
            .then(res => {
                refetch()
                reset( )
                document.getElementById('addAdvertice').close()
                toast.success('New Banner Published!', {
                    position: "top-right",
                    autoClose: 1500,
                    

                });
            })

    }
    return (
        <dialog id="addAdvertice" className="modal modal-bottom sm:modal-middle w-full mx-auto">
            <div className="modal-box">
                
                <form onSubmit={handleSubmit(onsubmit)} >
                    <div className=" mx-auto  rounded-lg p-5 w-full ">





                        <label className="  flex flex-col gap-2 my-4">

                            <span>Medicine Name:</span>
                            <input {...register("name")} required type="text" className="input input-bordered input-md w-full focus:outline-none focus:border-accent" placeholder="Name" />
                        </label>
                        <label className="  flex flex-col gap-2 my-4">

                            <span>Description</span>
                            <textarea {...register("shortDescription")} required type="text" className="textarea textarea-bordered textarea-md w-full focus:outline-none focus:border-accent" placeholder="Short Description" />
                        </label>
                        <label className="my-2">
                            <span>Banner Image:</span>
                            <input {...register("image")} required type="file" className="file-input file-input-bordered  w-full focus:outline-none mb-3" placeholder="image" />

                        </label>



                        <label className="flex items-center gap-2 mb-4 mx-auto">

                            <button className="btn  btn-outline mx-auto w-full">Post</button>
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

export default AddAdvertice;