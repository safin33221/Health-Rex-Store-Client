import React from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify/unstyled';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`

const UpdateCategoryModal = ({ category, refetch }) => {
    const { register, handleSubmit } = useForm()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()


    const onsubmit = async (data) => {
        const imgFile = { image: data.image[0] }
        const imglink = await axios.post(img_hosting_api, imgFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        const image = imglink.data.data.display_url || category?.image
        const categoryInfo = {
            name: data.name,
            image: image
        }
        axiosSecure.patch(`/category/${category?._id}`, categoryInfo)
            .then(res => {
                refetch()
                document.getElementById('updateCategory').close()
                toast.success('Category Updated Successfully!', {
                    position: "top-right",
                    autoClose: 1500,


                });
            })
    }
    return (
        <dialog id="updateCategory" className="modal modal-bottom sm:modal-middle w-full mx-auto">
            <div className="modal-box">
                <h2 className='text-bold text-xl text-center'>Update Category</h2>
                <form onSubmit={handleSubmit(onsubmit)} >
                    <div className=" mx-auto  rounded-lg p-5 w-full ">





                        <label className="  flex flex-col gap-2 my-4">

                            <span>Category Name:</span>
                            <input {...register("name")} defaultValue={category.name} required type="text" className="input input-bordered input-md w-full focus:outline-none focus:border-accent" placeholder="Category Name" />
                        </label>

                        <label className="my-2">
                            <span>Category  Image:</span>
                            <input {...register("image")} type="file" className=" input p-3 w-full  focus:outline-none " placeholder="Category Image" />

                        </label>



                        <label className="flex items-center gap-2 mb-4 mx-auto">

                            <button className="btn bg-primary hover:bg-green-600 hover:text-text btn-outline mx-auto w-full">Update</button>
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

export default UpdateCategoryModal;