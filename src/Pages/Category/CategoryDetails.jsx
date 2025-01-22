import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { FaEye } from 'react-icons/fa';
import MedicineDetails from '../Shop/MedicineDetails';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import moment from 'moment';
import useAuth from '../../Hooks/useAuth';

const CategoryDetails = () => {
    const { user } = useAuth()
    const { category } = useParams()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const [medicineDetails, setMedicineDetails] = useState(null)
    const { data: medicines } = useQuery({
        queryKey: ['categories', category],
        queryFn: async () => {
            const res = await axiosPublic.get(`/categories/${category}`)
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
                console.log(res.data);
                toast.success('The product has been added to your cart.', {
                    position: "top-right",
                    autoClose: 1500,


                });
            })
    }
    return (
        <div className=' w-11/12 mx-auto'>
            <div className="overflow-x-auto rounded-lg">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className=" bg-secondary">
                            <th></th>
                            <th>Medicine Name</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            medicines?.map((medicine, index) => <tr className="bg-base-200">
                                <th>{index + 1}</th>
                                <td>{medicine?.itemName}</td>
                                <td>{medicine?.category}</td>
                                <td>{medicine?.company}</td>
                                <td></td>
                                <td>
                                    <button onClick={() => handleAddToCart(medicine)} className="btn">Select</button>
                                    <button onClick={() => handleDetails(medicine)} className="btn ml-4"><FaEye /></button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
                <MedicineDetails medicineDetails={medicineDetails} />
            </div>
        </div>
    );
};

export default CategoryDetails;