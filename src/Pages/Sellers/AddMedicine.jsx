import moment from 'moment';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify/unstyled';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`
const AddMedicine = ({ refetch }) => {
    const { user } = useAuth()
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const onsubmit = async (data) => {
        const imgFile = { image: data.image[0] }
        const imglink = await axios.post(img_hosting_api, imgFile, {
            headers: {
                "content-type": "multipart/form-data"
            }
        })
        const image = imglink.data.data.display_url

        const medicineInfo = {
            itemName: data.itemName,
            genericName: data.genericName,
            shortDescription: data.shortDescription,
            image: image,
            category: data.category,
            company: data.company,
            massUnit: data.massUnit,
            pricePerUnit: data.pricePerUnit,
            discountPercentage: data.discountPercentage,
            time: moment().format('LLL'),
            email: user?.email,
            name: user?.displayName



        };
        axiosSecure.post('/medicines', medicineInfo)
            .then(res => {
                refetch()
                toast.success('Your new medicine has been added to the inventory.', {
                    position: "top-right",
                    autoClose: 1500,


                });
                reset()
                document.getElementById('my_modal_5').close()

            })

    }

    //get Category
    const { data: categoris } = useQuery({
        queryKey: ['categoris'],
        queryFn: async () => {
            const res = await axiosPublic.get('/category')
            return res.data
        }
    })
    return (
        <dialog id="my_modal_5" className="modal modal-bottom max-w-6xl mx-auto">
            <div className="modal-box">
                <h2 className='text-bold text-2xl md:text-4xl font-bold  text-center'>Add Medicine</h2>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <div className=" mx-auto  rounded-lg p-5 w-full ">
                        <div className='flex  items-center justify-center gap-4 flex-col md:flex-row'>
                            <label className="  flex items-center w-full gap-2 ">

                                <input {...register("itemName")} type="text" className=" input p-3 w-full input-bordered focus:outline-none " placeholder="itemName" />
                            </label>
                            <label className="  flex items-center w-full gap-2 ">

                                <input {...register("genericName")} type="text" className=" input p-3 w-full input-bordered focus:outline-none " placeholder="genericName" />

                            </label>
                        </div>
                        <label className="  flex items-center gap-2 my-4">

                            <textarea {...register("shortDescription")} type="text" className="textarea textarea-bordered textarea-md w-full focus:outline-none " placeholder="shortDescription" />
                        </label>
                        <label className="my-2">

                            <input {...register("image")} type="file" className="file-input file-input-bordered  w-full focus:outline-none mb-3" placeholder="image" />

                        </label>
                        <div className='md:flex gap-3 w-full'>
                            <label className="   flex items-center gap-2 my-4 w-full">
                                <select {...register('category')} required id="category " className='select select-bordered w-full focus:outline-accent '>
                                    {
                                        categoris?.map(category => <option key={category._id} value={category.name}>{category.name}</option>)
                                    }

                                </select>

                            </label>
                            <label className="   flex items-center gap-2 my-4 w-full" >
                                <select {...register('company')} required id="company" className='select select-bordered w-full focus:outline-accent '>
                                    <option value="ABC Pharma">ABC Pharma</option>
                                    <option value="HealthCo">HealthCo</option>
                                    <option value="BioMed">BioMed</option>
                                    <option value="MediCare">MediCare</option>
                                    <option value="GlucoseCare">GlucoseCare</option>
                                    <option value="CardioPlus">CardioPlus</option>
                                    <option value="DigestCare">DigestCare</option>
                                    <option value="BreatheEasy">BreatheEasy</option>
                                    <option value="VitaLife">VitaLife</option>
                                </select>

                            </label>
                        </div>
                        <div className='flex  items-center justify-center gap-4 flex-col md:flex-row'>
                            <label className="  flex items-center gap-2 w-full">

                                <input {...register("massUnit")} type="text" className=" input p-3 w-full input-bordered focus:outline-none " placeholder="Mass Unit" />

                            </label>
                            <label className="  flex items-center gap-2 w-full">

                                <input {...register("pricePerUnit")} type="text" className=" input p-3 w-full input-bordered focus:outline-none " placeholder="Price Per Unit" />

                            </label>
                            <label className=" w-full  ">

                                <input {...register("discountPercentage")}  type="text" className=" input p-3 w-full input-bordered focus:outline-none " placeholder="Discount Percentage	" />

                            </label>
                        </div>


                        <label className="flex items-center gap-2 mt-4 mx-auto">

                            <button className="btn btn-outline mx-auto w-full">Add Medicine</button>
                        </label>

                    </div>
                </form>

                <div className="modal-action w-full">
                    <form method="dialog w-full">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-outline w-full block">cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default AddMedicine;