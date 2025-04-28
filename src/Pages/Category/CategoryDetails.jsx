import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { FaCartArrowDown, FaEye } from 'react-icons/fa';
import MedicineDetails from '../Shop/MedicineDetails';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import moment from 'moment';
import useAuth from '../../Hooks/useAuth';
import { CgDetailsMore } from 'react-icons/cg';

const CategoryDetails = () => {
    const { user } = useAuth()
    const { category } = useParams()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [medicineDetails, setMedicineDetails] = useState(null)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const { data: medicines } = useQuery({
        queryKey: ['categories', category, search, sort],
        queryFn: async () => {
            const res = await axiosPublic.get(`/categories/${category}?search=${search}&&sort=${sort}`)
            return res.data
        }
    })

    const handleDetails = medicine => {
        setMedicineDetails(medicine);
        document.getElementById('medicinesDetails').showModal()
    }
    const handleAddToCart = data => {
        const cartInfo = {
            medicineId: data._id,
            itemName: data.itemName,
            company: data.company,
            pricePerUnit: data.pricePerUnit,
            discountPercentage: data.discountPercentage,
            time: moment().format('LLL'),
            email: user?.email,
            quantity: 1

        }
        axiosSecure.post('/carts', cartInfo)
            .then(res => {
                if (res.data.insertedId) {

                    toast.success('The product has been added to your cart.', {
                        position: "top-right",
                        autoClose: 1500,


                    });
                } else {
                    toast.error(res.data.message, {
                        position: "top-right",
                        autoClose: 1500,


                    });
                };
            })
    }
    return (
        <div className=' w-11/12 mx-auto py-5'>

            <div className="flex flex-col md:flex-row justify-between md:items-center py-5">
                <h1 className="text-lg md:text-2xl font-bold">Category: {category}</h1>
                <div className="felx gap-x-10" >
                    <select onChange={(e) => setSort(e.target.value)} className="border mr-5  rounded-xl focus:outline-none border-secondary select-sm md:select-lg" name="" id="">
                        <option value="ascending">Ascending</option>
                        <option value="dscending">Dscending</option>
                    </select>
                    <input onChange={(e) => setSearch(e.target.value)} placeholder="search medicine " type="text" className="input focus:outline-none input-bordered focus:border-secondary input-sm md:input-lg" />
                </div>
            </div>
            <div className="overflow-x-auto rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {
                        medicines?.map((medicine, idx) => <div className="  border shadow-2xl rounded-lg  ">
                            <div key={idx} className="">
                                <img className="w-full h-[150px]  p-0 m-0 rounded-lg" src={medicine?.image} alt="no image" />
                            </div>
                            <div className="flex  items-center">
                                <div className="m-5">
                                    <h1 className="text-xl "><span className="font-bold">{medicine?.itemName}</span></h1>

                                    <h1 className="">Mass Unit	: <span className="font-medium">{medicine?.massUnit}</span></h1>
                                    <h1 className="">Price PerUnit: <span className="font-medium">{medicine?.pricePerUnit} tk</span></h1>

                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => handleAddToCart(medicine)} className="text-2xl btn hover:text-[#006775f2] transition-all duration-200 ease-linear"><FaCartArrowDown /></button>
                                    <button onClick={() => handleDetails(medicine)} className="text-2xl btn hover:text-[#006775f2] transition-all duration-200 ease-linear"><CgDetailsMore /></button>

                                </div>
                            </div>
                        </div>)
                    }
                </div>
                <MedicineDetails medicineDetails={medicineDetails} />
            </div>
        </div>
    );
};

export default CategoryDetails;