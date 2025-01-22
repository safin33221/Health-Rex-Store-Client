import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import axios from 'axios';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`
const AddCategory = ({ refetch }) => {
    const { register, handleSubmit,reset } = useForm()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const onsubmit = async (data) => {
        const imgFile = { image: data.image[0] }
        const imglink = await axios.post(img_hosting_api, imgFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        const image = imglink.data.data.display_url
        const categoryInfo = {
            name: data.name,
            image: image
        }
        console.log(categoryInfo);
        axiosSecure.post('/category', categoryInfo)
            .then(res => {
                console.log(res.data);
                refetch()
                reset()
                document.getElementById('addCategory').close()
            })
    }
    return (
        <dialog id="addCategory" className="modal modal-bottom sm:modal-middle w-full mx-auto">
            <div className="modal-box">
                <h2 className='text-bold text-xl text-center'>Add Category</h2>
                <form onSubmit={handleSubmit(onsubmit)} >
                    <div className=" mx-auto  rounded-lg p-5 w-full ">





                        <label className="  flex flex-col gap-2 my-4">

                            <span>Category Name:</span>
                            <input {...register("name")} required type="text" className="input input-bordered input-md w-full focus:outline-none focus:border-accent" placeholder="Category Name" />
                        </label>

                        <label className="my-2">
                            <span>Category  Image:</span>
                            <input {...register("image")} required type="file" className=" input p-3 w-full  focus:outline-none " placeholder="Category Image" />

                        </label>



                        <label className="flex items-center gap-2 mb-4 mx-auto">

                            <button className="btn bg-primary hover:bg-green-600 hover:text-text btn-outline mx-auto w-full">Add</button>
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

export default AddCategory;