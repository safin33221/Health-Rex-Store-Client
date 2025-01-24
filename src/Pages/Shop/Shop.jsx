import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaEye } from "react-icons/fa";
import MedicineDetails from "./MedicineDetails";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Shop = () => {
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [search, setSearch] = useState('')
    const [medicineDetails, setMedicineDetails] = useState(null)
    const { data: medicines } = useQuery({
        queryKey: ['medicines',search],
        queryFn: async () => {
            const res = await axiosPublic.get(`/medicines?search=${search}`)
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
        axiosSecure.post(`/carts`, cartInfo)
            .then(res => {
                if (res.data.insertedId) {

                    toast.success(`${cartInfo.itemName} has been added to your cart.`, {
                        position: "top-right",
                        autoClose: 1000,


                    });
                } else {
                    toast.error(res.data.message, {
                        position: "top-right",
                        autoClose: 1000,


                    });
                }
            })
    }
    console.log(search);
    return (
        <div className="w-11/12 mx-auto mt-24 py-5">
            <Helmet title="HRS | SHOP" />
            <div className="flex justify-between items-center py-5">
                <h1 className="text-2xl font-bold">Total Medicines: {medicines?.length}</h1>
                <input onChange={(e) => setSearch(e.target.value)} placeholder="search medicine" type="text" className="input focus:outline-none input-bordered" />
            </div>
            <div className="overflow-x-auto rounded-lg">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className=" bg-secondary">
                            <th></th>
                            <th>Medicine Name</th>
                            <th>Generic Name</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            medicines?.map((medicine, index) => <tr key={index} className="bg-base-200">
                                <th>{index + 1}</th>
                                <td>{medicine?.itemName}</td>
                                <td>{medicine?.genericName}</td>
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
            </div>
            <MedicineDetails medicineDetails={medicineDetails} />
        </div>
    );
};

export default Shop;