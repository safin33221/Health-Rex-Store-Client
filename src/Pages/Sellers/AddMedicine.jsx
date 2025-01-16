import moment from 'moment';
import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const img_hosting_key = import.meta.env.VITE_IMG_HOSTING_KEY
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${img_hosting_key}`
const AddMedicine = ({ refetch }) => {
    const { user } = useAuth()
    const { register, handleSubmit } = useForm()
    const axiosPublic = useAxiosPublic()
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
        axiosPublic.post('/medicines', medicineInfo)
            .then(res => {
                console.log(res.data);
                document.getElementById('my_modal_5').close()
                refetch()

            })

    }
    return (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle max-w-[500px] mx-auto">
            <div className="modal-box">
                <h2 className='text-bold text-xl text-center'>Add Medicine</h2>
                <form onSubmit={handleSubmit(onsubmit)}>
                    <div className=" mx-auto  rounded-lg p-5 w-full ">



                        <label className="  flex items-center gap-2 my-2">

                            <input {...register("itemName")} type="text" className=" input p-3 w-full input-bordered focus:outline-none focus:border-accent" placeholder="itemName" />
                        </label>
                        <label className="  flex items-center gap-2 mb-4">

                            <input {...register("genericName")} type="text" className=" input p-3 w-full input-bordered focus:outline-none focus:border-accent" placeholder="genericName" />

                        </label>
                        <label className="  flex items-center gap-2 my-4">

                            <textarea {...register("shortDescription")} type="text" className="textarea textarea-bordered textarea-md w-full focus:outline-none focus:border-accent" placeholder="shortDescription" />
                        </label>
                        <label className="my-2">

                            <input {...register("image")} type="file" className=" input p-3 w-full  focus:outline-none " placeholder="image" />

                        </label>
                        <label className="   flex items-center gap-2 my-4">
                            <select {...register('category')} required id="category " className='select select-bordered focus:outline-accent focus:border-accent'>
                                <option value="Pain Relief">Pain Relief</option>
                                <option value="Antibiotics">Antibiotics</option>
                                <option value="Allergy">Allergy</option>
                                <option value="Diabetes">Diabetes</option>
                                <option value="Cholesterol">Cholesterol</option>
                                <option value="Digestive Health">Digestive Health</option>
                                <option value="Respiratory">Respiratory</option>
                                <option value="Vitamins & Supplements">Vitamins & Supplements</option>
                                <option value="Skin Care">Skin Care</option>
                                <option value="Heart Health">Heart Health</option>
                            </select>

                        </label>
                        <label className="   flex items-center gap-2 my-4" >
                            <select {...register('company')} required id="company" className='select select-bordered focus:outline-accent focus:border-accent'>
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
                        <label className="  flex items-center gap-2 mb-4">

                            <input {...register("massUnit")} type="text" className=" input p-3 w-full input-bordered focus:outline-none focus:border-accent" placeholder="Mass Unit" />

                        </label>
                        <label className="  flex items-center gap-2 mb-4">

                            <input {...register("pricePerUnit")} type="text" className=" input p-3 w-full input-bordered focus:outline-none focus:border-accent" placeholder="Price Per Unit" />

                        </label>
                        <label className="  flex items-center gap-2 mb-4">

                            <input {...register("discountPercentage")} type="text" className=" input p-3 w-full input-bordered focus:outline-none focus:border-accent" placeholder="Discount Percentage	" />

                        </label>


                        <label className="flex items-center gap-2 mb-4 mx-auto">

                            <button className="btn bg-primary hover:bg-green-600 hover:text-text btn-outline mx-auto w-full">Add Medicine</button>
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

export default AddMedicine;